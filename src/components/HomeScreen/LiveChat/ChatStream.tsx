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
  InputAdornment,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { ReactComponent as BrandLogo } from "../../../assets/Sledge-s.svg";
import { ReactComponent as SearchIcon } from "../../../assets/SearchIcon.svg";
import brandLogo from "../../../assets/BrandLogo.png";
import { useNavigate } from "react-router-dom";
import { Paper, ListItem } from "@mui/material";
import axios, { AxiosRequestConfig } from "axios";
import { io } from "socket.io-client";
import ChatDetails from "./ChatDetails";

export interface Message {
  senderId: number | undefined;
  messageId: string;
  message: string;
  chat_id: string;
  message_type: string;
  file_size: string;
  file_name: string;
  status: string;
}

export interface Chat {
  user_id: any;
  chat_id: string;
  profile_pic: string | undefined;
  last_message_body: string;
  name: string;
  messages: Message[];
}

export interface ProfileData {
  id: number;
  name: string;
  designation: string;
  profile_pic: string;
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

const ScrollbarDiv = styled("div")({
  height: "calc(100% - 64px)",
  overflowY: "auto",

  "&::-webkit-scrollbar": {
    width: "3px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "linear-gradient(to bottom, #01E5D4 , #137AEA );",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 5px #1a1a1a",
    borderRadius: "10px",
  },
});

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ChatStream() {
  const [selectedChat, setSelectedChat] = React.useState<Chat>({
    user_id: "",
    chat_id: "",
    profile_pic: "",
    last_message_body: "",
    name: "",
    messages: [],
  });
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const [profileData, setProfileData] = React.useState<ProfileData | null>(
    null
  );
  const [filteredChats, setFilteredChats] = React.useState<Chat[]>([]);
  const [searchedUsers, setSearchedUsers] = React.useState([]);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const lastMessageRef = React.useRef<HTMLDivElement>(null);
  const socket = io("http://65.0.19.86:8000", {
    transports: ["websocket"],
  });

  const CustomPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: "#333333",
    border: "1px solid #ccc",
    borderRadius: "15px",
    color: "lightgrey",
    marginTop: "0.5%",
  }));

  React.useEffect(() => {
    var loggedInUserId: any;
    const storedUserDetails = localStorage.getItem("user_details");
    if (storedUserDetails) {
      try {
        const userData = JSON.parse(storedUserDetails);
        loggedInUserId = userData._id;
        const relevantUserData = {
          id: userData._id,
          name: userData.name,
          designation: userData.designation,
          profile_pic: userData.profile_pic,
        };
        setProfileData(relevantUserData);
      } catch (error) {
        console.error("Error parsing user details from localStorage", error);
      }
    } else {
      console.warn("No user details found in localStorage");
    }

    const config: AxiosRequestConfig<any> = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    try {
      axios
        .get(
          "http://65.0.19.86:8000/Chat/list_chats?page_no=1&page_size=20",
          config
        )
        .then((res) => {
          console.log(res.data.data);
          const chats: any[] | ((prevState: Chat[]) => Chat[]) = [];
          res.data.data.chats.forEach((chat: any) => {
            const chatData: Chat = {
              chat_id: chat.chat_id,
              profile_pic: chat.profile_pic,
              last_message_body: chat.last_message_body,
              name: chat.name,
              user_id: chat.user_id,
              messages: [],
            };

            chats.push(chat);
          });

          setFilteredChats(chats);
        })
        .catch((err) => console.log({ Error: err.message }));
    } catch (err: any) {
      console.log({ Error: err.message });
    }

    // Listen for connection events
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    // Listen for disconnection events
    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    // Listen for error events
    socket.on("error", (error) => {
      console.error("WebSocket error:", error);
    });

    socket.on("messageFromServer", (data: any) => {
      console.log("Data", data);
    });
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  React.useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const searchUser = async (value: string) => {
    const config: AxiosRequestConfig<any> = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    console.log("Search Query", value);
    const payload = {
      email: value,
    };

    try {
      // First request to search users
      const userResponse = await axios.post(
        "http://65.0.19.86:8000/User/search_users",
        payload,
        config
      );
      const localUsers = userResponse.data.data;
      setSearchedUsers(userResponse.data.data);
      console.log(searchedUsers);

      if (searchedUsers.length > 0) {
        const filteredUserIds = localUsers.map(
          (user: { _id: any }) => user._id
        );
        console.log("1");

        // Use Promise.all to make multiple GET requests in parallel
        const chatRequests = filteredUserIds.map((userId: any) =>
          axios.get(
            `http://65.0.19.86:8000/Chat/get_chat_history?user_id=${userId}&page_size=20`,
            config
          )
        );

        const chatResponses = await Promise.all(chatRequests);
        // console.log("chatResponses", chatResponses)

        let filteredChatData: Chat[] = [];

        chatResponses.forEach((chatResponse) => {
          console.log(
            "Chat Response Data after search",
            chatResponse.data.data
          );
          const chat = chatResponse.data.data;

          const messages =
            chat.chats.length > 0 &&
            chat.chats[0].games.map(
              (game: {
                message: any;
                sender: { name: any };
                message_id: any;
              }) => {
                return {
                  message: game.message,
                  sender: game.sender.name,
                  id: game.message_id,
                };
              }
            );
          console.log("Messages", messages);
          const chatData: Chat = {
            chat_id: chat.chat_id,
            user_id: chat.user_id,
            name: chat.chat_name,
            messages: [],
            profile_pic: chat.created_by.profile_pic,
            last_message_body: messages
              ? messages[messages.length - 1].message
              : "",
          };

          const chatDataIds = new Set<string>();
          if (!chatDataIds.has(chatData.chat_id)) {
            chatDataIds.add(chatData.chat_id);
            filteredChatData.push(chatData);
          }

          console.log("Chat Data", chatData);
          setFilteredChats(filteredChatData);
          // console.log(filteredChats)
        });
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleChatSelect = (chat: Chat) => {
    console.log("selected chat id", chat.chat_id);
    setSelectedChat(chat);
    const config: AxiosRequestConfig<any> = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      axios
        .get(
          `http://65.0.19.86:8000/Chat/get_chat_history?chat_id=${chat.chat_id}&page_size=20`,
          config
        )
        .then((res) => {
          console.log(res.data.data);
          const chat = res.data.data;

          if (chat.chats.length > 0) {
            const flattenedMessages = chat.chats.flatMap(
              (chat: { chatData: any[] }) =>
                chat.chatData.map((chat) => ({
                  message: chat.message,
                  sender: chat.sender.name,
                  senderId: chat.sender._id,
                  messageId: chat.message_id,
                  status: chat.status,
                }))
            );

            setMessages(flattenedMessages);
          } else {
            setMessages([]);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle search query change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    searchUser(event.target.value);
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
            // overflow: 'hidden',
          }}
        >
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light" ? "#111" : "#111",
              flexGrow: 1,
              height: "90vh",
              overflow: "auto",
              margin: 5,
              borderRadius: "25px",
              color: "#fff",
              padding: 1,
            }}
          >
            <Grid container spacing={2} className="chats" height="100%">
              {/* Left Side - Chat List */}
              <Grid item xs={4}>
                <Paper
                  style={{
                    height: "85vh",
                    padding: "16px",
                    backgroundColor: "rgba(27, 27, 27, 1)",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ margin: "10px", color: "#fff" }}
                  >
                    Chats
                  </Typography>
                  <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={searchQuery}
                    onChange={handleSearchChange}
                    sx={{
                      marginBottom: "16px",
                      backgroundColor: "#111",
                      borderRadius: "10px",
                      input: { color: "#fff" },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <ScrollbarDiv>
                    <List sx={{ margin: "1rem" }}>
                      {filteredChats &&
                        filteredChats.map((chat) => (
                          <ListItem
                            key={chat.chat_id}
                            onClick={() => handleChatSelect(chat)}
                            sx={{
                              backgroundColor: "#111",
                              marginTop: "10px",
                              marginBottom: "10px",
                              borderRadius: "10px",
                              color: "#fff",
                              cursor: "pointer",
                            }}
                          >
                            <img
                              src={chat.profile_pic}
                              height={32}
                              width={32}
                              style={{ margin: "2px" }}
                            />
                            <ListItemText
                              primary={chat.name}
                              secondary={
                                chat.last_message_body !== ""
                                  ? chat.last_message_body
                                  : "No messages"
                              }
                              secondaryTypographyProps={{ noWrap: true }} // Ensure last message is not wrapped
                            />
                          </ListItem>
                        ))}
                    </List>
                  </ScrollbarDiv>
                </Paper>
              </Grid>
              <ChatDetails
                chat={selectedChat}
                socket={socket}
                messages={messages}
                setMessages={setMessages}
                profileData={profileData}
              />
            </Grid>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
