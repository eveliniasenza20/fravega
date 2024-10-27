import Layout from "@/components/Layout/Layout";
import React, { useEffect, useState } from "react";
import { CircularProgress, Box } from "@mui/material";
import { UserProps } from "@/types/userTypes";
import styles from "../styles/Home.module.css";
import UserList from "@/components/UserList/UserList";

const Home = () => {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<UserProps[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) throw new Error("Error fetching data");
        const data = await response.json();
        const usersWithFavorites = data?.map((user: UserProps) => ({ ...user, isFavorite: false }));
        setUsers(usersWithFavorites);
        setFilteredUsers(usersWithFavorites);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);

    if (!query) {
      setFilteredUsers(users);
      return;
    }

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error("Error fetching search results");
      const data = await response.json();
      const usersWithFavorites = data?.items?.map((user: UserProps) => ({
        ...user,
        isFavorite: false,
      }));
      setFilteredUsers(usersWithFavorites);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const toggleFavorite = (id: number) => {
    const updatedUsers = users.map((user) => (user.id === id ? { ...user, isFavorite: !user.isFavorite } : user));
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers.filter((user) => user.login.toLowerCase().includes(searchQuery.toLowerCase())));

    const newFavorites = updatedUsers.filter((user) => user.isFavorite).map((user) => user.id);

    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <Layout canSearch={true} onSearch={handleSearch}>
      <Box sx={{ padding: 4 }}>
        {loading ? (
          <div className={styles.loadingContainer}>
            <CircularProgress />
          </div>
        ) : (
          <UserList users={filteredUsers} toggleFavorite={toggleFavorite} />
        )}
      </Box>
    </Layout>
  );
};

export default Home;
