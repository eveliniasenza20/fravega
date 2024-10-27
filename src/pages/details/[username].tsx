import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Star, StarOutline } from "@mui/icons-material";
import Layout from "@/components/Layout/Layout";
import { UserDetailProps } from "@/types/userTypes";
import styles from "../../styles/Details.module.css";

const UserDetailPage = ({ user, repos }: UserDetailProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(user.id));
  }, [user.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter((id: number) => id !== user.id);
    } else {
      updatedFavorites = [...favorites, user.id];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  if (!user) {
    return (
      <div className={styles.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Layout canSearch={false}>
      <Box sx={{ padding: 4 }}>
        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          <Grid item xs={12} md={4} lg={5}>
            <Card style={{ padding: 30, height: "auto", boxShadow: "none" }}>
              <CardMedia
                component="img"
                height="180"
                image={user.avatar_url}
                alt={user.login}
                className={styles.borderCard}
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  width: "180px",
                  height: "180px",
                  margin: "auto",
                }}
              />
              <CardContent style={{ textAlign: "center", marginTop: "10px" }}>
                <Typography variant="h4">{user.name || user.login}</Typography>
                <Typography variant="body1" color="textSecondary">
                  {user.bio}
                </Typography>
                <a href={user?.html_url} target="_blank" rel="noopener noreferrer">
                  GitHub Profile
                </a>
                <IconButton onClick={toggleFavorite} style={{ color: isFavorite ? "gold" : "inherit" }}>
                  {isFavorite ? <Star /> : <StarOutline />}
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8} lg={7}>
            <Typography variant="h5" style={{ marginBottom: 16 }}>
              Repositories:
            </Typography>
            <List>
              {repos?.slice(0, 4).map((repo) => (
                <ListItem key={repo.id}>
                  <ListItemText
                    primary={
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        {repo.name}
                      </a>
                    }
                    secondary={`Language: ${repo?.language}`}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.params as { username: string };

  try {
    const userResponse = await fetch(`https://api.github.com/users/${username}`);
    if (!userResponse.ok) throw new Error("User not found");

    const user = await userResponse.json();

    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!reposResponse.ok) throw new Error("Error fetching repositories");

    const repos = await reposResponse.json();

    return { props: { user, repos } };
  } catch (error) {
    console.error("Error fetching user details or repositories:", error);
    return { notFound: true };
  }
};

export default UserDetailPage;
