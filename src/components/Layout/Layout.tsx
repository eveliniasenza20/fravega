import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { LayoutProps } from "@/types/layoutTypes";
import { Box } from "@mui/material";

const Layout = ({ children, onSearch, canSearch }: LayoutProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header canSearch={canSearch} onSearch={onSearch} />

      <Box sx={{ flexGrow: 1 }}>{children}</Box>
      <Footer />
    </Box>
  );
};

export default Layout;
