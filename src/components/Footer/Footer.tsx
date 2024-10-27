import React from "react";
import styles from "./Footer.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Box, IconButton, Typography } from "@mui/material";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Box className={styles.footerContent}>
        <Typography>© 2024 Evelin Iasenza. Todos los derechos reservados.</Typography>
        <IconButton href="https://facebook.com/fravegaonline" target="_blank" rel="noopener noreferrer">
          <FacebookIcon style={{ color: "#3b5998" }} />
        </IconButton>
        <IconButton href="https://instagram.com/fravegaonline" target="_blank" rel="noopener noreferrer">
          <InstagramIcon style={{ color: "#C13584" }} />
        </IconButton>
      </Box>
    </footer>
  );
};

export default Footer;
