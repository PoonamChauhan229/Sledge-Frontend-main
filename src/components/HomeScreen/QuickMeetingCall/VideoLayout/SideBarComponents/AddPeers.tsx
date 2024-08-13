import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SidebarComponentLayout from "./SidebarComponentLayout";
import { ReactComponent as KickoutIcon } from "../../../../../assets/kickout.svg";
import { ReactComponent as ChatIcon } from "../../../../../assets/chat-icon.svg";
import "./AddPeers.css";
import {
  HMSPeer,
  selectPeers,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { PeerData } from "../../Conference";
import AddPeoplePopup from "./AddPeoplePopup";

const PrimaryText = styled("span")(({ theme }) => ({
  fontSize: "18px",
  fontWeight: "400",
  color: "#FFFFFFE5",
}));

const SecondaryText = styled("span")(({ theme }) => ({
  fontSize: "14px",
  color: "#FFFFFF8F",
}));

interface AddPeersProps {
  setActiveTab: (tab: number) => void;
  setSelectedPeer: (peer: { id: string, name: string } | null) => void;
}

const AddPeers: React.FC<AddPeersProps> = ({ setActiveTab, setSelectedPeer }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [participants, setParticipants] = useState<PeerData[]>([]);
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const hmsActions = useHMSActions();
  const rawPeers = useHMSStore(selectPeers);
  const peers: PeerData[] = useMemo(
    () =>
      rawPeers.map((peer: HMSPeer) => ({
        id: peer.id,
        videoTrack: peer.videoTrack || "",
        name: peer.name || "",
        isLocal: peer.isLocal || false,
        roleName: peer.roleName,
      })),
    [rawPeers]
  );

  const handleKickout = (peerId: string) => {
    setParticipants((prevParticipants) =>
      prevParticipants.filter((peer) => peer.id !== peerId)
    );
    hmsActions.removePeer(peerId, "You have been removed from the meeting.");
  };

  useEffect(() => {
    const othersPeers = peers.filter((peer) => !peer.isLocal);
    setParticipants(othersPeers);
  }, [peers]);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChatClick = (participant: PeerData) => {
    setActiveTab(0);
    handleClose();
    setSelectedPeer({ id: participant.id, name: participant.name });
    console.log("setSelectedPeer....", participant)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenAddPopup = () => {
    setOpenAddPopup(true);
  };

  const handleCloseAddPopup = () => {
    setOpenAddPopup(false);
  };

  const filteredParticipants = participants.filter((participant) =>
    participant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("filteredParticipants.....", filteredParticipants)

  const AddPeersComponent = (
    <div className="add-people-container">
      <div className="people-header-container">
        <Typography
          style={{
            fontSize: "28px",
            fontWeight: "700",
            fontFamily: "Calibri",
          }}
        >
          People
        </Typography>
        <Button
          className="addPeers-button"
          style={{ fontFamily: "Calibri", fontSize: "20px", fontWeight: "400" }}
          onClick={handleOpenAddPopup}
        >
          Add People
        </Button>
        <TextField
          className="search-field"
          variant="outlined"
          placeholder="Search for participants"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#8c8f9f" }} />
              </InputAdornment>
            ),
            sx: {
              color: "#FFFFFF",
              fontSize: "16px",
              fontFamily: "Calibri",
              "& .MuiInputBase-input::placeholder": {
                fontFamily: "Calibri",
                fontWeight: "400",
                color: "#8c8f9f",
                lineHeight: "19.53px",
                opacity: 1,
              },
              "& .MuiInputBase-input": {
                display: "flex",
                alignItems: "center",
              },
            },
          }}
          sx={{
            fontFamily: "Calibri",
            fontSize: "16px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "transparent",
              },
              "&:hover fieldset": {
                borderColor: "transparent",
              },
              "&.Mui-focused fieldset": {
                borderColor: "transparent",
              },
              display: "flex",
              alignItems: "center",
            },
          }}
        />
      </div>
      <div className="participants-list">
        <div
          style={{
            padding: "16px",
            height: "10vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography className="in-meeting-text">In Meeting</Typography>
          <Typography className="participants-text">
            Participants {filteredParticipants.length}
          </Typography>
        </div>
        <Divider variant="middle" color="#F2F2F2" />
        <Box sx={{ maxHeight: "300px", overflowY: "auto" }}>
          <List>
            {filteredParticipants.map((participant, index) => (
              <ListItem key={participant.id} style={{ color: "#FFFFFF8F" }}>
                <ListItemAvatar>
                  <Avatar alt={participant.name} />
                </ListItemAvatar>
                <ListItemText
                  primary={<PrimaryText>{participant.name}</PrimaryText>}
                  secondary={
                    <SecondaryText>{participant.roleName}</SecondaryText>
                  }
                />
                <IconButton edge="end" onClick={handleClick}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  sx={{
                    "& .MuiPaper-root": {
                      paddingLeft: "16px",
                      paddingRight: "16px",
                      background: "#111111",
                      fontFamily: "Calibri",
                      borderRadius: "10px",
                    },
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <Box display="flex" alignItems="center">
                      <KickoutIcon width={16} height={16} />
                      <Box
                        sx={{ color: "#FFFFFF" }}
                        ml={1.5}
                        onClick={() => handleKickout(participant.id)}
                      >
                        Kickout
                      </Box>
                    </Box>
                  </MenuItem>
                  <MenuItem onClick={() => handleChatClick(participant)}>
                    <ChatIcon width={18} height={18} />
                    <Box sx={{ color: "#FFFFFF" }} ml={1.5}>
                      Chat
                    </Box>
                  </MenuItem>
                </Menu>
              </ListItem>
            ))}
          </List>
        </Box>
      </div>
      <AddPeoplePopup open={openAddPopup} handleClose={handleCloseAddPopup} />
    </div>
  );

  return <SidebarComponentLayout component={AddPeersComponent} />;
};

export default AddPeers;
