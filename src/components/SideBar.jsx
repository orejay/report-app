import {
  AssessmentRounded,
  ChevronRightOutlined,
  CloseRounded,
  TrendingUpRounded,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setIsSideBarOpen } from "state";

const navItems = [
  { text: "Reports", link: "", icon: <AssessmentRounded /> },
  { text: "Stand Up Report", link: "/standup", icon: null },
  { text: "Monthly Trend", link: "", icon: <TrendingUpRounded /> },
  { text: "Online Banking", link: "/monthly/online", icon: null },
  { text: "UIP at Branch", link: "/monthly/branch-uip", icon: null },
  { text: "NIP Incoming", link: "/monthly/nip", icon: null },
  { text: "UIP Outgoing", link: "/monthly/uip", icon: null },
  { text: "Daily Trend", link: "", icon: <TrendingUpRounded /> },
  { text: "UIP at Branch", link: "/daily/branch-uip", icon: null },
  { text: "NIP Incoming", link: "/daily/nip", icon: null },
  { text: "UIP Outgoing", link: "/daily/uip", icon: null },
  { text: "Hourly Trend", link: "", icon: <TrendingUpRounded /> },
  { text: "UIP at Branch", link: "/hourly/branch-uip", icon: null },
  { text: "NIP Incoming", link: "/hourly/nip", icon: null },
];

const SideBar = ({ isNonMobile, drawerWidth }) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isSideBarOpen = useSelector((state) => state.global.isSideBarOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  return (
    <Box component="nav" sx={{ backgroundColor: "black", height: "100vh" }}>
      {isSideBarOpen && (
        <Drawer
          open={isSideBarOpen}
          onClose={() => dispatch(setIsSideBarOpen(!isSideBarOpen))}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: "blueviolet",
              backgroundColor: "whitesmoke",
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <Box>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography fontWeight="bold">DIGITAL CHANNELS</Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton
                    onClick={() => dispatch(setIsSideBarOpen(!isSideBarOpen))}
                  >
                    <CloseRounded
                      sx={{ ml: "24px", color: "#EE1251", fontSize: "28px" }}
                    />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Box>
          <List>
            {navItems.map(({ text, icon, link }) => {
              if (icon) {
                return (
                  <ListItem
                    key={text}
                    sx={{ m: "3rem 0 0.5rem 0" }}
                    disablePadding
                  >
                    <ListItemButton sx={{}}>
                      <ListItemText
                        primary={text}
                        sx={{ fontWeight: "bold" }}
                      />
                      {icon}
                    </ListItemButton>
                  </ListItem>
                );
              }
              return (
                <ListItem key={text} sx={{}} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(`${link}`);
                      setActive(link);
                      if (isMobile) dispatch(setIsSideBarOpen(false));
                    }}
                    sx={{
                      backgroundColor:
                        active === link ? "#a8dadc" : "transparent",
                      color: active === link ? "#023047" : "#219ebc",
                    }}
                  >
                    <ListItemText primary={text} />
                    {active === link && (
                      <ChevronRightOutlined sx={{ ml: "auto" }} />
                    )}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Drawer>
      )}
    </Box>
  );
};

export default SideBar;
