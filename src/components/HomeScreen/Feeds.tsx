import React, { useState } from "react";
import {
  Paper,
  Typography,
  Avatar,
  IconButton,
  Divider,
  Grid,
  TextField,
  Menu,
  MenuItem,
  Button,
  Modal,
  Box,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { ReactComponent as ShareIcon } from "../../assets/Share-icon.svg";
import OutlinedFlagTwoToneIcon from "@mui/icons-material/OutlinedFlagTwoTone";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import NotInterestedOutlinedIcon from "@mui/icons-material/NotInterestedOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { ReactComponent as Comment } from "../../assets/commentBox.svg";
import { ReactComponent as Heart } from "../../assets/heart.svg";
import { ReactComponent as BlueHeart } from "../../assets/blue-heart.svg";
import CommentsModal from "../CommentsModal/CommentsModal";
import ShareModal from "../ShareModel/SharModal";

interface FeedPostProps {
  profilePic: string;
  name: string;
  lastSeen: string;
  content: string;
  comment: Boolean;
}

const FeedPost: React.FC<FeedPostProps> = ({
  profilePic,
  name,
  lastSeen,
  content,
  comment,
}) => {
  const [toggled, setToggled] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [isShare, setIsShare] = useState(false);

  const handleToggle = (): void => {
    setToggled((prev) => !prev);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleComments = () => {
    setOpen(!open);
  };

  const handleShareClick = () => {
    setIsShare(!isShare);
  };

  return (
    <Paper
      style={{
        padding: "16px",
        position: "relative",
        backgroundColor: "#1B1B1B",
        color: "#fff",
        marginBottom: "10px",
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={1}>
          <Avatar src={profilePic} />
        </Grid>
        <Grid item xs={9}>
          <Typography variant="subtitle1">{name}</Typography>
          <Typography variant="body2">{lastSeen}</Typography>
        </Grid>
        <Grid item xs={2} sx={{ textAlign: "right" }}>
          <IconButton onClick={handleMenuClick}>
            <MoreVertIcon sx={{ color: "#fff" }} />
          </IconButton>
          <Menu
            className="feeds-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              sx={{ backgroundColor: "#000" }}
              onClick={handleMenuClose}
            >
              <Button
                sx={{ color: "#fff" }}
                startIcon={<ModeEditOutlineOutlinedIcon />}
              >
                Edit
              </Button>
            </MenuItem>
            <MenuItem
              sx={{ backgroundColor: "#000" }}
              onClick={handleMenuClose}
            >
              <Button
                sx={{ color: "#fff" }}
                startIcon={<OutlinedFlagTwoToneIcon />}
              >
                Report
              </Button>
            </MenuItem>
            <MenuItem
              sx={{ backgroundColor: "#000" }}
              onClick={handleMenuClose}
            >
              <Button
                sx={{ color: "#fff" }}
                startIcon={<NotificationsOutlinedIcon />}
              >
                Turn Off Notification
              </Button>
            </MenuItem>
            <MenuItem
              sx={{ backgroundColor: "#000" }}
              onClick={handleMenuClose}
            >
              <Button
                sx={{ color: "#fff" }}
                startIcon={<NotInterestedOutlinedIcon />}
              >
                Not Interested
              </Button>
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
      <Divider style={{ margin: "16px 0" }} />
      <Typography variant="body1" gutterBottom>
        {content}
      </Typography>
      <Divider style={{ margin: "10px 0" }} />
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={9} sx={{ padding: "5px", display: "flex" }}>
          <Grid sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={handleToggle}>
              {toggled ? <Heart /> : <BlueHeart />}
            </IconButton>
            <Typography variant="body2" className={toggled ? "" : "tex-grad"}>
              1.2k Likes
            </Typography>
          </Grid>
          <Grid sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={handleComments}>
              <Comment />
            </IconButton>
            <Typography variant="body2" sx={{ color: "gray" }}>
              7 Comments
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={3} sx={{ textAlign: "right" }}>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <IconButton>
                <ShareIcon onClick={handleShareClick} />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                sx={{ color: "gray" }}
                onClick={handleShareClick}
              >
                Share
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {comment ? (
          <></>
        ) : (
          <>
            <Divider style={{ margin: "16px 0" }} />
            <Grid item xs={1}>
              <Avatar />
            </Grid>
            <Grid item xs={11}>
              <TextField
                fullWidth
                placeholder="Write your comment..."
                variant="outlined"
                sx={{ backgroundColor: "#2A2A2A", borderRadius: "15px" }}
              />
            </Grid>
          </>
        )}
      </Grid>
      <Modal
        open={open}
        onClose={handleComments}
        aria-labelledby="comments-modal-title"
        aria-describedby="comments-modal-description"
      >
        <CommentsModal onClose={handleComments} />
      </Modal>
      <Modal open={isShare} onClose={handleShareClick}>
        <ShareModal onClose={handleShareClick} />
      </Modal>
    </Paper>
  );
};

export default FeedPost;
