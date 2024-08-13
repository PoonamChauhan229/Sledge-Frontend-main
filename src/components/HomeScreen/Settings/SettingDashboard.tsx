import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { MainListItems, Profile } from "../listItems";
import {
  Avatar,
  Button,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Snackbar,
  TextField,
} from "@mui/material";
import { ReactComponent as BrandLogo } from "../../../assets/Sledge-s.svg";
import brandLogo from "../../../assets/BrandLogo.png";
import { Link, useNavigate } from "react-router-dom";
import ProfilePic from "../../../assets/Profile.png";
import SettingNavigation from "./SettingNavigation";
import "./SettingHeader.css";

const drawerWidth: number = 240;
interface ProfileData {
  name: string;
  designation: string;
  profile_pic: string;
}

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    backgroundColor: "#111111",
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      color: "#fff",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SettingDashboard() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [profileData, setProfileData] = React.useState<ProfileData | null>(
    null
  );

  const toggleDrawer = () => {
    setOpen(!open);
  };
  React.useEffect(() => {
    const storedUserDetails = localStorage.getItem("user_details");
    if (storedUserDetails) {
      try {
        const userData = JSON.parse(storedUserDetails);
        setProfileData(userData);
      } catch (error) {
        console.error("Error parsing user details from localStorage", error);
      }
    } else {
      console.warn("No user details found in localStorage");
    }
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }} className="home">
        <CssBaseline />
        <Drawer
          variant="permanent"
          open={open}
          sx={{ backgroundColor: "#111111" }}
        >
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: [1],
              color: "#fff",
            }}
          >
            <IconButton onClick={toggleDrawer} sx={{ color: "#fff" }}>
              {open ? (
                <img
                  src={brandLogo}
                  alt="sledge logo"
                  height={50}
                  width={150}
                />
              ) : (
                <BrandLogo />
              )}
            </IconButton>
          </Toolbar>
          <Divider />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "90vh",
              color: "#fff",
            }}
          >
            <List component="nav" sx={{ color: "#fff" }}>
              {<MainListItems />}
            </List>
            <List sx={{ position: "absolute", bottom: 0, width: "100%" }}>
              <ListItemButton
                onClick={() =>
                  navigate("/profile", { state: { prop1: profileData } })
                }
              >
                <ListItemIcon>
                  <img
                    src={profileData?.profile_pic}
                    height={32}
                    width={32}
                    alt="Profile"
                    style={{ borderRadius: "50%", margin: "auto" }}
                  />
                </ListItemIcon>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "8px",
                  }}
                >
                  <ListItemText
                    primary={profileData?.name}
                    sx={{ color: "#fff", margin: 0 }}
                  />
                  <ListItemText
                    primary={profileData?.designation}
                    sx={{ color: "gray", margin: 0 }}
                  />
                </div>
              </ListItemButton>
            </List>
          </div>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light" ? "#111111" : "#111111",
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light" ? "#1B1B1B" : "#1B1B1B",
              flexGrow: 1,
              margin: 5,
              borderRadius: "25px",
              color: "#fff",
              padding: 1,
            }}
          >
            <Box className="layout">
              <div className="header">
                <div style={{ fontSize: "20px" }}>Sledge Hub</div>
                <div className="menu">
                  <span>Tearms and Condition</span>
                  <span>Privacy Policy</span>
                  <span>
                    <Button className="button" variant="contained">
                      Raise Ticket
                    </Button>
                  </span>
                </div>
              </div>
              <SettingNavigation />
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
