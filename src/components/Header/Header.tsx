import React, { useState } from "react";
import Image from "next/image";
import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LogoFravega from "../../assets/images/logo-fravega.jpg";
import styles from "./Header.module.css";

import { HeaderProps } from "@/types/headerTypes";

const Header = ({ onSearch, canSearch }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleSearchSubmit = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <a href={"/"} rel="noopener noreferrer">
          <Image src={LogoFravega} alt="logo" width={140} height={80} />
        </a>
      </div>
      {canSearch && (
        <div className={styles.searchContainer}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search users..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            InputProps={{
              style: {
                backgroundColor: "white",
                color: "black",
                border: "1px solid #ccc",
              },
            }}
            InputLabelProps={{
              style: { color: "black" },
            }}
          />
          <IconButton onClick={handleSearchSubmit}>
            <SearchIcon style={{ color: "white" }} />
          </IconButton>
        </div>
      )}
    </header>
  );
};

export default Header;
