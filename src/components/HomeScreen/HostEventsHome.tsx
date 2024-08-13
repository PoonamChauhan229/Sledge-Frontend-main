import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import { ReactComponent as BrandLogo } from "../../assets/Sledge-s.svg";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import { MainListItems, Profile } from "./listItems";
import CreateEventImg from "../../assets/createEvent.png";
import { ReactComponent as Notes } from "../../assets/notes-blue.svg";
import { ReactComponent as Chair } from "../../assets/waiting-room-blue.svg";
import { ReactComponent as Star } from "../../assets/blueStar.svg";
import { ReactComponent as Edit } from "../../assets/editIcon.svg";
import { ReactComponent as Rupee } from "../../assets/Rupee.svg";
import { ReactComponent as SearchIcon } from "../../assets/SearchIcon.svg";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  Grid,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  colors,
  Avatar,
  ListItem,
  ListItemAvatar,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import brandLogo from "../../assets/BrandLogo.png";
import { useNavigate } from "react-router-dom";
import ProfilePic from "../../assets/Profile.png";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import { MarginOutlined } from "@mui/icons-material";
// import Profile from "../HomeScreen/Settings/Profile";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface ProfileData {
  name: string;
  designation: string;
  profile_pic: string;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  backgroundColor: "#111111",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    backgroundColor: "#111111",
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

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

const ScrollbarDiv = styled("div")({
  // height: 'calc(100% - 75%)',
  maxHeight: "165px",
  overflowY: "auto",

  "&::-webkit-scrollbar": {
    width: "3px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#6d6d6d",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 5px #1a1a1a",
    borderRadius: "10px",
  },
});

export default function HostEventsHome() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [profileData, setProfileData] = React.useState<ProfileData | null>(
    null
  );
  const [isActive, setIsActive] = React.useState(true);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [joinees, setJoinees] = React.useState([
    { name: "Eleanor Pena", avatar: "/path/to/avatar.jpg" },
    { name: "Jacob Thornton", avatar: "/path/to/avatar.jpg" },
    { name: "Mark Otto", avatar: "/path/to/avatar.jpg" },
    { name: "Eleanor Pena", avatar: "/path/to/avatar.jpg" },
    { name: "Eleanor Pena", avatar: "/path/to/avatar.jpg" },
    { name: "Eleanor Pena", avatar: "/path/to/avatar.jpg" },
    { name: "Eleanor Pena", avatar: "/path/to/avatar.jpg" },
    { name: "Eleanor Pena", avatar: "/path/to/avatar.jpg" },
    { name: "Eleanor Pena", avatar: "/path/to/avatar.jpg" },
    { name: "Eleanor Pena", avatar: "/path/to/avatar.jpg" },
    { name: "Eleanor Pena", avatar: "/path/to/avatar.jpg" },
  ]);

  const handleRemoveJoinee = (index: number) => {
    const newJoinees = [...joinees];
    newJoinees.splice(index, 1);
    setJoinees(newJoinees);
  };
  console.log("joinees", joinees);
  const handleClickOpen = (active: boolean) => {
    setOpenDialog(true);
    setIsActive(active);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
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
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                // marginRight: '36px',
                ...(open && { display: "none" }),
              }}
            >
              <BrandLogo style={{ marginLeft: "10px" }} />
            </IconButton>
            <TextField
              placeholder="Explore Sledge"
              sx={{
                color: "#fff",
                textWrap: "nowrap",
                width: "400px",
                height: "50px",
                borderRadius: "25px",
                border: "1px solid #fff",
              }}
            />
            <div style={{ display: "flex" }}>
              <Button
                size="medium"
                startIcon={<VideocamOutlinedIcon />}
                className="host-button"
                variant="contained"
                onClick={() => navigate("/quickmeeting")}
                sx={{ textTransform: "capitalize" }}
              >
                Quick Meeting
              </Button>
              <IconButton color="inherit" sx={{ display: "flex" }}>
                <Badge variant="dot" color={"info"}>
                  <NotificationsNoneOutlinedIcon />
                </Badge>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
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
              position: "relative",
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <img src={brandLogo} alt="sledge logo" height={50} width={150} />
            </IconButton>
          </Toolbar>
          <Divider />

          <List component="nav" sx={{ color: "#fff" }}>
            <MainListItems />
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
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container>
              <Grid
                xs={12}
                item
                sx={{
                  backgroundColor: "rgba(27, 27, 27, 1)",
                  borderRadius: "15px",
                  padding: "20px",
                  display: "flex",
                  color: "#fff",
                }}
              >
                <img
                  src={CreateEventImg}
                  alt="create events calender"
                  height={200}
                  width={200}
                />
                <div style={{ width: "50%", padding: "20px" }}>
                  <p style={{ fontSize: "20px" }}>
                    Create an Event to showcase your Skills, Increase your
                    Popularity, Create a Money Flow, and have more Audiences.
                  </p>
                  <Button
                    variant="contained"
                    className="reg-button"
                    sx={{ textTransform: "capitalize" }}
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={() => navigate("/hostevents")}
                  >
                    Create Event
                  </Button>
                </div>
              </Grid>
              <Grid xs={12} item sx={{ display: "flex", margin: "10px" }}>
                <Grid
                  xs={6}
                  item
                  sx={{
                    backgroundColor: "rgba(42, 42, 42, 1)",
                    borderRadius: "15px",
                    display: "flex",
                    color: "#fff",
                    margin: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleClickOpen(true)}
                >
                  <Grid container sx={{ marginBottom: "5px" }}>
                    <Grid md={5} lg={5} item className="coupon-sec"></Grid>
                    <Grid
                      container
                      md={7}
                      lg={7}
                      xl={8}
                      item
                      sx={{
                        color: "#fff",
                        backgroundColor: "transparent",
                        padding: "10px",
                      }}
                    >
                      <Grid xl={9} lg={9} item>
                        <Typography
                          variant="body1"
                          sx={{ padding: "8px", fontWeight: "bold" }}
                        >
                          Updated in Digital Marketing Events 2021
                        </Typography>
                      </Grid>
                      <Grid xl={3} lg={3} item>
                        <Chip label="Active" color="success" />
                      </Grid>
                      <Grid xs={12} lg={12} item>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: "5px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "15px",
                              alignItems: "left",
                            }}
                          >
                            <Chair />
                            <div>
                              <span style={{ margin: 0 }}>05/15</span>
                              <p style={{ margin: 0, color: "gray" }}>
                                Seats Filled
                              </p>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "15px",
                              alignItems: "left",
                            }}
                          >
                            <Star />
                            <div>
                              <span style={{ margin: 0 }}>Comments</span>
                              <p style={{ margin: 0, color: "gray" }}>
                                128 Comments
                              </p>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "15px",
                              alignItems: "left",
                            }}
                          >
                            <Notes />
                            <div>
                              <span style={{ margin: 0 }}>
                                Sunday, February 18
                              </span>
                              <p style={{ margin: 0, color: "gray" }}>
                                8:30 PM - 9:30 PM GMT+5:30
                              </p>
                            </div>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  xs={6}
                  item
                  sx={{
                    backgroundColor: "rgba(42, 42, 42, 1)",
                    borderRadius: "15px",
                    display: "flex",
                    color: "#fff",
                    margin: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleClickOpen(false)}
                >
                  <Grid container sx={{ marginBottom: "5px" }}>
                    <Grid md={5} lg={5} item className="coupon-sec"></Grid>
                    <Grid
                      container
                      md={7}
                      lg={7}
                      xl={8}
                      item
                      sx={{
                        color: "#fff",
                        backgroundColor: "transparent",
                        padding: "10px",
                      }}
                    >
                      <Grid xl={9} lg={9} item>
                        <Typography
                          variant="body1"
                          sx={{ padding: "8px", fontWeight: "bold" }}
                        >
                          Updated in Digital Marketing Events 2021
                        </Typography>
                      </Grid>
                      <Grid xl={3} lg={3} item>
                        <Chip
                          label="Closed"
                          sx={{
                            backgroundColor: "rgba(248, 113, 113, 1)",
                            color: "#fff",
                          }}
                        />
                      </Grid>
                      <Grid xs={12} lg={12} item>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: "5px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "15px",
                              alignItems: "left",
                            }}
                          >
                            <Chair />
                            <div>
                              <span style={{ margin: 0 }}>05/15</span>
                              <p style={{ margin: 0, color: "gray" }}>
                                Seats Filled
                              </p>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "15px",
                              alignItems: "left",
                            }}
                          >
                            <Star />
                            <div>
                              <span style={{ margin: 0 }}>Comments</span>
                              <p style={{ margin: 0, color: "gray" }}>
                                128 Comments
                              </p>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "15px",
                              alignItems: "left",
                            }}
                          >
                            <Notes />
                            <div>
                              <span style={{ margin: 0 }}>
                                Sunday, February 18
                              </span>
                              <p style={{ margin: 0, color: "gray" }}>
                                8:30 PM - 9:30 PM GMT+5:30
                              </p>
                            </div>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={openDialog}
          sx={{ color: "#fff", backgroundColor: "rgba(38, 38, 38, 0.68)" }}
        >
          <DialogTitle
            sx={{ m: 0, p: 2, backgroundColor: "#000", color: "#fff" }}
            id="customized-dialog-title"
          ></DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent
            dividers
            sx={{ backgroundColor: "#000", color: "#fff" }}
          >
            <Grid container sx={{ marginBottom: "5px" }}>
              <Grid md={4} lg={4} item className="coupon-sec"></Grid>
              <Grid
                container
                md={8}
                lg={8}
                xl={8}
                item
                sx={{
                  color: "#fff",
                  backgroundColor: "transparent",
                  padding: "10px",
                }}
              >
                <Grid xl={10} lg={10} item>
                  <p
                    style={{ color: "gray", margin: 1, fontFamily: "Calibri" }}
                  >
                    <i>Industry: healthcare</i>
                  </p>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", fontFamily: "Calibri" }}
                  >
                    Updated in Digital Marketing 2024
                  </Typography>
                </Grid>
                <Grid
                  xl={2}
                  lg={2}
                  item
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  {isActive && <Edit />}
                </Grid>
                <Grid
                  xs={12}
                  lg={12}
                  item
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                    marginTop: "17px",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <Notes />
                    <div style={{ marginLeft: "5px" }}>
                      <span style={{ margin: 0 }}>Sunday, February 18</span>
                      <p style={{ margin: 0, color: "gray" }}>
                        8:30 PM - 9:30 PM GMT+5:30
                      </p>
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <Rupee />
                    <div style={{ marginLeft: "5px" }}>
                      <span style={{ margin: 0 }}>5000</span>
                      <p style={{ margin: 0, color: "gray" }}>Total Revenue</p>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} lg={12} item sx={{ marginTop: "25px" }}>
              <p style={{ color: "gray", margin: 0 }}>
                <i>Description</i>
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  color: "lightgrey",
                  marginLeft: "20px",
                }}
              >
                Embarking on the highly anticipated Remote Revolution Season 2
                with a surge{" "}
                <span style={{ fontWeight: "bold" }}>...Read More</span>
              </p>
              <p style={{ color: "gray", margin: 5 }}>
                <i>Instruction</i>
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  color: "lightgrey",
                  marginLeft: "20px",
                }}
              >
                Embarking on the highly anticipated Remote Revolution Season 2
                with a surge{" "}
                <span style={{ fontWeight: "bold" }}>...Read More</span>
              </p>
            </Grid>
            <Accordion
              sx={{
                backgroundColor: "#1b1b1b",
                color: "#fff",
                marginBottom: "10px",
                marginTop: "25px",
                border: "none",
                boxShadow: "none",
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <div style={{ display: "flex" }}>
                  <Star />
                  <div style={{ marginLeft: "5px" }}>
                    <h5 style={{ margin: 0 }}>Comments</h5>
                    <p style={{ margin: 0, color: "gray" }}>12.4k Comments</p>
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "1px",
                    padding: "10px",
                    marginLeft: 10,
                  }}
                >
                  {/* <img src="http.jpg" alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '8px' }} /> */}
                  <div>
                    <Typography
                      variant="subtitle2"
                      style={{ fontWeight: "bold" }}
                    >
                      Radhika Agarwal
                    </Typography>
                    <Typography variant="caption" style={{ color: "gray" }}>
                      2 Days Ago
                    </Typography>
                    <Typography variant="body2">
                      Embarking on the highly anticipated Remote Revolution
                      Season 2 with a surge of enthusiasm! Lorem Ipsum is simply
                      dummy text of the printing and typesetting industry.
                    </Typography>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded}
              onChange={handleExpandClick}
              sx={{
                backgroundColor: "#1b1b1b",
                color: "#fff",
                border: "none",
                boxShadow: "none",
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
                aria-controls="panel1-content"
                id="panel1-header"
                style={{ display: "flex", alignItems: "center" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Chair />
                    <div style={{ marginLeft: "5px" }}>
                      <span style={{ margin: 0 }}>05/15</span>
                      <p style={{ margin: 0, color: "gray" }}>Seats Filled</p>
                    </div>
                  </div>
                  {expanded && (
                    <div
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        right: 10,
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Search Joinee"
                        style={{
                          padding: "5px 5px 5px 30px",
                          height: "40px",
                          borderRadius: "5px",
                          border: "1px solid #666666",
                          backgroundColor: "#1b1b1b",
                          color: "#fff",
                          width: "200px",
                        }}
                      />
                      <SearchIcon
                        style={{
                          position: "absolute",
                          left: "8px",
                          width: "16px",
                          height: "16px",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                  )}
                </div>
              </AccordionSummary>
              <AccordionDetails
                style={{
                  backgroundColor: "#1b1b1b",
                  color: "#fff",
                  borderRadius: "5px",
                  marginLeft: "20px",
                  marginRight: "20px",
                }}
              >
                <div
                  style={{
                    borderBottom: "1px solid #6d6d6d",
                    display: "flex",
                    height: "35px",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#242425",
                  }}
                >
                  <span style={{ marginLeft: "20px" }}>
                    Joinee User Details
                  </span>
                  {isActive && (
                    <span style={{ marginRight: "120px" }}>Actions</span>
                  )}
                </div>
                <List style={{ maxHeight: "300px", overflow: "hidden" }}>
                  <ScrollbarDiv>
                    {joinees.map((joinee, index) => (
                      <ListItem
                        key={index}
                        style={{
                          padding: "10px 0",
                          borderBottom: "1px solid #6d6d6d",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            alt={joinee.name}
                            src={joinee.avatar}
                            sx={{ marginLeft: "15px" }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={joinee.name}
                          sx={{ marginLeft: "8px" }}
                        />
                        {isActive && (
                          <Button
                            variant="contained"
                            onClick={() => handleRemoveJoinee(index)}
                            sx={{
                              marginRight: "100px",
                              borderRadius: "25px",
                              textTransform: "none",
                              backgroundColor: "white",
                              color: "black",
                            }}
                          >
                            Remove
                          </Button>
                        )}
                      </ListItem>
                    ))}
                  </ScrollbarDiv>
                </List>
              </AccordionDetails>
            </Accordion>
          </DialogContent>
        </BootstrapDialog>
      </Box>
    </ThemeProvider>
  );
}
