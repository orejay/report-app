import { MenuRounded } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsSideBarOpen } from "state";

const NavBar = () => {
  const dispatch = useDispatch();
  const isSideBarOpen = useSelector((state) => state.global.isSideBarOpen);
  return (
    <AppBar sx={{ position: "static" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton onClick={() => dispatch(setIsSideBarOpen(!isSideBarOpen))}>
          <MenuRounded />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
