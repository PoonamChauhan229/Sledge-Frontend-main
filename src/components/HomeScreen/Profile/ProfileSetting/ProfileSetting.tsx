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
import { MainListItems, Profile } from "../../listItems";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  InputLabel,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Radio,
  RadioGroup,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
  Autocomplete
} from "@mui/material";
import { ReactComponent as BrandLogo } from "../../../../assets/Sledge-s.svg";
import brandLogo from "../../../../assets/BrandLogo.png";
import { ReactComponent as SearchIcon } from "../../../../assets/SearchIcon.svg";
import { useNavigate } from "react-router-dom";
import ProfilePic from "../../../../assets/Profile.png";
import { Paper, ListItem } from "@mui/material";
import { ProfileMenu } from "../../listItems";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import BlockIcon from "@mui/icons-material/Block";
import LockIcon from '@mui/icons-material/LockOutlined';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
// import Select from 'react-select';
import ISO6391 from 'iso-639-1';
import { useMemo } from "react";
import { Card, CardContent, CardActions, Avatar, Dialog, DialogContent, DialogActions } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';

interface Message {
  id: number;
  sender: string;
  message: string;
}

interface Chat {
  id: number;
  name: string;
  messages: Message[];
}

interface ProfileData {
  name: string;
  designation: string;
  profile_pic: string;
}

const label = { inputProps: { "aria-label": "Switch demo" } };

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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface LanguageOption {
  value: string;
  label: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const darkTheme = createTheme({
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: '#333',
          color: '#fff',
          border: "1px solid #666666",
          marginTop: "8px",
          borderRadius: "15px"
        },
        option: {
          '&:hover': {
            backgroundColor: '#555',
          },
          '&[aria-selected="true"]': {
            backgroundColor: '#777',
          },
        },
      },
    },
  },
});

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

interface PostProps {
  author: string;
  time: string;
  content: string;
}



const Post: React.FC<PostProps> = ({ author, time, content }) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openStrikeDialog, setOpenStrikeDialog] = React.useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleOpenStrikeDialog = () => setOpenStrikeDialog(true);
  const handleCloseStrikeDialog = () => setOpenStrikeDialog(false);
  return (
    <Box sx={{ width: 300, mr: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Avatar src={ProfilePic} sx={{ width: 24, height: 24, mr: 1 }} />
        <Typography variant="subtitle1">{author}</Typography>
        <Typography variant="caption" sx={{ ml: 'auto' }}>{time}</Typography>
      </Box>
      <Typography variant="body2" sx={{ mb: 1 }}>
        {content}
      </Typography>
      <Box sx={{ height: 150, bgcolor: '#111111' }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: "black", p: 2 }}>
        <Button variant="contained" size="small" onClick={handleOpenStrikeDialog} sx={{ backgroundColor: "#333", border: "1px solid #ccc", borderRadius: "8px", textTransform: "none" }}>
          Check Strike
        </Button>
        <Button variant="contained" size="small" sx={{ backgroundColor: "#851111", borderRadius: "8px", textTransform: "none" }} onClick={handleOpenDialog}>
          Remove Content
        </Button>
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            bgcolor: 'black',
            borderRadius: '14px',
            maxWidth: '400px',
            width: '100%'
          }
        }}
      >
        <DialogContent sx={{ p: 3 }}>
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white'
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
            <ErrorOutlineIcon sx={{ fontSize: 60, color: 'white', mb: 2 }} />
            <Typography variant="h6" align="center" sx={{ color: 'white', mb: 2 }}>
              Your Post has been removed due to adult content which is a violation!
            </Typography>
            <Typography variant="body2" align="center" sx={{ color: '#999', mb: 3 }}>
              consecteturadipiscingelit.Seddoeiusmodtemp
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button
            variant="contained"
            onClick={handleCloseDialog}
            sx={{
              background: "linear-gradient(to bottom, #01e5d4, #137aea)",
              color: '#fff',
              fontWeight: "bold",
              textTransform: "none",
              padding: "10px 36px",
              borderRadius: "12px",
              '&:hover': {
                background: 'linear-gradient(to bottom, #01e5d4, #137aea);'
              }
            }}
          >
            Appeal
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openStrikeDialog}
        onClose={handleCloseStrikeDialog}
        PaperProps={{
          sx: {
            bgcolor: 'black',
            borderRadius: '14px',
            maxWidth: '600px',
            width: '100%'
          }
        }}
      >
        <DialogContent sx={{ p: 5 }}>
          <Typography sx={{ color: 'white', mb: 2 }}>
            Type of Strike
          </Typography>
          <TextField
            fullWidth
            // variant="outlined"
            placeholder="Adult Content"
            InputProps={{
              sx: {
                bgcolor: '#333',
                border: "1px solid #ccc",
                borderRadius: "25px",
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#555',
                },
              }
            }}
            sx={{ mb: 2 }}
          />
          <Typography sx={{ color: 'white', mb: 2 }}>
            Description
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={2}
            placeholder="Describe your Appeal"
            variant="outlined"
            InputProps={{
              sx: {
                bgcolor: '#333',
                color: 'white',
                border: "1px solid #ccc",
                borderRadius: "25px",
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#555',
                },
              }
            }}
            sx={{ mb: 2 }}
          />
          <Typography sx={{ color: 'white', mb: 2 }}>
            Upload
          </Typography>
          <TextField
            select
            fullWidth
            defaultValue="JPG"
            variant="outlined"
            InputProps={{
              sx: {
                bgcolor: '#333',
                color: 'white',
                border: "1px solid #ccc",
                borderRadius: "25px",
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#555',
                },
              }
            }}
            sx={{ mb: 1 }}
          >
            <MenuItem value="JPG">JPG</MenuItem>
          </TextField>
          <Box
            sx={{
              border: '1px solid #ccc',
              borderRadius: '15px',
              p: 2,
              textAlign: 'center',
              mb: 2,
              bgcolor: '#333',
            }}
          >
            <Typography variant="body2" sx={{ color: '#999' }}>
              Drag and drop your file here
            </Typography>
            <Typography variant="body2" sx={{ color: '#999' }}>
              - or -
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 1,
                background: "linear - gradient(to bottom, #01e5d4, #137aea)",
                color: '#fff',
                borderRadius: "25px",
                textTransform: "none",
                '&:hover': { background: "linear - gradient(to bottom, #01e5d4, #137aea)" }
              }}
            >
              Browse Files
            </Button>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', p: 3 }}>
          <Button
            onClick={handleCloseStrikeDialog}
            sx={{ color: '#fff', textTransform: 'none', border: "1px solid #ccc", borderRadius: "25px" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              background: "linear - gradient(to bottom, #01e5d4, #137aea)",
              color: '#fff',
              borderRadius: "25px",
              textTransform: 'none',
              '&:hover': {
                background: "linear - gradient(to bottom, #01e5d4, #137aea)", borderRadius: "25px"
              }
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
};

const VideoItem = () => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openStrikeDialog, setOpenStrikeDialog] = React.useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleOpenStrikeDialog = () => setOpenStrikeDialog(true);
  const handleCloseStrikeDialog = () => setOpenStrikeDialog(false);
  return (
    <Box sx={{ width: 300, mr: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Avatar src={ProfilePic} sx={{ width: 24, height: 24, mr: 1 }} />
        <Typography variant="body2">Kapadia Etteshan</Typography>
        <Typography variant="caption" sx={{ ml: 'auto' }}>kep_09_eht</Typography>
      </Box>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Updated in Digital Marketing Event 2021-2024
      </Typography>
      <Typography variant="caption" component="div" sx={{ display: 'flex', mb: 1, gap: 2, color: "#6c6685" }} >
        <span>4 months ago</span>
        <span>57K views</span>
        <span>4.2 overall ratings</span>
      </Typography>
      <Box sx={{ height: 150, bgcolor: '#111111' }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: "black", p: 2 }}>
        <Button variant="contained" size="small" onClick={handleOpenStrikeDialog} sx={{ backgroundColor: "#333", border: "1px solid #ccc", borderRadius: "8px", textTransform: "none" }}>
          Check Strike
        </Button>
        <Button variant="contained" size="small" sx={{ backgroundColor: "#851111", borderRadius: "8px", textTransform: "none" }} onClick={handleOpenDialog}>
          Remove Content
        </Button>
      </Box>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            bgcolor: 'black',
            borderRadius: '14px',
            maxWidth: '400px',
            width: '100%'
          }
        }}
      >
        <DialogContent sx={{ p: 3 }}>
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white'
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
            <ErrorOutlineIcon sx={{ fontSize: 60, color: 'white', mb: 2 }} />
            <Typography align="center" sx={{ color: 'white', mb: 2, fontWeight: "bold", fontSize: "19px" }}>
              Your Content Owner "Radhika Agarwal" has proved their claim
            </Typography>
            <Typography variant="body2" align="center" sx={{ color: "#fff", p: 3 }}>
              If you have an Appeal to make
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 4 }}>
          <Button
            variant="contained"
            onClick={handleCloseDialog}
            sx={{
              background: "linear-gradient(to bottom, #01e5d4, #137aea)",
              color: '#fff',
              fontWeight: "bold",
              textTransform: "none",
              padding: "10px 36px",
              borderRadius: "12px",
              '&:hover': {
                background: 'linear-gradient(to bottom, #01e5d4, #137aea);'
              }
            }}
          >
            Appeal
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openStrikeDialog}
        onClose={handleCloseStrikeDialog}
        PaperProps={{
          sx: {
            bgcolor: 'black',
            borderRadius: '14px',
            maxWidth: '600px',
            width: '100%'
          }
        }}
      >
        <DialogContent sx={{ p: 5 }}>
          <Typography sx={{ color: 'white', mb: 2 }}>
            Description
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={2}
            placeholder="Describe your Appeal"
            variant="outlined"
            InputProps={{
              sx: {
                bgcolor: '#333',
                color: 'white',
                border: "1px solid #ccc",
                borderRadius: "25px",
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#555',
                },
              }
            }}
            sx={{ mb: 2 }}
          />
          <Typography sx={{ color: 'white', mb: 2 }}>
            Upload
          </Typography>
          <TextField
            select
            fullWidth
            defaultValue="JPG"
            variant="outlined"
            InputProps={{
              sx: {
                bgcolor: '#333',
                color: 'white',
                border: "1px solid #ccc",
                borderRadius: "25px",
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#555',
                },
              }
            }}
            sx={{ mb: 1 }}
          >
            <MenuItem value="JPG">JPG</MenuItem>
          </TextField>
          <Box
            sx={{
              border: '1px solid #ccc',
              borderRadius: '15px',
              p: 2,
              textAlign: 'center',
              mb: 2,
              bgcolor: '#333',
            }}
          >
            <Typography variant="body2" sx={{ color: '#999' }}>
              Drag and drop your file here
            </Typography>
            <Typography variant="body2" sx={{ color: '#999' }}>
              - or -
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 1,
                background: "linear - gradient(to bottom, #01e5d4, #137aea)",
                color: '#fff',
                borderRadius: "25px",
                textTransform: "none",
                '&:hover': { background: "linear - gradient(to bottom, #01e5d4, #137aea)" }
              }}
            >
              Browse Files
            </Button>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', p: 3 }}>
          <Button
            onClick={handleCloseStrikeDialog}
            sx={{ color: '#fff', textTransform: 'none', border: "1px solid #ccc", borderRadius: "25px", padding: 2 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              background: "linear - gradient(to bottom, #01e5d4, #137aea)",
              color: '#fff',
              borderRadius: "25px",
              textTransform: 'none',
              padding: 2,
              '&:hover': {
                background: "linear - gradient(to bottom, #01e5d4, #137aea)", borderRadius: "25px"
              }
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
};

export default function ProfileSetting() {
  const [selectedContent, setSelectedContent] = React.useState<string | null>(
    null
  );
  const [value, setValue] = React.useState(0);
  const [showPassword, setShowPassword] = React.useState(false);
  const [currency, setCurrency] = React.useState("");
  const [profileData, setProfileData] = React.useState<ProfileData | null>(
    null
  );
  const [selectedLanguage, setSelectedLanguage] = React.useState<LanguageOption | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

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

  const handleChangeCurrency = (event: SelectChangeEvent) => {
    setCurrency(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleMenuItemClick = (content: any) => {
    setSelectedContent(content);
  };

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  const languageOptions: LanguageOption[] = useMemo(() => {
    return ISO6391.getAllNames().map(lang => ({
      value: ISO6391.getCode(lang),
      label: lang
    }));
  }, []);

  const posts = [
    { id: 1, author: 'Kapadia Ehtesham', time: '4 months ago', content: 'Join us at the Digital Marketing Event 2023, where industry leaders converge to explore the latest trends, strategies, and innovations' },
    { id: 2, author: 'Kapadia Ehtesham', time: '4 months ago', content: 'Join us at the Digital Marketing Event 2023, where industry leaders converge to explore the latest trends, strategies, and innovations' },
    { id: 3, author: 'Kapadia Ehtesham', time: '4 months ago', content: 'Join us at the Digital Marketing Event 2023, where industry leaders converge to explore the latest trends, strategies, and innovations' },
    { id: 4, author: 'Kapadia Ehtesham', time: '4 months ago', content: 'Join us at the Digital Marketing Event 2023, where industry leaders converge to explore the latest trends, strategies, and innovations' },
    { id: 5, author: 'Kapadia Ehtesham', time: '4 months ago', content: 'Join us at the Digital Marketing Event 2023, where industry leaders converge to explore the latest trends, strategies, and innovations' },
  ];

  // const handlePrev = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : posts.length - 1));
  // };

  // const handleNext = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex < posts.length - 1 ? prevIndex + 1 : 0));
  // };
  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(posts.length - 2, prev + 1));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }} className="profilesetting">
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
              <Profile profileData={profileData} />
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
            <Grid container spacing={4} className="chats" height="96%">
              {/* Left Side - Chat List */}
              <Grid item xs={3}>
                <Paper
                  style={{
                    height: "100%",
                    padding: "16px",
                    backgroundColor: "rgba(27, 27, 27, 1)",
                    color: "#fff",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ margin: "10px", fontWeight: "bold", textAlign: "center" }}
                  >
                    Account Settings
                  </Typography>
                  <Tabs
                    orientation="vertical"
                    // variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    // sx={{ color: "#fff !important" }}
                    sx={{
                      color: "#fff !important",
                      '& .MuiTabs-indicator': {
                        display: 'none',
                      },
                      '& .MuiTab-root': {
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        textAlign: 'left',
                        textTransform: 'none',
                        fontWeight: 'normal',
                        fontSize: '16px',
                        padding: '12px 16px',
                        '&.Mui-selected': {
                          color: '#fff',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                        },
                      },
                    }}
                  >
                    <Tab label="Privacy" {...a11yProps(0)} />
                    <Tab label="notification" {...a11yProps(1)} />
                    <Tab label="contents" {...a11yProps(2)} />
                    <Tab label="payments" {...a11yProps(3)} />
                    <Tab label="others" {...a11yProps(4)} />
                  </Tabs>
                </Paper>
              </Grid>

              {/* Right Side - Selected Chat */}
              <Grid item xs={9}>
                <TabPanel value={value} index={0}>
                  <Paper
                    style={{
                      height: "100%",
                      padding: "16px",
                      backgroundColor: "rgba(27, 27, 27, 1)",
                      color: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "25px",
                    }}
                  >
                    <Accordion
                      sx={{ backgroundColor: "transparent", color: "#fff" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ padding: 0 }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          {" "}
                          Password and Security
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="body1">Change Password</Typography>
                        <TextField
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter Old Password"
                          size="small"
                          sx={{ margin: "5px", width: "200px", borderRadius: "25px", border: "1px solid #ccc" }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockIcon sx={{ color: "#fff" }} />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleTogglePasswordVisibility}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff sx={{ color: "#fff" }} />
                                  ) : (
                                    <Visibility sx={{ color: "#fff" }} />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <TextField
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter New Password"
                          size="small"
                          sx={{ margin: "5px", width: "200px", borderRadius: "25px", border: "1px solid #ccc" }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockIcon sx={{ color: "#fff" }} />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleTogglePasswordVisibility}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff sx={{ color: "#fff" }} />
                                  ) : (
                                    <Visibility sx={{ color: "#fff" }} />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <TextField
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirm New Password"
                          size="small"
                          sx={{ margin: "5px", width: "200px", borderRadius: "25px", border: "1px solid #ccc" }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockIcon sx={{ color: "#fff" }} />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleTogglePasswordVisibility}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff sx={{ color: "#fff" }} />
                                  ) : (
                                    <Visibility sx={{ color: "#fff" }} />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <Button variant="contained" className="update-button">
                          Update
                        </Button>
                      </AccordionDetails>
                    </Accordion>
                  </Paper>
                  <Paper
                    style={{
                      height: "100%",
                      padding: "16px",
                      backgroundColor: "rgba(27, 27, 27, 1)",
                      color: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "25px",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ marginBottom: "10px", fontWeight: "bold" }}
                    >
                      Chat
                    </Typography>
                    <Accordion
                      sx={{ backgroundColor: "transparent", color: "#fff" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ padding: 0 }}
                      >
                        <Typography variant="body1">
                          {" "}
                          Who can message you?
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <FormControl sx={{ width: "100%" }}>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="user"
                            name="radio-buttons-group"
                          >
                            <FormControlLabel
                              value="user"
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                              control={<Radio sx={{ color: "#fff" }} />}
                              label="Any Sledge Verified user"
                              labelPlacement="start"
                            />
                            <FormControlLabel
                              value="any"
                              control={<Radio sx={{ color: "#fff" }} />}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                              label="Only the User who I joined as an Audience"
                              labelPlacement="start"
                            />
                            {/* <FormControlLabel
                              value="personel"
                              control={<Radio sx={{ color: "#fff" }} />}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                              label="Only my Audience"
                              labelPlacement="start"
                            /> */}
                          </RadioGroup>
                        </FormControl>
                      </AccordionDetails>
                    </Accordion>
                    <Divider
                      sx={{ backgroundColor: "#fff", marginBottom: "10px" }}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body1">
                        Stop unknown people from Messaging you
                      </Typography>
                      {/* <Switch {...label} sx={{ color: "skyblue" }} /> */}
                      <div style={{ marginBottom: "1%" }}>
                        <label className="switch">
                          <input defaultChecked type="checkbox" />
                          <span className="slider1 round"></span>
                        </label>
                      </div>
                    </div>
                  </Paper>
                  <Paper
                    style={{
                      height: "100%",
                      padding: "16px",
                      backgroundColor: "rgba(27, 27, 27, 1)",
                      color: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "25px",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ marginBottom: "10px", fontWeight: "bold" }}
                    >
                      Posts
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body1">
                        {" "}
                        Allow others to see comment details in your posts ?
                      </Typography>
                      <Checkbox sx={{ color: "#fff" }} />
                    </div>
                    <Divider
                      sx={{ backgroundColor: "gray", marginBottom: "10px" }}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body1">
                        {" "}
                        Allow others to see like details in your posts and
                        Streams ?
                      </Typography>
                      <Checkbox sx={{ color: "#fff" }} />
                    </div>
                  </Paper>
                  <Paper
                    style={{
                      height: "100%",
                      padding: "16px",
                      backgroundColor: "rgba(27, 27, 27, 1)",
                      color: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "25px",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ marginBottom: "10px", fontWeight: "bold" }}
                    >
                      Private
                    </Typography>
                    <Accordion
                      sx={{ backgroundColor: "transparent", color: "#fff" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ padding: 0 }}
                      >
                        <Typography variant="body1">
                          {" "}
                          Who can see your profile
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <FormControl sx={{ width: "100%" }}>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="user"
                            name="radio-buttons-group"
                          >
                            <FormControlLabel
                              value="user"
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                              control={<Radio sx={{ color: "#fff" }} />}
                              label="Any Sledge User"
                              labelPlacement="start"
                            />
                            <FormControlLabel
                              value="personel"
                              control={<Radio sx={{ color: "#fff" }} />}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                              label="Only my Audience"
                              labelPlacement="start"
                            />
                          </RadioGroup>
                        </FormControl>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      sx={{ backgroundColor: "transparent", color: "#fff" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ padding: 0 }}
                      >
                        <Typography variant="body1">
                          {" "}
                          Who can Tag you
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <FormControl sx={{ width: "100%" }}>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="user"
                            name="radio-buttons-group"
                          >
                            <FormControlLabel
                              value="user"
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                              control={<Radio sx={{ color: "#fff" }} />}
                              label="Any Sledge User"
                              labelPlacement="start"
                            />
                            <FormControlLabel
                              value="personel"
                              control={<Radio sx={{ color: "#fff" }} />}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                              label="Only my Audience"
                              labelPlacement="start"
                            />
                          </RadioGroup>
                        </FormControl>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      sx={{ backgroundColor: "transparent", color: "#fff" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ padding: 0 }}
                      >
                        <Typography variant="body1">
                          {" "}
                          Who can mention you
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <FormControl sx={{ width: "100%" }}>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="user"
                            name="radio-buttons-group"
                          >
                            <FormControlLabel
                              value="user"
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                              control={<Radio sx={{ color: "#fff" }} />}
                              label="Any Sledge User"
                              labelPlacement="start"
                            />
                            <FormControlLabel
                              value="personel"
                              control={<Radio sx={{ color: "#fff" }} />}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                              label="Only my Audience"
                              labelPlacement="start"
                            />
                          </RadioGroup>
                        </FormControl>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      sx={{ backgroundColor: "transparent", color: "#fff" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ padding: 0 }}
                      >
                        <Typography variant="body1">
                          {" "}
                          Who can see your posts & Streams
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <FormControl sx={{ width: "100%" }}>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="user"
                            name="radio-buttons-group"
                          >
                            <FormControlLabel
                              value="user"
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                              control={<Radio sx={{ color: "#fff" }} />}
                              label="Any Sledge User"
                              labelPlacement="start"
                            />
                            <FormControlLabel
                              value="personel"
                              control={<Radio sx={{ color: "#fff" }} />}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                              label="Only my Audience"
                              labelPlacement="start"
                            />
                          </RadioGroup>
                        </FormControl>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      sx={{ backgroundColor: "transparent", color: "#fff" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ padding: 0 }}
                      >
                        <Typography variant="body1">
                          {" "}
                          Who can join your Events
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <FormControl sx={{ width: "100%" }}>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="user"
                            name="radio-buttons-group"
                          >
                            <FormControlLabel
                              value="user"
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                              control={<Radio sx={{ color: "#fff" }} />}
                              label="Any Sledge User"
                              labelPlacement="start"
                            />
                            <FormControlLabel
                              value="personel"
                              control={<Radio sx={{ color: "#fff" }} />}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                              label="Only my Audience"
                              labelPlacement="start"
                            />
                            <FormControlLabel
                              value="personel"
                              control={<Radio sx={{ color: "#fff" }} />}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                              label="Only the people that I invite"
                              labelPlacement="start"
                            />
                          </RadioGroup>
                        </FormControl>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      sx={{ backgroundColor: "transparent", color: "#fff" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ padding: 0 }}
                      >
                        <Typography variant="body1">
                          Who can review you
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <FormControl sx={{ width: "100%" }}>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="user"
                            name="radio-buttons-group"
                          >
                            <FormControlLabel
                              value="user"
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                              control={<Radio sx={{ color: "#fff" }} />}
                              label="Any Sledge User"
                              labelPlacement="start"
                            />
                            <FormControlLabel
                              value="personel"
                              control={<Radio sx={{ color: "#fff" }} />}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                              label="Only my Audience"
                              labelPlacement="start"
                            />
                          </RadioGroup>
                        </FormControl>
                      </AccordionDetails>
                    </Accordion>
                  </Paper>
                  <Paper
                    style={{
                      height: "100%",
                      padding: "16px",
                      backgroundColor: "rgba(27, 27, 27, 1)",
                      color: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "25px",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ marginBottom: "10px", fontWeight: "bold" }}
                    >
                      Events & Meetings
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body1">
                        {" "}
                        Allow Any Sledge user to Invite me
                      </Typography>
                      <Checkbox sx={{ color: "#fff" }} />
                    </div>
                    <Divider
                      sx={{ backgroundColor: "gray", marginBottom: "10px" }}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body1">
                        Only the people who i joined as an Audience
                      </Typography>
                      <Checkbox sx={{ color: "#fff" }} />
                    </div>
                  </Paper>
                  <Paper
                    style={{
                      height: "100%",
                      padding: "16px",
                      backgroundColor: "rgba(27, 27, 27, 1)",
                      color: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "25px",
                    }}
                  >
                    <Accordion
                      sx={{ backgroundColor: "transparent", color: "#fff" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ padding: 0 }}
                      >
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                          {" "}
                          Blocked Accounts
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "15px",
                            }}
                          >
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <img src={ProfilePic} height={30} width={30} />
                              <div style={{ margin: "15px" }}>
                                <h4 style={{ margin: 0 }}>
                                  Kapadila Ehsteshem
                                </h4>
                                <p style={{ margin: 0 }}>kep_09_eht</p>
                              </div>
                            </div>
                            <div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 5
                                }}
                              >
                                {" "}
                                <BlockIcon />{" "}
                                <p style={{ fontWeight: "bold" }}>Unblock</p>
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "15px",
                            }}
                          >
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <img src={ProfilePic} height={30} width={30} />
                              <div style={{ margin: "15px" }}>
                                <h4 style={{ margin: 0 }}>
                                  Kapadila Ehsteshem
                                </h4>
                                <p style={{ margin: 0 }}>kep_09_eht</p>
                              </div>
                            </div>
                            <div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 5
                                }}
                              >
                                {" "}
                                <BlockIcon />{" "}
                                <p style={{ fontWeight: "bold" }}>Unblock</p>
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "15px",
                            }}
                          >
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <img src={ProfilePic} height={30} width={30} />
                              <div style={{ margin: "15px" }}>
                                <h4 style={{ margin: 0 }}>
                                  Kapadila Ehsteshem
                                </h4>
                                <p style={{ margin: 0 }}>kep_09_eht</p>
                              </div>
                            </div>
                            <div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 5
                                }}
                              >
                                {" "}
                                <BlockIcon />{" "}
                                <p style={{ fontWeight: "bold" }}>Unblock</p>
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "15px",
                            }}
                          >
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <img src={ProfilePic} height={30} width={30} />
                              <div style={{ margin: "15px" }}>
                                <h4 style={{ margin: 0 }}>
                                  Kapadila Ehsteshem
                                </h4>
                                <p style={{ margin: 0 }}>kep_09_eht</p>
                              </div>
                            </div>
                            <div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 5
                                }}
                              >
                                {" "}
                                <BlockIcon />
                                <p style={{ fontWeight: "bold" }}>Unblock</p>
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "5px",
                            }}
                          >
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <img src={ProfilePic} height={30} width={30} />
                              <div style={{ margin: "15px" }}>
                                <h4 style={{ margin: 0 }}>
                                  Kapadila Ehsteshem
                                </h4>
                                <p style={{ margin: 0 }}>kep_09_eht</p>
                              </div>
                            </div>
                            <div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 5
                                }}
                              >
                                {" "}
                                <BlockIcon />{" "}
                                <p style={{ fontWeight: "bold" }}>Unblock</p>
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "5px",
                            }}
                          >
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <img src={ProfilePic} height={30} width={30} />
                              <div style={{ margin: "15px" }}>
                                <h4 style={{ margin: 0 }}>
                                  Kapadila Ehsteshem
                                </h4>
                                <p style={{ margin: 0 }}>kep_09_eht</p>
                              </div>
                            </div>
                            <div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 5
                                }}
                              >
                                {" "}
                                <BlockIcon />{" "}
                                <p style={{ fontWeight: "bold" }}>Unblock</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </Paper>
                  <Paper
                    style={{
                      height: "100%",
                      padding: "16px",
                      backgroundColor: "rgba(27, 27, 27, 1)",
                      color: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "25px",
                    }}
                  >
                    <Accordion
                      sx={{ backgroundColor: "transparent", color: "#fff" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ padding: 0 }}
                      >
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                          {" "}
                          Spam Accounts
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "15px",
                            }}
                          >
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <img src={ProfilePic} height={30} width={30} />
                              <div style={{ margin: "15px" }}>
                                <h4 style={{ margin: 0 }}>
                                  Kapadila Ehsteshem
                                </h4>
                                <p style={{ margin: 0 }}>kep_09_eht</p>
                              </div>
                            </div>
                            <div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 5
                                }}
                              >
                                {" "}
                                <ErrorOutlineIcon />{" "}
                                <p style={{ fontWeight: "bold" }}>Not Spam</p>
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "15px",
                            }}
                          >
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <img src={ProfilePic} height={30} width={30} />
                              <div style={{ margin: "15px" }}>
                                <h4 style={{ margin: 0 }}>
                                  Kapadila Ehsteshem
                                </h4>
                                <p style={{ margin: 0 }}>kep_09_eht</p>
                              </div>
                            </div>
                            <div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 5
                                }}
                              >
                                {" "}
                                <ErrorOutlineIcon />{" "}
                                <p style={{ fontWeight: "bold" }}>Not Spam</p>
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "15px",
                            }}
                          >
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <img src={ProfilePic} height={30} width={30} />
                              <div style={{ margin: "15px" }}>
                                <h4 style={{ margin: 0 }}>
                                  Kapadila Ehsteshem
                                </h4>
                                <p style={{ margin: 0 }}>kep_09_eht</p>
                              </div>
                            </div>
                            <div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 5
                                }}
                              >
                                {" "}
                                <ErrorOutlineIcon />{" "}
                                <p style={{ fontWeight: "bold" }}>Not Spam</p>
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "15px",
                            }}
                          >
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <img src={ProfilePic} height={30} width={30} />
                              <div style={{ margin: "15px" }}>
                                <h4 style={{ margin: 0 }}>
                                  Kapadila Ehsteshem
                                </h4>
                                <p style={{ margin: 0 }}>kep_09_eht</p>
                              </div>
                            </div>
                            <div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 5
                                }}
                              >
                                {" "}
                                <ErrorOutlineIcon />
                                <p style={{ fontWeight: "bold" }}>Not Spam</p>
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "5px",
                            }}
                          >
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <img src={ProfilePic} height={30} width={30} />
                              <div style={{ margin: "15px" }}>
                                <h4 style={{ margin: 0 }}>
                                  Kapadila Ehsteshem
                                </h4>
                                <p style={{ margin: 0 }}>kep_09_eht</p>
                              </div>
                            </div>
                            <div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 5
                                }}
                              >
                                {" "}
                                <ErrorOutlineIcon />{" "}
                                <p style={{ fontWeight: "bold" }}>Not Spam</p>
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "5px",
                            }}
                          >
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <img src={ProfilePic} height={30} width={30} />
                              <div style={{ margin: "15px" }}>
                                <h4 style={{ margin: 0 }}>
                                  Kapadila Ehsteshem
                                </h4>
                                <p style={{ margin: 0 }}>kep_09_eht</p>
                              </div>
                            </div>
                            <div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 5
                                }}
                              >
                                {" "}
                                <ErrorOutlineIcon />{" "}
                                <p style={{ fontWeight: "bold" }}>Not Spam</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </Paper>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Typography
                    variant="h6"
                    sx={{ marginBottom: "10px", fontWeight: "bold" }}
                  >
                    Events & Meetings
                  </Typography>
                  <Paper
                    style={{
                      height: "100%",
                      padding: "16px",
                      backgroundColor: "rgba(27, 27, 27, 1)",
                      color: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "25px",
                    }}
                  >
                    <Accordion
                      sx={{ backgroundColor: "transparent", color: "#fff" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ padding: 0 }}
                      >
                        <Typography variant="body1">
                          {" "}
                          Who can invite you to an Event
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <FormControl sx={{ width: "100%" }}>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="user"
                            name="radio-buttons-group"
                          >
                            <FormControlLabel
                              value="user"
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                              control={<Radio sx={{ color: "#fff" }} />}
                              // label="Who can invite you to an Event"
                              label="Any Sledge User"
                              labelPlacement="start"
                            />
                            <FormControlLabel
                              value="any"
                              control={<Radio sx={{ color: "#fff" }} />}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                              // label="Who can invite you to an Event"
                              label="Only the User to whome i'm their Audience"
                              labelPlacement="start"
                            />
                            <FormControlLabel
                              value="personel"
                              control={<Radio sx={{ color: "#fff" }} />}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                              label="Only my Audience"
                              labelPlacement="start"
                            />
                            <FormControlLabel
                              value="none"
                              control={<Radio sx={{ color: "#fff" }} />}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                              label="None"
                              labelPlacement="start"
                            />
                          </RadioGroup>
                        </FormControl>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      sx={{ backgroundColor: "transparent", color: "#fff", borderBottom: "1px solid #666666" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ padding: 0 }}
                      >
                        <Typography variant="body1">
                          {" "}
                          Who can invite you to a Meeting
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <FormControl sx={{ width: "100%" }}>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="user"
                            name="radio-buttons-group"
                          >
                            <FormControlLabel
                              value="user"
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                              control={<Radio sx={{ color: "#fff" }} />}
                              // label="Who can invite you to an Event"
                              label="Any Sledge User"
                              labelPlacement="start"
                            />
                            <FormControlLabel
                              value="any"
                              control={<Radio sx={{ color: "#fff" }} />}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                              // label="Who can invite you to an Event"
                              label="Only the User to whome i'm their Audience"
                              labelPlacement="start"
                            />
                            <FormControlLabel
                              value="personel"
                              control={<Radio sx={{ color: "#fff" }} />}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                              label="Only my Audience"
                              labelPlacement="start"
                            />
                            <FormControlLabel
                              value="none"
                              control={<Radio sx={{ color: "#fff" }} />}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                              label="None"
                              labelPlacement="start"
                            />
                          </RadioGroup>
                        </FormControl>
                      </AccordionDetails>
                    </Accordion>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderBottom: "1px solid #666666"
                      }}
                    >
                      <Typography variant="body1" sx={{ marginTop: "7px" }}>
                        {" "}
                        Allow Registered Event Notifications
                      </Typography>
                      <Checkbox sx={{ color: "#fff" }} />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderBottom: "1px solid #666666",
                      }}
                    >
                      <Typography variant="body1" sx={{
                        marginTop: "7px"
                      }}>
                        {" "}
                        Allow Accepted Meeting Notifications
                      </Typography>
                      <Checkbox sx={{ color: "#fff" }} />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body1" sx={{ marginTop: "7px" }}>
                        Allow Mail notification for Events & Meetings
                      </Typography>
                      <Checkbox sx={{ color: "#fff" }} />
                    </div>
                  </Paper>
                  <Typography
                    variant="h6"
                    sx={{ marginBottom: "10px", fontWeight: "bold" }}
                  >
                    Allow Notifications
                  </Typography>
                  <Paper
                    style={{
                      height: "100%",
                      padding: "16px",
                      backgroundColor: "rgba(27, 27, 27, 1)",
                      color: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "25px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: 3
                      }}
                    >
                      <Typography variant="body1">
                        {" "}
                        Allow Notifications from Chats
                      </Typography>
                      {/* <Switch sx={{ color: "#fff" }} /> */}
                      <div>
                        <label className="switch">
                          <input defaultChecked type="checkbox" />
                          <span className="slider1 round"></span>
                        </label>
                      </div>
                    </div>
                  </Paper>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <Typography
                    variant="h6"
                    sx={{ marginBottom: "10px", fontWeight: "bold" }}
                  >
                    Removed Content
                  </Typography>
                  <Paper
                    style={{
                      height: "100%",
                      padding: "16px",
                      backgroundColor: "rgba(27, 27, 27, 1)",
                      color: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "25px",
                    }}
                  >
                    <Accordion
                      sx={{ backgroundColor: "transparent", color: "#fff" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ padding: 0 }}
                      >
                        <Typography variant="body1">
                          {" "}
                          Copyright Strikes
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box sx={{ p: 1, width: '100%', mb: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="h6" sx={{ color: 'white' }}>Posts</Typography>
                            <Box>
                              <IconButton onClick={handlePrev} sx={{ color: 'white', border: "1px solid #ccc", borderRadius: "25px", m: 1, width: "30px", height: "30px" }}>
                                <ChevronLeft />
                              </IconButton>
                              <IconButton onClick={handleNext} sx={{ color: 'white', border: "1px solid #ccc", borderRadius: "25px", width: "30px", height: "30px" }}>
                                <ChevronRight />
                              </IconButton>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', overflow: 'hidden', width: '100%' }}>
                            <Box sx={{ display: 'flex', transition: 'transform 0.3s ease', transform: `translateX(-${currentIndex * 340}px)` }}>
                              {posts.map((post, index) => (
                                <Post key={index} {...post} />
                              ))}
                            </Box>
                          </Box>
                        </Box>

                        <Box sx={{ p: 1, width: '100%', mb: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="h6" sx={{ color: 'white' }}>Videos</Typography>
                            <Box>
                              <IconButton onClick={handlePrev} sx={{ color: 'white', border: "1px solid #ccc", borderRadius: "25px", m: 1, width: "30px", height: "30px" }}>
                                <ChevronLeft />
                              </IconButton>
                              <IconButton onClick={handleNext} sx={{ color: 'white', border: "1px solid #ccc", borderRadius: "25px", width: "30px", height: "30px" }}>
                                <ChevronRight />
                              </IconButton>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', overflow: 'hidden', width: '100%' }}>
                            <Box sx={{ display: 'flex', transition: 'transform 0.3s ease', transform: `translateX(-${currentIndex * 340}px)` }}>
                              {[1, 2, 3].map((item) => (
                                <VideoItem key={item} />
                              ))}
                            </Box>
                          </Box>
                        </Box>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion
                      sx={{ backgroundColor: "transparent", color: "#fff" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ padding: 0 }}
                      >
                        <Typography variant="body1">
                          {" "}
                          Copyright Claims
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box sx={{ p: 1, width: '100%' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="h6" sx={{ color: 'white' }}>Posts</Typography>
                            <Box>
                              <IconButton onClick={handlePrev} sx={{ color: 'white', border: "1px solid #ccc", borderRadius: "25px", m: 1, width: "30px", height: "30px" }}>
                                <ChevronLeft />
                              </IconButton>
                              <IconButton onClick={handleNext} sx={{ color: 'white', border: "1px solid #ccc", borderRadius: "25px", width: "30px", height: "30px" }}>
                                <ChevronRight />
                              </IconButton>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', overflow: 'hidden', width: '100%' }}>
                            <Box sx={{ display: 'flex', transition: 'transform 0.3s ease', transform: `translateX(-${currentIndex * 340}px)` }}>
                              {posts.map((post, index) => (
                                <Post key={index} {...post} />
                              ))}
                            </Box>
                          </Box>
                        </Box>

                        <Box sx={{ p: 1, width: '100%' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="h6" sx={{ color: 'white' }}>Videos</Typography>
                            <Box>
                              <IconButton onClick={handlePrev} sx={{ color: 'white', border: "1px solid #ccc", borderRadius: "25px", m: 1, width: "30px", height: "30px" }}>
                                <ChevronLeft />
                              </IconButton>
                              <IconButton onClick={handleNext} sx={{ color: 'white', border: "1px solid #ccc", borderRadius: "25px", width: "30px", height: "30px" }}>
                                <ChevronRight />
                              </IconButton>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', overflow: 'hidden', width: '100%' }}>
                            <Box sx={{ display: 'flex', transition: 'transform 0.3s ease', transform: `translateX(-${currentIndex * 340}px)` }}>
                              {[1, 2, 3].map((item) => (
                                <VideoItem key={item} />
                              ))}
                            </Box>
                          </Box>
                        </Box>
                      </AccordionDetails>                    </Accordion>
                  </Paper>
                  <Typography
                    variant="h6"
                    sx={{ marginBottom: "10px", fontWeight: "bold" }}
                  >
                    Shared Content
                  </Typography>
                  <Paper
                    style={{
                      height: "100%",
                      padding: "16px",
                      backgroundColor: "rgba(27, 27, 27, 1)",
                      color: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "25px",
                    }}
                  >
                    <Accordion
                      sx={{ backgroundColor: "transparent", color: "#fff" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ padding: 0 }}
                      >
                        <Typography variant="body1">Shared With</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box sx={{ p: 1, width: '100%' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="h6" sx={{ color: 'white' }}>Posts</Typography>
                            <Box>
                              <IconButton onClick={handlePrev} sx={{ color: 'white', border: "1px solid #ccc", borderRadius: "25px", m: 1, width: "30px", height: "30px" }}>
                                <ChevronLeft />
                              </IconButton>
                              <IconButton onClick={handleNext} sx={{ color: 'white', border: "1px solid #ccc", borderRadius: "25px", width: "30px", height: "30px" }}>
                                <ChevronRight />
                              </IconButton>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', overflow: 'hidden', width: '100%' }}>
                            <Box sx={{ display: 'flex', transition: 'transform 0.3s ease', transform: `translateX(-${currentIndex * 340}px)` }}>
                              {posts.map((post, index) => (
                                <Post key={index} {...post} />
                              ))}
                            </Box>
                          </Box>
                        </Box>

                        <Box sx={{ p: 1, width: '100%' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="h6" sx={{ color: 'white' }}>Videos</Typography>
                            <Box>
                              <IconButton onClick={handlePrev} sx={{ color: 'white', border: "1px solid #ccc", borderRadius: "25px", m: 1, width: "30px", height: "30px" }}>
                                <ChevronLeft />
                              </IconButton>
                              <IconButton onClick={handleNext} sx={{ color: 'white', border: "1px solid #ccc", borderRadius: "25px", width: "30px", height: "30px" }}>
                                <ChevronRight />
                              </IconButton>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', overflow: 'hidden', width: '100%' }}>
                            <Box sx={{ display: 'flex', transition: 'transform 0.3s ease', transform: `translateX(-${currentIndex * 340}px)` }}>
                              {[1, 2, 3].map((item) => (
                                <VideoItem key={item} />
                              ))}
                            </Box>
                          </Box>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      sx={{ backgroundColor: "transparent", color: "#fff" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ padding: 0 }}
                      >
                        <Typography variant="body1">Shared From</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box sx={{ p: 1, width: '100%' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="h6" sx={{ color: 'white' }}>Posts</Typography>
                            <Box>
                              <IconButton onClick={handlePrev} sx={{ color: 'white', border: "1px solid #ccc", borderRadius: "25px", m: 1, width: "30px", height: "30px" }}>
                                <ChevronLeft />
                              </IconButton>
                              <IconButton onClick={handleNext} sx={{ color: 'white', border: "1px solid #ccc", borderRadius: "25px", width: "30px", height: "30px" }}>
                                <ChevronRight />
                              </IconButton>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', overflow: 'hidden', width: '100%' }}>
                            <Box sx={{ display: 'flex', transition: 'transform 0.3s ease', transform: `translateX(-${currentIndex * 340}px)` }}>
                              {posts.map((post, index) => (
                                <Post key={index} {...post} />
                              ))}
                            </Box>
                          </Box>
                        </Box>

                        <Box sx={{ p: 1, width: '100%' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="h6" sx={{ color: 'white' }}>Videos</Typography>
                            <Box>
                              <IconButton onClick={handlePrev} sx={{ color: 'white', border: "1px solid #ccc", borderRadius: "25px", m: 1, width: "30px", height: "30px" }}>
                                <ChevronLeft />
                              </IconButton>
                              <IconButton onClick={handleNext} sx={{ color: 'white', border: "1px solid #ccc", borderRadius: "25px", width: "30px", height: "30px" }}>
                                <ChevronRight />
                              </IconButton>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', overflow: 'hidden', width: '100%' }}>
                            <Box sx={{ display: 'flex', transition: 'transform 0.3s ease', transform: `translateX(-${currentIndex * 340}px)` }}>
                              {[1, 2, 3].map((item) => (
                                <VideoItem key={item} />
                              ))}
                            </Box>
                          </Box>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </Paper>
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <Typography
                    variant="h6"
                    sx={{ marginBottom: "10px", fontWeight: "bold" }}
                  >
                    Billing and other Details
                  </Typography>
                  <Paper
                    style={{
                      height: "100%",
                      padding: "16px",
                      backgroundColor: "rgba(27, 27, 27, 1)",
                      color: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "25px",
                    }}
                  >
                    <Accordion
                      sx={{ backgroundColor: "transparent", color: "#fff" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ padding: 0 }}
                      >
                        <Typography variant="body1">
                          Check Monetisation{" "}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>some content</AccordionDetails>
                    </Accordion>
                    <Accordion
                      sx={{ backgroundColor: "transparent", color: "#fff" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ padding: 0 }}
                      >
                        <Typography variant="body1">
                          Ask the local currency
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                          <InputLabel id="demo-select-small-label">
                            Currency
                          </InputLabel>
                          <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={currency}
                            label="currency"
                            onChange={handleChangeCurrency}
                            sx={{ color: "#fff" }}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>INR(Indial Rupiees)</MenuItem>
                            <MenuItem value={20}>$(Dollar)</MenuItem>
                          </Select>
                        </FormControl>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      sx={{ backgroundColor: "transparent", color: "#fff" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ padding: 0 }}
                      >
                        <Typography variant="body1">
                          Display the Settlement Note
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <p style={{ color: "yellow" }}>
                            For the Cycle of 1 Mar,2024 to 31st Mar, 2024 the
                            Settlement is yet to be done to your "Wallet/Bank
                            A/c". Please click settle button.
                          </p>
                          <Button variant="contained" className="update-button">
                            settle
                          </Button>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </Paper>
                  <Typography
                    variant="h6"
                    sx={{ marginBottom: "10px", fontWeight: "bold" }}
                  >
                    Add Bank Account Details for Settlement
                  </Typography>
                  <Paper
                    style={{
                      height: "100%",
                      padding: "16px",
                      backgroundColor: "rgba(27, 27, 27, 1)",
                      color: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "25px",
                    }}
                  >
                    <Accordion
                      sx={{ backgroundColor: "transparent", color: "#fff" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ padding: 0 }}
                      >
                        <Typography variant="body1">
                          Add Bank Account Details for Settlement
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>some content</AccordionDetails>
                    </Accordion>
                    <Accordion
                      sx={{ backgroundColor: "transparent", color: "#fff" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ padding: 0 }}
                      >
                        <Typography variant="body1">
                          Add Payment Wallet Details
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>some content</AccordionDetails>
                    </Accordion>
                    <Accordion
                      sx={{ backgroundColor: "transparent", color: "#fff" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ padding: 0 }}
                      >
                        <Typography variant="body1">
                          Add Payment Wallet Details
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>some content</AccordionDetails>
                    </Accordion>
                  </Paper>
                </TabPanel>
                <TabPanel value={value} index={4}>
                  <Typography
                    variant="h6"
                    sx={{ marginBottom: "10px", fontWeight: "bold" }}
                  >
                    Other Settings
                  </Typography>
                  <Paper
                    style={{
                      height: "100%",
                      padding: "16px",
                      backgroundColor: "rgba(27, 27, 27, 1)",
                      color: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "25px",
                    }}
                  >
                    <Accordion
                      sx={{ backgroundColor: "transparent", color: "#fff" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ padding: 0 }}
                      >
                        <Typography variant="body1">Language</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <ThemeProvider theme={darkTheme}>
                          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <Autocomplete
                              options={languageOptions}
                              getOptionLabel={(option) => option.label}
                              value={selectedLanguage}
                              onChange={(event, newValue) => {
                                setSelectedLanguage(newValue);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  placeholder="Hindi"
                                  variant="outlined"
                                  InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <SearchIcon style={{ color: '#fff' }} />
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              )}
                              sx={{
                                width: 300,
                                '& .MuiOutlinedInput-root': {
                                  backgroundColor: 'black',
                                  color: '#fff',
                                  borderRadius: '10px',
                                  '& fieldset': {
                                    borderColor: 'black',
                                  },
                                  '&:hover fieldset': {
                                    borderColor: 'black',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: 'black',
                                  },
                                },
                                '& .MuiAutocomplete-input': {
                                  color: '#fff',
                                },
                                '& .MuiAutocomplete-popupIndicator': {
                                  color: '#fff',
                                },
                                '& .MuiAutocomplete-clearIndicator': {
                                  color: '#fff',
                                }
                              }}
                            />
                          </div>
                        </ThemeProvider>
                      </AccordionDetails>
                    </Accordion>
                    {/* <Accordion
                      sx={{ backgroundColor: "transparent", color: "#fff" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography variant="body1">Switch Mode</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <FormControl
                          sx={{
                            width: "100%",
                            backgroundColor: "#111",
                            padding: "10px",
                          }}
                        >
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="bright"
                            name="radio-buttons-group"
                          >
                            <FormControlLabel
                              value="bright"
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                              control={<Radio sx={{ color: "#fff" }} />}
                              label="Bright Mode"
                              labelPlacement="start"
                            />
                            <FormControlLabel
                              value="dark"
                              control={<Radio sx={{ color: "#fff" }} />}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                              label="Dark Mode"
                              labelPlacement="start"
                            />
                          </RadioGroup>
                        </FormControl>
                      </AccordionDetails>
                    </Accordion> */}
                    <Accordion
                      sx={{ backgroundColor: "transparent", color: "#fff" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ padding: 0, borderTop: "1px solid #333" }}
                      >
                        <Typography variant="body1">Delete Account</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="body2">Delete Account</Typography>
                        <TextField
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirm Password"
                          size="small"
                          sx={{
                            marginTop: "10px",
                            width: "200px",
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "25px",
                              backgroundColor: "#535353",
                              "& fieldset": {
                                borderRadius: "25px",
                                border: "1px solid #ccc"
                              },
                            },
                            "& .MuiInputBase-input": {
                              borderRadius: "25px",
                              backgroundColor: "#535353",
                            },
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleTogglePasswordVisibility}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff sx={{ color: "#fff" }} />
                                  ) : (
                                    <Visibility sx={{ color: "#fff" }} />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <TextField
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter OTP"
                          size="small"
                          sx={{
                            margin: "10px",
                            width: "200px",
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "25px",
                              backgroundColor: "#535353",
                              "& fieldset": {
                                borderRadius: "25px",
                                border: "1px solid #ccc"
                              },
                            },
                            "& .MuiInputBase-input": {
                              borderRadius: "25px",
                              backgroundColor: "#535353",
                            },
                          }}
                        />
                        <Button
                          variant="outlined"
                          className="send-otp-button"
                          sx={{ margin: "8px", marginTop: "10px", color: "#fff", border: "1px solid #ccc", textTransform: "none", borderRadius: "10px" }}
                        >
                          Send OTP
                        </Button>
                        <Button variant="contained" className="delete-button">
                          Delete
                        </Button>
                      </AccordionDetails>

                    </Accordion>
                  </Paper>
                  {/* <Button variant="contained" sx={{ textTransform: "none", borderRadius: "8px", bgcolor: "#e9e9e9", color: "#2c2c2c", padding: "6px 18px", width: "150px", margin: "24px" }}>
                    Logout
                  </Button> */}
                </TabPanel>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
