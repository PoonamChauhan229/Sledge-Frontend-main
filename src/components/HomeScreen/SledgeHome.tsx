import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { ReactComponent as BrandLogo } from "../../assets/Sledge-s.svg";
import { ReactComponent as SearchIcon } from "../../assets/SearchIcon.svg";
import { ReactComponent as VideocamOutlinedIcon } from "../../assets/VideocamOutlinedIcon.svg";
import { ReactComponent as NotificationsNoneOutlinedIcon } from "../../assets/notification.svg";
import { ReactComponent as OpenNotificationsNoneOutlinedIcon } from "../../assets/OpenNotification.svg";
import eventCoupen from "../../assets/eventCoupen.png";

import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { MainListItems, Profile } from "./listItems";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  InputAdornment,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MobileStepper,
  TextField,
  Badge
} from "@mui/material";
import brandLogo from "../../assets/BrandLogo.png";
import Coupon from "./CoupenCard";
import EventCoupen from "../../assets/eventCoupen.png";
import FeedPost from "./Feeds";
import { Link, useNavigate } from "react-router-dom";
import HapsImg from "../../assets/event-small.png";
import ProfilePic from "../../assets/Profile.png";
import axios, { AxiosRequestConfig } from "axios";
import NotificationPopup from "./NotificationPopup/NotificationPopup";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface Notification {
  id: number;
  message: string;
}

interface ProfileData {
  name: string;
  designation: string;
  profile_pic: string;
}

interface User {
  _id: string;
  name: string;
  profile_pic: string;
}

interface Member {
  invite_date: string;
  payment_made: boolean;
  is_admin: boolean;
  joined_at: string | null;
  left_at: string | null;
  last_active_timestamp: string | null;
  _id: string;
  user_id: User;
  invite_status: string;
}

interface Post {
  post_type: string;
  _id: string;
  title: string;
  description: string;
  total_participants: number;
  start_date: string;
  end_date: string;
  members: Member[];
  is_owner: boolean;
  created_by: User;
  chat_id: string;
  created_at: string;
  invite_code: string;
  is_blocked: boolean;
  is_reported: boolean;
  member_status: string;
  countdown: string;
}

type HomePageData = Post[];

interface NotificationData {
  date: string;
  notifications: NotificationItem[];
}

interface NotificationItem {
  _id: string;
  added_time: string;
  is_seen: boolean;
  message: string;
  notification_type: string;
  post_id: {
    _id: string;
    title: string;
    post_type: string;
    start_date: string;
    end_date: string;
  };
  user_id: {
    _id: string;
    name: string;
    user_name: string;
    profile_pic: string;
  };
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
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SledgeHome() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [profileData, setProfileData] = React.useState<ProfileData | null>(
    null
  );
  // const [homePageData, setHomePageData] = React.useState<HomePageData | null>(
  //   null
  // );
  const [homePageData, setHomePageData] = React.useState<HomePageData>([]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [openNotification, setOpenNotification] = React.useState(false);
  const [notificationData, setNotificationData] = React.useState<NotificationData[]>([]);
  const [notifications, setNotifications] = React.useState<Notification[]>([]);

  const [unseenCount, setUnseenCount] = React.useState(0);

  const handleOpen = (message: string) => {
    const newNotification: Notification = {
      id: Math.random(),
      message: message,
    };
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      newNotification,
    ]);
    setOpenNotification(!openNotification);
  };

  const handleNotificationRead = (notificationId: string) => {
    setNotificationData(prevData =>
      prevData.map(group => ({
        ...group,
        notifications: group.notifications.map(notification =>
          notification._id === notificationId
            ? { ...notification, is_seen: true }
            : notification
        )
      }))
    );
  };

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedData = homePageData.map((post) => ({
        ...post,
        countdown: calculateTimeDifference(post.start_date),
      }));
      setHomePageData(updatedData);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [homePageData]);

  const calculateTimeDifference = (startDate: string) => {
    const start = new Date(startDate).getTime();
    const now = new Date().getTime();

    if (now > start) {
      return "Event has started";
    }

    const eventStartDate = new Date(startDate);
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const difference = eventStartDate.getTime() - currentDate.getTime();

    // Calculate days, hours, minutes, seconds
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // If event starts on a different day, return formatted date
    if (days > 0) {
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      return `Events Starts on ${eventStartDate.toLocaleDateString(
        "en-US",
        options
      )}`;
    }

    // Constructing the countdown string based on non-zero values
    let countdown = "";
    if (hours > 0) {
      countdown += `${hours}h `;
    }
    if (minutes > 0) {
      countdown += `${minutes}m `;
    }
    if (seconds > 0) {
      countdown += `${seconds}s `;
    }

    return `Events Starts in ${countdown.trim()}`; // Trim to remove trailing space
  };


  React.useEffect(() => {
    const config: AxiosRequestConfig<any> = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .get("http://65.0.19.86:8000/User/view_profile", config)
      .then((res: any) => {
        // console.log("response Data", res.data);
        setProfileData(res.data.data);
        localStorage.setItem("user_details", JSON.stringify(res.data.data));
      })
      .catch((error: any) => {
        console.error("Error fetching profile:", error);
      });
    // console.log("profileData....", profileData);
  }, []);

  React.useEffect(() => {
    const config: AxiosRequestConfig<any> = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .get(
        "http://65.0.19.86:8000/User/list_home_page_data?page_no=1&page_size=20",
        config
      )
      .then((res: any) => {
        console.log("response Data", res.data);
        setHomePageData(res.data.data);
      })
      .catch((error: any) => {
        console.error("Error fetching profile:", error);
      });
    // fetchNotifications();
  }, []);

  // const fetchNotifications = () => {
  //   const config: AxiosRequestConfig<any> = {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   };

  //   axios
  //     .get(
  //       "http://65.0.19.86:8000/User/list_notifications?page_no=1&page_size=10",
  //       config
  //     )
  //     .then((res: any) => {
  //       console.log('Notification Data', res.data);
  //       const notificationGroups = res.data.data;
  //       setNotificationData(notificationGroups);

  //       const allNotifications = notificationGroups.flatMap((group: any) => group.notifications);
  //       // console.log('All Notifications:', allNotifications);

  //       const unseenNotifications = allNotifications.filter((notification: any) => !notification.is_seen);
  //       // console.log('Unseen Notifications:', unseenNotifications);

  //       setUnseenCount(unseenNotifications.length);

  //       setOpenNotification(!openNotification);

  //       if (allNotifications.length === 0) {
  //         handleOpen("There is no notification");
  //       }
  //     })
  //     .catch((error: any) => {
  //       console.error("Error fetching notifications:", error);
  //     });
  // };

  const fetchAllNotifications = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    try {
      const response = await axios.get(
        "http://65.0.19.86:8000/User/list_notifications?page_no=1&page_size=10",
        config
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return [];
    }
  };

  const updateUnseenCount = async () => {
    const notificationGroups = await fetchAllNotifications();
    const allNotifications = notificationGroups.flatMap((group: any) => group.notifications);
    // console.log('All Notifications:', allNotifications);

    const unseenNotifications = allNotifications.filter((notification: any) => !notification.is_seen);
    // console.log('Unseen Notifications:', unseenNotifications);
    setUnseenCount(unseenNotifications.length);
  };

  const fetchNotifications = async () => {
    const notificationGroups = await fetchAllNotifications();
    setNotificationData(notificationGroups);
    setOpenNotification(!openNotification);
    console.log("notifications data", notificationGroups)

    if (notificationGroups.length === 0) {
      handleOpen("There is no notification");
    }
  };


  React.useEffect(() => {
    updateUnseenCount();
    const intervalId = setInterval(updateUnseenCount, 3000);
    return () => clearInterval(intervalId);
  }, []);


  //   if (minutes > 0) {
  //     countdown += `${minutes}m `;
  //   }
  //   if (seconds > 0) {
  //     countdown += `${seconds}s `;
  //   }

  //   return `Events Starts in ${countdown.trim()}`; // Trim to remove trailing space
  // };

  const joinMeeting = (post: any) => {
    console.log(post._id);
    navigate("/join-event", { state: post._id });
  };

  function useCallBack(arg0: () => void): void {
    throw new Error("Function not implemented.");
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{ display: "flex", overflow: "hidden", fontStyle: "Calibri" }}
        className="home"
      >
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
              className="explore-sledge"
              placeholder="Explore Sledge"
              sx={{
                color: "#fff",
                textWrap: "nowrap",
                width: open ? "56%" : "53%",
                height: "50px",
                borderRadius: "25px",
                border: "1px solid #fff",
                marginLeft: open ? "" : "2rem",
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <div className="notification-button-container">
              <Button
                size="medium"
                startIcon={<VideocamOutlinedIcon />}
                className="host-button"
                variant="contained"
                onClick={() => navigate("/quickmeeting")}
                sx={{
                  textTransform: "capitalize",
                  marginLeft: open ? "17rem" : "21rem",
                }}
              >
                Quick Meeting
              </Button>
              <IconButton
                color="inherit"
                sx={{ display: "flex" }}
                onClick={fetchNotifications}
              >
                {openNotification ? (
                  // <Badge badgeContent={unseenCount} anchorOrigin={{
                  //   vertical: 'top',
                  //   horizontal: 'right',
                  // }}
                  //   sx={{
                  //     '& .MuiBadge-badge': {
                  //       right: -3,
                  //       top: 13,
                  //       padding: '0 4px',
                  //     },
                  //   }} color="error">
                  <OpenNotificationsNoneOutlinedIcon color="action" />
                  // </Badge>
                ) : (
                  <Badge badgeContent={unseenCount} anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                    sx={{
                      '& .MuiBadge-badge': {
                        right: -3,
                        top: 13,
                        padding: '0 4px',
                      },
                    }} color="error">
                    <NotificationsNoneOutlinedIcon color="action" />
                  </Badge>
                )}
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
            <Grid container spacing={5}>
              <Grid item xs={12} md={6} lg={7} xl={7}>
                <Grid container sx={{ marginBottom: "20px" }}>
                  <Carousel
                    dynamicHeight={false}
                    width="100%"
                    showIndicators={true} // Show carousel indicators (dots)
                    showStatus={false} // Hide carousel status indicator
                    showThumbs={false} // Hide carousel thumbnails
                    showArrows={false}
                  >
                    {homePageData.map((post) => (
                      <Grid
                        className="meeting-box"
                        container
                        key={post._id}
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                              ? "#111111"
                              : "#111111",

                          marginBottom: "30px",
                        }}
                      >
                        <Grid md={4} lg={4} item className="coupon-sec">
                          {/* Content for coupon section if needed */}
                        </Grid>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <img
                            src={eventCoupen}
                            style={{ borderRadius: "12px 0 0 12px" }}
                          />
                          <Grid
                            container
                            md={8}
                            lg={8}
                            xl={8}
                            item
                            className="event-post-detail"
                            sx={{
                              color: "#fff",
                              backgroundColor: "rgb(27, 27, 27)",
                              padding: "10px",
                              textAlign: "left",
                              borderRadius: "0 12px 12px 0",
                            }}
                          >
                            <Grid item xl={12} lg={12}>
                              <Typography
                                variant="h6"
                                sx={{ padding: "8px", fontWeight: "700" }}
                              >
                                <b style={{ color: "#01e5d4" }}>
                                  {post.countdown}
                                </b>
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{ padding: "8px", fontSize: "24px" }}
                              >
                                {post.title}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              md={4}
                              lg={4}
                              xl={4}
                              sx={{ padding: "5px" }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "#ffffff",
                                  fontStyle: "italic",
                                  fontSize: "11px",
                                  fontWeight: "300",
                                }}
                              >
                                Hosted By:
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{ fontSize: "12px", fontWeight: "700" }}
                              >
                                {post.created_by.name}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              md={4}
                              lg={4}
                              xl={4}
                              sx={{ padding: "5px" }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "#ffffff",
                                  fontStyle: "italic",
                                  fontSize: "11px",
                                  fontWeight: "300",
                                }}
                              >
                                Time
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{ fontSize: "12px", fontWeight: "700" }}
                              >
                                {new Date(post.start_date).toLocaleTimeString(
                                  "en-US",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              md={4}
                              lg={4}
                              xl={4}
                              sx={{ padding: "5px" }}
                            >
                              <Link
                                to={`/join-event/${post._id}`}
                                style={{ textDecoration: "none" }}
                              >
                                <Button
                                  size="medium"
                                  variant="contained"
                                  startIcon={<VideocamOutlinedIcon />}
                                  className="host-button"
                                  sx={{
                                    fontSize: "11px",
                                    textTransform: "capitalize",
                                  }}
                                  onClick={() => joinMeeting(post)}
                                >
                                  Join Now
                                </Button>
                              </Link>
                            </Grid>
                          </Grid>
                        </div>
                      </Grid>
                    ))}
                  </Carousel>
                </Grid>
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
                      comment={false}
                    />
                  )
                )}
              </Grid>
              <Grid item xs={12} md={6} lg={5} xl={5}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#1B1B1B",
                    color: "#fff",
                  }}
                >
                  <Accordion
                    defaultExpanded
                    sx={{ backgroundColor: "transparent", color: "#fff" }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <KeyboardDoubleArrowDownIcon sx={{ color: "#fff" }} />
                      }
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography variant="h5">My Events</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Divider sx={{ backgroundColor: "#fff" }} />
                      <Coupon
                        profilePic="Designer"
                        designation="Ux/UI Desiger"
                        eventTitle="Updated in Digital Marketing Event 2021"
                        eventPhoto={EventCoupen}
                        isCustomEventTitle={true}
                      />
                      <Coupon
                        profilePic="Designer"
                        designation="Ux/UI Desiger"
                        eventTitle="Updated in Digital Marketing Event 2021"
                        eventPhoto={EventCoupen}
                        isCustomEventTitle={false}
                      />
                    </AccordionDetails>
                  </Accordion>
                </Paper>
                <Paper
                  sx={{
                    p: 2,
                    marginTop: 2,
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#1B1B1B",
                    color: "#fff",
                  }}
                >
                  <Accordion
                    defaultExpanded
                    sx={{ backgroundColor: "transparent", color: "#fff" }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <KeyboardDoubleArrowDownIcon sx={{ color: "#fff" }} />
                      }
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography variant="h5"> Sledge Currents</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Divider sx={{ backgroundColor: "#fff" }} />
                      <div
                        className="haps"
                        onClick={() => navigate("/event-reg")}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 0,
                          }}
                        >
                          <p style={{ color: "gray" }}> 10th feb,2024</p>
                          <h6>Kapadia Ehtesham’s</h6>
                          <p style={{ color: "gray" }}>03:00:00 Hours</p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={HapsImg}
                            alt="haps event image"
                            height={50}
                            width={80}
                          />
                          <h5 style={{ marginLeft: "10px" }}>
                            Updated in Digital Marketing Event 2021
                          </h5>
                        </div>
                      </div>
                      <div
                        className="haps1"
                        onClick={() => navigate("/event-reg")}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            margin: 0,
                          }}
                        >
                          <p style={{ color: "gray" }}>10th feb,2024</p>
                          <h6>Kapadia Ehtesham’s</h6>
                          <p style={{ color: "gray" }}>03:00:00 Hours</p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            margin: 0,
                          }}
                        >
                          <img
                            src={HapsImg}
                            alt="haps event image"
                            height={50}
                            width={80}
                          />
                          <h5 style={{ marginLeft: "10px" }}>
                            Updated in Digital Marketing Event 2021
                          </h5>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <NotificationPopup
          open={openNotification}
          onClose={() => setOpenNotification(false)}
          notifications={notificationData}
          setNotifications={setNotificationData}
          onNotificationRead={handleNotificationRead}
        />
      </Box>
    </ThemeProvider>
  );
}
