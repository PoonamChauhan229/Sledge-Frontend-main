import React from "react";
import { Box, Typography, Paper, Avatar, IconButton } from "@mui/material";
import { HMSMessage } from "@100mslive/react-sdk";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

interface ChatMessageProps {
  message: HMSMessage;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isFileMessage =
    typeof message.message === "string" && message.message.startsWith("{");
  let fileData;
  if (isFileMessage) {
    try {
      fileData = JSON.parse(message.message);
    } catch (e) {
      console.error("Failed to parse file message", e);
    }
  }

  const commonStyles = {
    display: "flex",
    alignItems: "flex-start",
    mb: 2,
  };

  const paperStyles = {
    backgroundColor: "#111111",
    borderRadius: "12px 12px 12px 0px",
    color: "white",
    overflow: "hidden",
    maxWidth: "80%",
  };

  return (
    <Box sx={commonStyles}>
      <Avatar
        src="image.jpg"
        alt={message.senderName}
        sx={{ width: 40, height: 40, mr: 1, borderRadius: "8px" }}
      />
      <Paper elevation={2} sx={paperStyles}>
        <Box sx={{ p: 1.5, pb: isFileMessage ? 0.5 : 1.5 }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: "bold", fontSize: "0.875rem", mb: 0.5 }}
          >
            {message.senderName || "Unknown"}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
            {isFileMessage
              ? "Find your Schedule from the attached file."
              : message.message}
          </Typography>
        </Box>
        {isFileMessage && fileData && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#3D3D3D",
              p: 1,
              mt: 0.5,
            }}
          >
            <IconButton size="small" sx={{ color: "#FFA500", mr: 1, p: 0.5 }}>
              <InsertDriveFileIcon fontSize="small" />
            </IconButton>
            <Typography
              variant="body2"
              sx={{
                flexGrow: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontSize: "0.75rem",
              }}
            >
              {fileData.fileName}
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ChatMessage;
