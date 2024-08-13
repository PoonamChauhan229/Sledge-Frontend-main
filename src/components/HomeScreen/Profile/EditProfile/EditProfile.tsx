import * as React from "react";
import { useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { MainListItems } from "../../listItems";
import {
  Button,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { ReactComponent as BrandLogo } from "../../../../assets/Sledge-s.svg";
import brandLogo from "../../../../assets/BrandLogo.png";
import { useNavigate } from "react-router-dom";
import ProfilePic from "../../../../assets/Ellipse 6473(1).png";
import BackgroundPic from "../../../../assets/Rectangle 34625306(1).png";
import { ReactComponent as EditIcon } from "../../../../assets/Edit.svg";

import BackgroundModal from "./BackgroundModal";
import UserProfileForm from "./UserProfileForm";
import "./EditProfile.css";

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
      overflowX: "hidden",
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

const defaultTheme = createTheme();

export default function EditProfile() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string>(BackgroundPic);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProfileImage, setSelectedProfileImage] = useState<File | null>(
    null
  );

  const navigate = useNavigate();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSetSelectedBackground = (background: string) => {
    setBackgroundImage(background);
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedProfileImage(e.target.files[0]);
    }
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
      <Box sx={{ display: "flex" }} className="profilesetting">
        <CssBaseline />
        <Drawer
          variant="permanent"
          open={true}
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
            <IconButton sx={{ color: "#fff" }}>
              <img src={brandLogo} alt="sledge logo" height={50} width={150} />
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
            <List sx={{ position: "absolute", bottom: 0 }}>
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
                  />
                </ListItemIcon>
                <div style={{ display: "flex", flexDirection: "column" }}>
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
              theme.palette.mode === "light" ? "#000" : "#000",
            width: "100%",
            height: "100vh",
            overflow: "auto",
          }}
        >
          <div className="container">
            <div className="profile-box">
              <div className="profile">
                <Typography sx={{ mb: 2, fontWeight: "bold" }}>
                  Profile
                </Typography>
                <div className="profile-img-container">
                  <img
                    src={
                      selectedProfileImage
                        ? URL.createObjectURL(selectedProfileImage)
                        : ProfilePic
                    }
                    className="profile-img"
                    alt="Profile"
                  />
                </div>
                <input
                  type="file"
                  onChange={handleProfileImageChange}
                  accept="image/*"
                  style={{ display: "none" }}
                  id="profile-image-upload"
                />
                <label htmlFor="profile-image-upload">
                  <Button
                    startIcon={<EditIcon />}
                    variant="outlined"
                    className="user-profile-edit-button"
                    component="span"
                  >
                    Edit
                  </Button>
                </label>
              </div>
              <div className="background">
                <Typography sx={{ mb: 1, fontWeight: "bold" }}>
                  Background
                </Typography>
                <img src={backgroundImage} alt="Background" />
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    startIcon={<EditIcon />}
                    variant="outlined"
                    className="user-profile-edit-button"
                    onClick={handleOpenModal}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
            <UserProfileForm />
          </div>
        </Box>
      </Box>
      <BackgroundModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        setSelectedBackground={handleSetSelectedBackground}
      />
    </ThemeProvider>
  );
}
