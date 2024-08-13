import React from "react";
import {
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Button,
  InputBase,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ReactComponent as ShareLink } from "../../assets/link.svg";
import { ReactComponent as Search } from "../../assets/magnifying-glass 1.svg";
import { ReactComponent as People } from "../../assets/profile-2user.svg";
import { ReactComponent as Close } from "../../assets/Group 33569.svg";

import userProfilePic from "../../assets/share-profile.png";
import CustomCheckbox from "./CustomCheckbox/CustomCheckbox";
import "./shareModal.css";
import "./shareModal.css";

const users = [
  { id: 1, name: "Kapadia Ehtesham", avatar: userProfilePic },
  { id: 2, name: "Kapadia Ehtesham", avatar: userProfilePic },
  { id: 3, name: "Kapadia Ehtesham", avatar: userProfilePic },
  { id: 4, name: "Kapadia Ehtesham", avatar: userProfilePic },
];

interface ShareModalProps {
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ onClose }) => {
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Box className="share-to-container">
      <Box className="share-details">
        <Box className="header">
          <Typography variant="h6" className="title">
            Share To
          </Typography>
          <Box>
            <Button startIcon={<ShareLink />} className="copy-link">
              Copy Link
            </Button>
            <Close
              aria-label="close"
              onClick={onClose}
              className="close-button"
            >
              <CloseIcon />
            </Close>
          </Box>
        </Box>
        <Box className="search-bar">
          <Search className="search-icon" />
          <InputBase
            placeholder="Search"
            classes={{ root: "input-root", input: "input-input" }}
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton className="people-icon">
            <People />
          </IconButton>
        </Box>
        <List>
          {users.map((user) => (
            <ListItem
              key={user.id}
              secondaryAction={
                <CustomCheckbox
                  checked={checked.indexOf(user.id) !== -1}
                  onChange={handleToggle(user.id)}
                />
              }
              disablePadding
            >
              <img alt={user.name} src={user.avatar} className="avatar" />
              <ListItemText
                primary={user.name}
                secondary={user.id}
                className="list-item-text"
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <div className="button-container">
        <Button variant="contained" className="action-button-send">
          Send
        </Button>
      </div>
    </Box>
  );
};

export default ShareModal;
