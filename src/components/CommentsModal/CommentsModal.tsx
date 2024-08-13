import React from "react";
import {
  Avatar,
  Divider,
  TextField,
  Button,
  Box,
  InputBase,
} from "@mui/material";
import "./CommentsModal.css";
import userImage from "../../assets/user-1.png";
import { ReactComponent as Close } from "../../assets/Group 33569.svg";
import { CloseIcon } from "stream-chat-react";

interface Comment {
  id: string;
  user: string;
  avatar: string;
  content: string;
  likes: number;
  postedAt: string;
}

interface CommentsModalProps {
  onClose: () => void;
}

const CommentsModal: React.FC<CommentsModalProps> = ({ onClose }) => {
  const [comments, setComments] = React.useState<Comment[]>([]); // State to store comments

  const handlePostComment = (event: React.MouseEvent<HTMLButtonElement>) => {
    const inputElement =
      event.currentTarget.previousElementSibling?.querySelector(
        'input[name="commentInput"]'
      );

    if (!inputElement || !("value" in inputElement)) {
      console.error("Comment input element not found or has no value property");
      return;
    }

    const commentText = (inputElement as HTMLInputElement).value;

    if (commentText.trim() === "") {
      return;
    }

    const newComment: Comment = {
      id: Math.random().toString(36).substring(2, 15), // Generate unique ID
      user: "You", // Replace with actual username if available
      avatar: userImage,
      content: commentText,
      likes: 0, // Add initial likes count
      postedAt: new Date().getHours().toString() + "h", // Set posted date and time
    };

    setComments([...comments, newComment]);
    inputElement.value = "";
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 700,
        border: "none",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        background: "#111111",
        color: "#fff",
      }}
    >
      <div className="comments-modal-title">{comments.length} Comments</div>
      <Close aria-label="close" onClick={onClose} className="close-button">
        <CloseIcon />
      </Close>
      <Divider sx={{ backgroundColor: "#C6CBD21A" }} />
      <div className="input-container">
        <img src={userImage} />

        <Box className="comment-box">
          <TextField
            placeholder="Add a comment..."
            className="comment-input"
            InputProps={{ disableUnderline: true }}
            name="commentInput"
          />
          <div className="btn-container">
            <Button
              onClick={handlePostComment}
              className="action-button-post"
              type="submit"
            >
              Post
            </Button>
          </div>
        </Box>
      </div>
      <Divider sx={{ backgroundColor: "#C6CBD21A" }} />
      <Box sx={{ mt: 2 }}>
        {comments.map((comment: Comment) => (
          <Box key={comment.id} sx={{ display: "flex", mb: 2 }}>
            <Avatar alt={comment.user} src={comment.avatar} />
            <Box sx={{ ml: 2 }}>
              <span className="user-heading">{comment.user}</span>
              <p className="comment-description">{comment.content}</p>
              <span className="impression-button">Like · Reply</span>
              <span className="hour">· {comment.postedAt}</span>
            </Box>
          </Box>
        ))}
        <Button fullWidth className="action-button-more-comments">
          Load 13 more comments
        </Button>
      </Box>
    </Box>
  );
};

export default CommentsModal;
