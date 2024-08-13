import {
  Box,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import { Button, InputAdornment, Popover, TextField } from "@mui/material";
import Picker, { EmojiClickData } from "emoji-picker-react";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DoneIcon from "@mui/icons-material/Done";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import React from "react";
import { Chat, Message, ProfileData } from "./ChatStream";
import { Socket } from "socket.io-client";
import ProfilePic from "../../../assets/Profile.png";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

const ScrollbarDiv = styled("div")({
  height: "calc(100% - 64px)",
  overflowY: "auto",
  // scrollbarWidth: 'thin',
  // scrollbarColor: '#0070F3 #1a1a1a',

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

const StyledExpandMoreOutlinedIcon = styled(ExpandMoreOutlinedIcon)`
  visibility: hidden;
`;

const StyledIconButton = styled(IconButton)`
  &:hover .expandMoreIcon {
    visibility: visible;
  }
`;

interface ChatDetailsProps {
  chat: Chat;
  socket: Socket;
  messages: Message[] | null;
  profileData: ProfileData | null;
  setMessages: (prev: any) => void;
}

function ChatDetails({
  chat,
  socket,
  messages,
  setMessages,
  profileData,
}: ChatDetailsProps) {
  const lastMessageRef = React.useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = React.useState("");
  const [isTyping, setIsTyping] = React.useState<boolean>(false);
  const typingTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElMenu, setAnchorElMenu] = React.useState<null | HTMLElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileInputClick = () => {
    if (fileInputRef.current !== null) {
      fileInputRef.current.click();
    }
  };

  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    setAnchorElMenu(event.currentTarget as unknown as HTMLElement);
  };

  const handleClose = () => {
    setAnchorElMenu(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = reader.result;
        console.log("fileData", fileData);
        // Emit the file data to the server
        // socket.emit('file-upload', { fileName: file.name, fileData });
      };
      reader.readAsArrayBuffer(file); // Read the file as ArrayBuffer
    }
  };

  React.useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  React.useEffect(() => {
    socket.on(
      `receiveChatMessage_${chat.chat_id}_${profileData?.id}`,
      function (data) {
        console.log("Chat Data Received ", data);

        const messageData: Message = {
          senderId: chat.user_id,
          messageId: data.message_id,
          message: data.message,
          chat_id: chat.chat_id,
          message_type: "Text",
          file_size: "",
          file_name: "",
          status: "Received",
        };
        setMessages((prev: any[]) => {
          const messageExists = prev.some(
            (msg) => msg.messageId === messageData.messageId
          );

          // If the message ID is not found, add the new message
          if (!messageExists) {
            return [...prev, messageData];
          }

          // If the message ID is found, return the previous state without changes
          return prev;
        });

        socket.emit("isReceived", {
          message_id: data.message_id,
          user_id: chat.user_id,
          chat_id: chat.chat_id,
        });
      }
    );

    socket.on(`isReceived_${chat.chat_id}_${profileData?.id}`, (data) => {
      const { message_id, status, chat_id } = data;
      if (messages && status === "Received") {
        setMessages((prev: any) => {
          let message = prev.find(
            (message: Message) => message.messageId == message_id
          );
          if (message) {
            const index = prev.indexOf(message);
            message.status = "Received";
            console.log("Message changed ", message);
            prev.splice(index, 1, message);
            console.log("All messages", prev);
            return prev;
          }
        });
      }
      console.log("Is Received", data);
    });

    socket.on(`isTyping_${chat.chat_id}`, (data) => {
      if (data.sender !== profileData?.id) {
        console.log("is typing");
        setIsTyping(true);
      }
    });

    socket.on(`stopTyping_${chat.chat_id}`, (data) => {
      if (data.sender !== profileData?.id) {
        console.log("stop typing");
        setIsTyping(false);
      }
    });
  }, [socket, messages]);

  const handleEmojiPickerOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEmojiPickerClose = () => {
    setAnchorEl(null);
  };

  const openEmoj = Boolean(anchorEl);
  const id = openEmoj ? "emoji-popover" : undefined;

  const handleTyping = () => {
    socket.emit("isTyping", {
      chat_id: chat.chat_id,
      sender: profileData?.id,
      name: profileData?.name,
    });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stopTyping", {
        chat_id: chat.chat_id,
        sender: profileData?.id,
        name: profileData?.name,
      });
    }, 10000); // Adjust the delay as needed
  };

  const sendChat = (id: string) => {
    const messageData = {
      sender: profileData?.id,
      message: inputValue,
      chat_id: id,
      message_type: "Text",
      file_size: "",
      file_name: "",
    };
    console.log("Chat Message", messageData);
    socket.emit("sendChatMessage", messageData);
    socket.on(
      `receiveOwnChatMessage_${id}_${profileData?.id}`,
      function (data) {
        console.log("Own Chat Data Received ", data);

        const messageData: Message = {
          senderId: profileData?.id,
          messageId: data.message_id,
          message: data.message,
          chat_id: id,
          message_type: "Text",
          file_size: "",
          file_name: "",
          status: "Received",
        };
        setMessages((prev: any[]) => {
          const messageExists = prev.some(
            (msg: { messageId: string }) =>
              msg.messageId === messageData.messageId
          );

          // If the message ID is not found, add the new message
          if (!messageExists) {
            return [...prev, messageData];
          }

          // If the message ID is found, return the previous state without changes
          return prev;
        });
      }
    );

    setInputValue("");
  };

  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    console.log(emojiData);
    const textFieldElement = document.getElementById(
      "input"
    ) as HTMLInputElement;
    if (textFieldElement) {
      const start = textFieldElement.selectionStart;
      const end = textFieldElement.selectionEnd;
      if (start !== null && end !== null) {
        setInputValue(
          inputValue.substring(0, start) +
            emojiData.emoji +
            inputValue.substring(end)
        );
        setAnchorEl(null);
      }
    }
  };

  return (
    <Grid item xs={8}>
      <Paper
        style={{
          height: "85vh",
          padding: "16px",
          backgroundColor: "rgba(27, 27, 27, 1)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Display selected chat messages */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          {chat ? (
            <img
              src={ProfilePic}
              height={32}
              width={32}
              style={{ marginRight: "10px" }}
            />
          ) : (
            ""
          )}
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              display: "flex",
              flexDirection: "column",
              margin: 0,
              color: "#fff",
            }}
          >
            {chat ? chat.name : "Sledge Chats"}
            {chat ? (
              <span style={{ color: "gray", fontSize: "11px" }}>
                Active 22m ago
              </span>
            ) : (
              ""
            )}
          </Typography>
        </div>
        <Divider sx={{ backgroundColor: "#fff" }} />
        <ScrollbarDiv>
          {/* Display messages for selected chat */}

          {chat &&
            messages &&
            messages.length > 0 &&
            messages.map((message: Message) => (
              <Typography
                key={message.messageId}
                align={message.senderId === profileData?.id ? "right" : "left"}
                sx={{ margin: "1rem" }}
              >
                {message.senderId === profileData?.id && (
                  <img
                    src={ProfilePic}
                    height={25}
                    width={25}
                    style={{ marginRight: "8px" }}
                  />
                )}

                <span
                  style={{
                    color:
                      message.senderId === profileData?.id ? "#fff" : "#000",
                    background:
                      message.senderId === profileData?.id
                        ? "linear-gradient(to bottom, #01E5D4, #137AEA)"
                        : "#fff",
                    padding: "5px",
                    borderRadius: "20px",
                    margin: "20px",
                    font: "15px",
                  }}
                >
                  {message.message}

                  <StyledIconButton >
                    <StyledExpandMoreOutlinedIcon onClick={handleClick} className="expandMoreIcon"/>
                  </StyledIconButton>

                  <Menu
                    anchorEl={anchorElMenu}
                    open={Boolean(anchorElMenu)}
                    onClose={handleClose}
                  >
                    <MenuItem>Forward</MenuItem>
                  </Menu>
                </span>

                <br />
                {message.senderId === profileData?.id &&
                  message.status !== "Received" && (
                    <DoneIcon
                      sx={{
                        color: "white",
                        fontSize: "15px",
                        marginLeft: "55px",
                        marginTop: "3px",
                        marginRight: "23px",
                      }}
                    />
                  )}
                {message.senderId === profileData?.id &&
                  message.status === "Received" && (
                    <DoneAllIcon
                      sx={{
                        color: "white",
                        fontSize: "15px",
                        marginLeft: "55px",
                        marginTop: "3px",
                        marginRight: "23px",
                      }}
                    />
                  )}
              </Typography>
            ))}

          <div ref={lastMessageRef}></div>
        </ScrollbarDiv>

        {chat ? (
          <>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <TextField
                placeholder="Start Typing..."
                variant="outlined"
                fullWidth
                size="small"
                value={inputValue}
                sx={{
                  backgroundColor: "#111",
                  input: { color: "#fff" },
                }}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  handleTyping();
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleEmojiPickerOpen}
                        aria-describedby={id}
                      >
                        <EmojiEmotionsOutlinedIcon sx={{ color: "white" }} />
                      </IconButton>
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                      <IconButton onClick={handleFileInputClick}>
                        <AttachFileOutlinedIcon sx={{ color: "white" }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                id="input"
              />

              <Popover
                id={id}
                open={openEmoj}
                anchorEl={anchorEl}
                onClose={handleEmojiPickerClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                <Picker onEmojiClick={handleEmojiClick} />
              </Popover>

              <Button
                className="send-button"
                variant="contained"
                endIcon={<ArrowCircleRightRoundedIcon />}
                onClick={() => sendChat(chat.chat_id)}
              >
                Send
              </Button>
            </div>
            <div>{isTyping && <p>{chat.name} is typing...</p>}</div>
          </>
        ) : (
          ""
        )}
      </Paper>
    </Grid>
  );
}

export default ChatDetails;
