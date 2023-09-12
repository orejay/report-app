import { Box, useMediaQuery } from "@mui/material";
import NavBar from "components/NavBar";
import SideBar from "components/SideBar";
import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  return (
    <Box
      display={isNonMobile ? "flex" : "block"}
      width="100%"
      minHeight="100vh"
    >
      <SideBar isNonMobile={isNonMobile} drawerWidth="250px" />
      <Box flexGrow={1}>
        <NavBar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
