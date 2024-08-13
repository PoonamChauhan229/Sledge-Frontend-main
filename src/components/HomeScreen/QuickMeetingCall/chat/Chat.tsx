import {
  TextField,
  IconButton,
  Stack,
  AppBar,
  Button,
  Tabs,
  Tab,
  Drawer,
  InputAdornment,
  styled,
  Typography,
  Avatar,
  ListItemAvatar,
  List,
  ListItem,
  ListItemText,
  Box,
  Collapse,
  Badge
} from "@mui/material";
import {
  selectPeers,
  selectHMSMessages,
  selectBroadcastMessages,
  useHMSStore,
  useHMSActions,
} from "@100mslive/react-sdk";
import { useState, useCallback, useRef, ChangeEvent, useEffect } from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ChatMessage from "./ChatMessage";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/Add";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Person as UserIcon } from '@mui/icons-material';


const ScrollbarDiv = styled("div")<{ maxHeight: string }>(({ maxHeight }) => ({
  height: "calc(100% - 70px)",
  overflowY: "auto",
  maxHeight: maxHeight,

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
}));

interface ChatMessage {
  sender: string;
  message: string;
}

interface Chat {
  id: number;
  sender: string;
  message: string;
  avatar: string;
  fullMessages: ChatMessage[];
}

interface ChatProps {
  activeTab: number;
  setActiveTab: (tab: number) => void;
  selectedPeer: { id: string, name: string } | null;
  setSelectedPeer: (peer: { id: string, name: string } | null) => void;
}

const Chat: React.FC<ChatProps> = ({ activeTab, setActiveTab, selectedPeer, setSelectedPeer }) => {
  const allMessages = useHMSStore(selectBroadcastMessages);
  const hmsActions = useHMSActions();
  const [message, setMessage] = useState("");
  const peers = useHMSStore(selectPeers);
  const [file, setFile] = useState<File | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const sendButtonRef = useRef<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [chatMessages, setChatMessages] = useState<Chat[]>([]);
  // const [lobbyMessages, setLobbyMessages] = useState<ChatMessage[]>([]);

  const hosts = peers.filter((peer) => peer.roleName === "host");
  const joinees = peers.filter((peer) => peer.roleName !== "host");

  const sendDirectMessage = async (recipientId: string, recipientName: string, message: string) => {
    try {
      const recipientPeer = peers.find(peer => peer.id === recipientId);
      if (!recipientPeer) {
        console.error("Recipient not found in the room");
        return;
      }
      console.log("recipientPeer....", recipientPeer);
      await hmsActions.sendDirectMessage(message, recipientId);

      setChatMessages(prevChats =>
        prevChats.map(chat =>
          chat.sender === recipientName
            ? {
              ...chat,
              message: message,
              fullMessages: [...chat.fullMessages, { sender: "You", message: message }]
            }
            : chat
        )
      );

      setSelectedChat(prevChat => {
        if (prevChat && prevChat.sender === recipientName) {
          return {
            ...prevChat,
            message: message,
            fullMessages: [...prevChat.fullMessages, { sender: "You", message: message }]
          };
        }
        return prevChat;
      });

    } catch (error) {
      console.error("Failed to send direct message:", error);
    }
  };
  const sendBroadcastMessage = async (message: string) => {
    try {
      await hmsActions.sendBroadcastMessage(message);
    } catch (error) {
      console.error("Failed to send broadcast message:", error);
    }
  };


  const sendMessage = async () => {
    if (message.trim().length === 0 && !file) return;

    try {
      if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const fileContent = e.target?.result;
          if (fileContent) {
            const fileMessage = JSON.stringify({
              type: "file",
              fileName: file.name,
              fileSize: file.size,
              fileContent: fileContent,
            });

            if (activeTab === 0 && selectedChat) {
              console.log("selected personal message....", selectedChat);
              await sendDirectMessage(selectedPeer!.id, selectedChat.sender, message);
            } else {
              await sendBroadcastMessage(message);
              // console.log("lobby tab message....", message);
            }
          }
        };
        reader.readAsDataURL(file);
        setFile(null);
      }

      if (message.trim().length) {
        if (activeTab === 0 && selectedChat) {
          // console.log("selected personal message....", selectedChat);
          await sendDirectMessage(selectedPeer!.id, selectedChat.sender, message);
        } else {
          await sendBroadcastMessage(message);
          // console.log("lobby tab message....", message);
        }
      }

      setMessage("");
    } catch (error: any) {
      console.error("Error sending message:", error.message);
    }
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    if (selectedPeer) {
      const existingChat = chatMessages.find(chat => chat.sender === selectedPeer.name);
      // console.log("existingChat....", existingChat)
      if (existingChat) {
        setSelectedChat(existingChat);
      } else {
        const newChat: Chat = {
          id: Date.now(),
          sender: selectedPeer.name,
          message: "",
          avatar: "/path/to/default-avatar.jpg",
          fullMessages: []
        };
        setSelectedChat(newChat);
        setChatMessages(prevChats => [...prevChats, newChat]);
      }
      setActiveTab(0);
    }
  }, [selectedPeer, chatMessages]);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      // setMessage(`File: ${uploadedFile.name}`);
      console.log("File uploaded:", uploadedFile);
    }
  };

  const handleChatSelect = (chat: Chat) => {
    const updatedChat = chatMessages.find(c => c.id === chat.id) || chat;
    setSelectedChat(updatedChat);
  };

  const handleBackToChats = () => {
    setSelectedChat(null);
  };

  const [options, setOptions] = useState<string[]>(["Yes", "No"]);
  const [newOption, setNewOption] = useState<string>("");

  const handleAddOption = () => {
    if (newOption.trim() !== "") {
      setOptions([...options, newOption]);
      setNewOption("");
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      if (!sendButtonRef.current) {
        setIsInputFocused(false);
      }
      sendButtonRef.current = false;
    }, 0);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {isDrawerOpen && (
        <Drawer
          variant="persistent"
          anchor="right"
          open={isDrawerOpen}
          sx={{
            width: 326,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 326,
              boxSizing: "border-box",
              backgroundColor: "#1a1a1a",
              color: "white",
            },
          }}
        >
          <div className="chat-section">
            <div
              className="chat-header"
              style={{ padding: "10px", borderRadius: "8px" }}
            >
              <AppBar
                position="static"
                style={{ backgroundColor: "#1f1f1f", borderRadius: "8px" }}
              >
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  aria-label="chat lobby tabs"
                  textColor="inherit"
                  sx={{
                    "& .MuiTabs-indicator": { display: "none", height: "40px" },
                  }}
                >
                  <Tab
                    icon={<PersonOutlineRoundedIcon />}
                    iconPosition="start"
                    label="Chats"
                    sx={{
                      minHeight: "40px",
                      width: "150px",
                      color: activeTab === 0 ? "white" : "#888",
                      backgroundColor: activeTab === 0 ? "#1b1b1b" : "#111111",
                      textTransform: "none",
                    }}
                  />
                  <Tab
                    icon={<GridViewRoundedIcon />}
                    iconPosition="start"
                    label="Lobby"
                    sx={{
                      minHeight: "40px",
                      width: "150px",
                      color: activeTab === 1 ? "white" : "#888",
                      backgroundColor: activeTab === 1 ? "#1b1b1b" : "#111111",
                      textTransform: "none",
                    }}
                  />
                </Tabs>
              </AppBar>
              {activeTab == 1 && (
                <Box
                  sx={{
                    marginBottom: "3%",
                    marginTop: "1%",
                    borderTop: "1px solid #9CA3AF",
                  }}
                >
                  <div
                    style={{
                      marginTop: "5%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "15px", color: "#888888" }}>
                      Disallow Audience From Lobby
                    </span>
                    <label className="switch">
                      <input defaultChecked type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </Box>
              )}
            </div>
            {/* Chats tab content */}
            {activeTab === 0 && !selectedChat ? (
              <Box sx={{ bgcolor: "#1a1a1a", color: "white", height: "100vh" }}>
                <ScrollbarDiv maxHeight={isInputFocused ? "32vh" : "62vh"}>
                  <List sx={{ py: 0 }}>
                    {chatMessages.map((chat) => (
                      <div onClick={() => handleChatSelect(chat)} style={{ cursor: "pointer" }}>
                        <ListItem
                          key={chat.id}
                          secondaryAction={
                            <IconButton
                              edge="end"
                              sx={{ color: "grey.500" }}
                              onClick={() => handleChatSelect(chat)}
                            >
                              <ChevronRightIcon />
                            </IconButton>
                          }
                          sx={{
                            py: 1,
                            borderBottom: "1px solid #2a2a2a",
                            "&:last-child": {
                              borderBottom: "none",
                            },
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar
                              src={chat.avatar}
                              sx={{ width: 40, height: 40 }}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: "bold", color: "white" }}
                              >
                                {chat.sender}
                              </Typography>
                            }
                            secondary={
                              <Typography
                                variant="body2"
                                sx={{ color: "grey.400" }}
                              >
                                {chat.message}
                              </Typography>
                            }
                          />
                        </ListItem>
                      </div>
                    ))}
                  </List>
                </ScrollbarDiv>
              </Box>
            ) : (activeTab === 0 && selectedChat) ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  padding: "1rem",
                  backgroundColor: "#1a1a1a",
                  color: "white",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "right",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "grey.400", cursor: "pointer" }}
                    onClick={handleBackToChats}
                  >
                    Back {" "}
                    <ArrowForwardIosIcon sx={{ fontSize: 12, ml: 0.5 }} />
                  </Typography>
                </Box>
                <ScrollbarDiv
                  maxHeight={isInputFocused ? "32vh" : "62vh"}
                  sx={{
                    flexGrow: 1,
                    paddingRight: "1rem",
                  }}
                >
                  <Stack spacing={2}>
                    {selectedChat?.fullMessages.map((msg, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: msg.sender === "You" ? "flex-end" : "flex-start",
                        }}
                      >
                        {msg.sender !== "You" && (
                          <Avatar
                            src="image.jpg"
                            alt={msg.sender}
                            sx={{ width: 40, height: 40, borderRadius: "8px 8px 8px 0px" }}
                          />
                        )}
                        <Box
                          sx={{
                            maxWidth: "75%",
                            background: msg.sender === "You" ? "black" : "black",
                            borderRadius: "8px 8px 8px 0px",
                            p: 1,
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          {/* {msg.sender !== "You" && ( */}
                          <Typography variant="caption" sx={{ color: "#ccc", py: 0.75 }}>
                            {msg.sender}
                          </Typography>
                          {/* // )} */}
                          <Typography variant="body1">{msg.message}</Typography>
                        </Box>
                        {msg.sender === "You" && (
                          <Badge color="error" variant="dot" sx={{ ml: 1, mt: 4 }} >
                            {/* <Avatar
                              src="image.jpg"
                              alt="You"
                              sx={{ width: 35, height: 35, borderRadius: "6px", backgroundColor: "black" }}
                            /> */}
                            <UserIcon sx={{ color: "white", fontSize: 34, borderRadius: "7px", backgroundColor: "black" }} />
                          </Badge>
                        )}
                      </Box>
                    ))}
                  </Stack>
                  {/* <Stack spacing={2}>
                    {selectedChat.fullMessages.map((message, index) => (
                      <ChatMessage message={message} key={index} />
                    ))}
                  </Stack> */}
                </ScrollbarDiv>
              </Box>
            ) : (
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    padding: "1rem",
                    // backgroundColor: '#f5f5f5',
                    // borderRadius: '8px',
                    // boxShadow: 3,
                  }}
                >
                  <ScrollbarDiv
                    maxHeight={isInputFocused ? "32vh" : "62vh"}
                    className="chat-group"
                    sx={{
                      flexGrow: 1,
                      paddingRight: "1rem",
                      // maxHeight: '62vh'
                    }}
                  >
                    <Stack spacing={2}>
                      {allMessages.length > 0 &&
                        allMessages.map((message, index) => (
                          <ChatMessage message={message} key={index} />
                        ))}
                    </Stack>
                  </ScrollbarDiv>
                </Box>
              </>
            )}

            {(activeTab === 1 || selectedChat) && (
              <div className="message-input">
                <div>
                  {file && (
                    <Box
                      sx={{ display: "flex", backgroundColor: "#3D3D3D", p: 1 }}
                    >
                      <IconButton size="small" sx={{ color: "#FFA500", p: 0 }}>
                        <InsertDriveFileIcon fontSize="small" />
                      </IconButton>
                      <Typography
                        variant="body2"
                        sx={{
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          color: "#fff",
                          p: "5px",
                          mb: 0,
                        }}
                      >
                        {file.name}
                      </Typography>
                    </Box>
                  )}

                  <TextField
                    placeholder="Type a Message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    sx={{
                      // backgroundColor: "#FFFFFF33",
                      borderRadius: "25px",
                      marginTop: "1%",
                      // marginBottom: "2%",
                      padding: "10px",
                      "& .MuiInputBase-root": {
                        color: "#fff",
                        borderRadius: "25px",
                        border: "1px solid #ccc",
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton component="label">
                            <AttachFileIcon sx={{ color: "#fff" }} />
                            <input
                              type="file"
                              hidden
                              onChange={handleFileUpload}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onMouseDown={() => {
                              sendButtonRef.current = true;
                            }}
                            onClick={sendMessage}
                            component="label"
                          >
                            <SendIcon sx={{ color: "#fff" }} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                {isInputFocused && (activeTab === 1 || selectedChat) && (
                  <Box
                    sx={{
                      bgcolor: "#1b1b1b",
                      color: "white",
                      p: 2,
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 0, fontSize: "16px" }}>
                      Options
                    </Typography>
                    {options.map((option, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          bgcolor: "#2a2a2a",
                          color: "white",
                          border: "1px solid grey",
                          borderRadius: "20px",
                          p: 1,
                          mb: 1,
                          cursor: "pointer",
                        }}
                      >
                        <Typography sx={{ ml: 2 }}>{option}</Typography>
                      </Box>
                    ))}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        bgcolor: "#2a2a2a",
                        color: "white",
                        border: "1px solid grey",
                        borderRadius: "20px",
                        p: 1,
                        mt: 1,
                      }}
                    >
                      <TextField
                        value={newOption}
                        onChange={(e) => setNewOption(e.target.value)}
                        placeholder="+ Add Option"
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                          style: { color: "white", paddingLeft: "10px" },
                        }}
                        sx={{ flexGrow: 1, ml: 2 }}
                      />
                      <Button
                        onClick={handleAddOption}
                        sx={{ ml: 2, color: "grey.400" }}
                      >
                        Add
                      </Button>
                    </Box>
                  </Box>
                )}
              </div>
            )}
          </div>
        </Drawer>
      )}
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: "fixed",
          right: isDrawerOpen ? 312 : 0,
          top: "10%",
          transform: "translateY(-51%)",
          backgroundColor: "#1a1a1a",
          color: "white",
          border: "1px solid #ccc",
          "&:hover": {
            backgroundColor: "#2a2a2a",
            border: "1px solid #ccc",
          },
          zIndex: 1200,
        }}
      >
        {isDrawerOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>
    </Box>
  );
};

export default Chat;
