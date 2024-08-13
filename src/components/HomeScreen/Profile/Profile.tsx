import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import { MainListItems } from "../listItems";
import {
  Button,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Rating,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { ReactComponent as BrandLogo } from "../../../assets/Sledge-s.svg";
import brandLogo from "../../../assets/BrandLogo.png";
import { useNavigate } from "react-router-dom";
import ProfilePic from "../../../assets/Profile.png";
import PersonIcon from "@mui/icons-material/Person";
import MainProfile from "../../../assets/mainProfile.png";
import SettingsIcon from "@mui/icons-material/Settings";
import EditNoteIcon from "@mui/icons-material/EditNote";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import Carousel from "./Carousel";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import FeedPost from "../Feeds";
import { useLocation } from "react-router-dom";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const items = [
  <img
    src="https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60"
    alt="Image 1"
  />,
  <img
    src="https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60"
    alt="Image 2"
  />,
  <img
    src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250"
    alt="Image 3"
  />,
  <img
    src="https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60"
    alt="Image 4"
  />,
  <img
    src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250"
    alt="Image 5"
  />,
  // Add more JSX elements as needed
];

const feedposts = [
  {
    profileName: "Smith jems",
    profilePic: "",
    lastseen: "2hrs",
    content: `In the fast-paced world of corporate life, 
    it's crucial to prioritize your mental peace. Take moments to breathe, reflect, and recharge. 
    Seek solace in small rituals, like morning walks, deep breaths, or a quick meditation 
    session during breaks. #mentalpeace #corporatelife`,
  },
  {
    profileName: "Robert Fox",
    profilePic: "",
    lastseen: "1d ago",
    content: `Creativity is intelligence having fun! #design #stevejobs`,
  },
];

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, color: "#fff" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const drawerWidth: number = 240;

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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Profile() {
  const [value, setValue] = React.useState<number | null>(2);
  const [stepValue, setStepValue] = React.useState(0);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [activeButton, setActiveButton] = React.useState("images");
  const location = useLocation();
  const { prop1: profileData } = location.state || {};

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue);
    setStepValue(newValue);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleButtonClick = (type: string) => {
    setActiveButton(type);
  };

  const capitalizeFirstLetter = (string: string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

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
              <ListItemButton onClick={() => navigate("/profile")}>
                <ListItemIcon>
                  <img
                    src={profileData?.profile_pic}
                    height={32}
                    width={32}
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
                theme.palette.mode === "light" ? "#111" : "#111",
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
              margin: 5,
              borderRadius: "25px",
              color: "#fff",
              padding: 1,
            }}
          >
            <Grid container>
              <Grid xs={12} md={12} container>
                <Grid
                  xs={12}
                  md={12}
                  sx={{
                    padding: "10px",
                    display: "flex",
                    backgroundColor: "rgba(27, 27, 27, 1)",
                    borderRadius: "10px",
                    justifyContent: "space-between",
                  }}
                  container
                >
                  <Grid
                    xs={7}
                    md={7}
                    sx={{ display: "flex", flexDirection: "column" }}
                    item
                  >
                    <div style={{ display: "flex" }}>
                      <PersonIcon
                        sx={{ marginTop: "15px", color: "skyblue" }}
                      />
                      {/* <h3>Kapi_07_eHt</h3> */}
                      <h3>{profileData?.user_name}</h3>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <img
                        src={profileData?.profile_pic}
                        height={150}
                        width={150}
                        style={{ borderRadius: "180px" }}
                      ></img>
                      <div style={{ margin: "0px 25px" }}>
                        {/* <h3 style={{ margin: 0 }}>Kapadila Eeshtam</h3> */}
                        <h3 style={{ margin: 0 }}>
                          {capitalizeFirstLetter(profileData?.name)}
                        </h3>
                        <p style={{ margin: "0px -7px" }}>
                          <LocationOnIcon
                            sx={{ paddingTop: "10px", margin: 0 }}
                          />
                          {profileData?.location}
                        </p>
                        <p style={{ margin: 0, fontWeight: "bold" }}>
                          #bussiness #baseketball #money
                        </p>
                        <p style={{ margin: 0 }}>{profileData?.bio}</p>
                      </div>
                    </div>
                  </Grid>
                  <Grid
                    xs={4}
                    md={4}
                    sx={{
                      margin: "5px",
                      backgroundColor: "rgba(239, 239, 239, 0.1)",
                      padding: "10px",
                      borderRadius: "10px",
                      textAlign: "center",
                    }}
                    item
                  >
                    <div style={{ display: "flex", justifyContent: "end" }}>
                      <EditNoteIcon
                        sx={{
                          backgroundColor: "#000",
                          margin: "3px",
                          borderRadius: "50%",
                          padding: "10px",
                          fontSize: "40px",
                          cursor: "pointer",
                        }}
                        onClick={() => navigate("/edit-profile")}
                      />
                      <SettingsIcon
                        sx={{
                          backgroundColor: "#000",
                          margin: "3px",
                          borderRadius: "50%",
                          padding: "10px",
                          fontSize: "40px",
                          cursor: "pointer",
                        }}
                        onClick={() => navigate("/profilesetting")}
                      />
                    </div>
                    <h3 style={{ margin: 0 }}>Sledge Info</h3>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "#000",
                          padding: "10px",
                          margin: "5px",
                          borderRadius: "10px",
                        }}
                      >
                        <p
                          style={{ margin: 0, fontSize: "11px", color: "gray" }}
                        >
                          Audience
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontWeight: "bold",
                            fontSize: "19px",
                          }}
                        >
                          {profileData?.audience}
                        </p>
                      </div>
                      <div
                        style={{
                          backgroundColor: "#000",
                          padding: "10px",
                          margin: "5px",
                          borderRadius: "10px",
                        }}
                      >
                        <p
                          style={{ margin: 0, fontSize: "11px", color: "gray" }}
                        >
                          Events Hosted
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontWeight: "bold",
                            fontSize: "19px",
                          }}
                        >
                          {profileData?.events_hosted}
                        </p>
                      </div>
                      <div
                        style={{
                          backgroundColor: "#000",
                          padding: "10px",
                          margin: "5px",
                          borderRadius: "10px",
                        }}
                      >
                        <p
                          style={{ margin: 0, fontSize: "11px", color: "gray" }}
                        >
                          Events Joined
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontWeight: "bold",
                            fontSize: "19px",
                          }}
                        >
                          {profileData?.events_joined}
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "5px",
                      }}
                    >
                      {profileData?.rating ? (
                        <span>
                          <label
                            style={{
                              marginTop: "3px",
                              margin: 3,
                              fontWeight: "bold",
                            }}
                          >
                            {profileData?.rating}
                          </label>
                          <Rating
                            sx={{ color: "skyblue" }}
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                              setValue(newValue);
                            }}
                          />
                        </span>
                      ) : (
                        " "
                      )}
                    </div>
                    {profileData?.portfolio && (
                      <p
                        style={{
                          margin: 0,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <InsertLinkIcon />
                        {profileData?.portfolio}
                      </p>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid xs={12} md={12} container className="gallery-body">
                <h2 style={{ display: "flex", alignItems: "center" }}>
                  <MyLocationIcon
                    sx={{ marginTop: "-8px", padding: "4px", color: "gray" }}
                  />
                  Sledge Highlights
                </h2>
                <Carousel items={items} />
              </Grid>
              <Grid xs={12} md={12} container sx={{ marginTop: "3rem" }}>
                <Box sx={{ width: "100%" }}>
                  <Tabs
                    value={stepValue}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    variant="fullWidth"
                    sx={{ "& .MuiTabs-indicator": { display: "none" } }}
                  >
                    <Tab
                      sx={{
                        color: "#fff !important",
                        textTransform: "capitalize",
                        backgroundColor:
                          stepValue === 0 ? "#1B1B1B" : "transparent",
                      }}
                      label="Post"
                      {...a11yProps(0)}
                    />
                    <Tab
                      sx={{
                        color: "#fff !important",
                        textTransform: "capitalize",
                        backgroundColor:
                          stepValue === 1 ? "#1B1B1B" : "transparent",
                      }}
                      label="Streams"
                      {...a11yProps(1)}
                    />
                    <Tab
                      sx={{
                        color: "#fff !important",
                        textTransform: "capitalize",
                        backgroundColor:
                          stepValue === 2 ? "#1B1B1B" : "transparent",
                      }}
                      label="Talks"
                      {...a11yProps(2)}
                    />
                  </Tabs>
                </Box>
                <CustomTabPanel value={stepValue} index={0}>
                  <Button
                    variant="outlined"
                    className={activeButton === "images" ? "file-button" : ""}
                    sx={{
                      color: "#fff",
                      borderRadius: "25px",
                      textTransform: "capitalize",
                    }}
                    onClick={() => handleButtonClick("images")}
                  >
                    Images
                  </Button>
                  <Button
                    variant="outlined"
                    className={
                      activeButton === "documents" ? "file-button" : ""
                    }
                    sx={{
                      color: "#fff",
                      borderRadius: "25px",
                      textTransform: "capitalize",
                      margin: 2,
                    }}
                    onClick={() => handleButtonClick("documents")}
                  >
                    Documents
                  </Button>
                  <div>
                    {activeButton === "documents" ? (
                      <div>
                        <h2>Documents</h2>
                      </div>
                    ) : (
                      <div className="image-container">
                        <ul style={{ display: "flex" }}>
                          {items.map((image, index) => (
                            <div
                              key={index}
                              style={{
                                listStyleType: "none",
                                margin: "5px",
                                width: "25%",
                              }}
                              className="image-item"
                            >
                              {image}
                            </div>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={stepValue} index={1}>
                  <Button
                    variant="outlined"
                    className={activeButton === "images" ? "file-button" : ""}
                    sx={{
                      color: "#fff",
                      borderRadius: "25px",
                      textTransform: "capitalize",
                    }}
                    onClick={() => handleButtonClick("images")}
                  >
                    All Videos
                  </Button>
                  <Button
                    variant="outlined"
                    className={
                      activeButton === "documents" ? "file-button" : ""
                    }
                    sx={{
                      color: "#fff",
                      borderRadius: "25px",
                      textTransform: "capitalize",
                      margin: 2,
                    }}
                    onClick={() => handleButtonClick("documents")}
                  >
                    Bundles
                  </Button>
                </CustomTabPanel>
                <CustomTabPanel value={stepValue} index={2}>
                  {feedposts.map(
                    (
                      info: {
                        profileName: string;
                        profilePic: string;
                        lastseen: string;
                        content: string;
                      },
                      index: number
                    ) => (
                      <FeedPost
                        key={index}
                        profilePic={info.profilePic}
                        content={info.content}
                        lastSeen={info.lastseen}
                        name={info.profileName}
                        comment={true}
                      />
                    )
                  )}
                </CustomTabPanel>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
