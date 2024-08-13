import { useState, useEffect, useRef } from "react";
import { AudioLevelIcon, VideoOffIcon } from "@100mslive/react-icons";
import {
  selectIsLocalAudioPluginPresent,
  selectIsLocalScreenShared,
  selectRoom,
  useAVToggle,
  useHMSActions,
  useHMSStore,
  selectPeers,
  selectIsConnectedToRoom,
} from "@100mslive/react-sdk";
import { ReactComponent as MicOffIcon } from "../../../assets/Mute.svg";
import { ReactComponent as MicOnIcon } from "../../../assets/On.svg";
import { ReactComponent as VideoOnIcon } from "../../../assets/Video.svg";
import { ReactComponent as ShareScreenIcon } from "../../../assets/ScreenShare.svg";
import { ReactComponent as VisualEffectIcon } from "../../../assets/sparkle-4VE.svg";
import { ReactComponent as AIIcon } from "../../../assets/CalendarAI.svg";
import { ReactComponent as WhiteBoardIcon } from "../../../assets/Home@2x.svg";
import { ReactComponent as Streaming } from "../../../assets/Streaming.svg";
import { HMSKrispPlugin } from "@100mslive/hms-noise-cancellation";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import { HandRaiseIcon } from "./VideoLayout/HandRaiseIcon";

const plugin = new HMSKrispPlugin();

function Footer() {
  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } =
    useAVToggle();
  const amIScreenSharing = useHMSStore(selectIsLocalScreenShared);
  const actions = useHMSActions();
  const room = useHMSStore(selectRoom);
  const isAudioPluginAdded = useHMSStore(
    selectIsLocalAudioPluginPresent(plugin.getName())
  );
  const [isPluginActive, setIsPluginActive] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [availableSpeakers, setAvailableSpeakers] = useState<MediaDeviceInfo[]>(
    []
  );
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const peers = useHMSStore(selectPeers);
  const hmsActions = useHMSActions();
  const navigate = useNavigate();

  // Track previous peers to detect changes
  const prevPeersRef = useRef<Map<string, boolean>>(new Map());

  async function getAudioOutputDevices() {
    setIsMenuOpen((prevState) => !prevState);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    } catch (error) {
      console.error("Error accessing media devices: ", error);
      return;
    }
    const devices = await navigator.mediaDevices.enumerateDevices();
    const audioOutputDevices = devices.filter(
      (device) => device.kind === "audiooutput"
    );
    setAvailableSpeakers(audioOutputDevices);
  }

  const leaveMeeting = () => {
    hmsActions.leave();
    navigate("/home");
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleRaiseHand = async () => {
    if (isHandRaised) {
      // Lower hand
      await actions.lowerLocalPeerHand();
    } else {
      // Raise hand
      await actions.raiseLocalPeerHand();
      setSnackbarOpen(true);
      // Hide Snackbar after 4 seconds
      setTimeout(() => {
        setSnackbarOpen(false);
      }, 4000);
    }
    setIsHandRaised(!isHandRaised);
  };

  useEffect(() => {
    if (isHandRaised) {
      const prevPeers = prevPeersRef.current;

      peers.forEach((peer) => {
        if (peer.isHandRaised !== prevPeers.get(peer.id)) {
          if (peer.isHandRaised) {
            setSnackbarMessage(`${peer.name} raised their hand.`);
            setSnackbarOpen(true);
          }
          prevPeers.set(peer.id, peer.isHandRaised);
        }
      });

      // Update ref with the latest peer states
      prevPeersRef.current = new Map(
        peers.map((peer) => [peer.id, peer.isHandRaised])
      );
    }
  }, [isHandRaised, peers]);

  return (
    <>
      <div className="control-bar">
        <div
          className="toggle-container"
          style={{ justifyContent: "space-evenly" }}
        >
          {isLocalAudioEnabled ? (
            <MicOnIcon onClick={toggleAudio} />
          ) : (
            <MicOffIcon onClick={toggleAudio} width={24} height={24} />
          )}
          {isMenuOpen ? (
            <KeyboardArrowDownIcon
              sx={{ color: "#fff" }}
              onClick={getAudioOutputDevices}
            />
          ) : (
            <KeyboardArrowUp
              sx={{ color: "#fff" }}
              onClick={getAudioOutputDevices}
            />
          )}
          {isMenuOpen && (
            <div className="speaker-options-menu">
              {availableSpeakers.map((speaker, index) => (
                <div key={index} className="speaker-option">
                  {speaker.label}
                </div>
              ))}
            </div>
          )}
        </div>

        <div onClick={toggleVideo} className="toggle-container">
          {isLocalVideoEnabled ? (
            <VideoOnIcon />
          ) : (
            <VideoOffIcon color="#FFF" height={24} width={24} />
          )}
        </div>
        <Button
          style={{
            height: "56px",
            width: "76px",
            color: "#ffff",
            background: "#EF4444",
            marginRight: "10px",
            borderRadius: "8px",
            fontSize: "16px",
            textTransform: "none",
            fontFamily: "Calibri",
            fontWeight: "400",
          }}
          size="small"
          variant="contained"
          onClick={leaveMeeting}
        >
          Leave
        </Button>
        <div onClick={toggleRaiseHand} className="toggle-container">
          <HandRaiseIcon color={isHandRaised ? "#2D8CFF" : "#9CA3AF"} />
        </div>
        <div className="toggle-container">
          <IconButton onClick={handleClick}>
            <MoreVertIcon sx={{ color: "#9CA3AF" }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{
              "& .MuiPaper-root": {
                background: "#111111",
                fontFamily: "Calibri",
                borderRadius: "10px",
                marginTop: "-18px",
                width: "200px",
                ml: 8.5,
                color: "#fff",
              },
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <MenuItem onClick={handleClose}>
              <Box display="flex" alignItems="center" alignContent="center">
                <ShareScreenIcon />
                <Typography
                  ml={1}
                  onClick={() =>
                    actions.setScreenShareEnabled(!amIScreenSharing)
                  }
                  style={{
                    fontWeight: "300",
                    fontSize: "16px",
                    fontFamily: "Calibri",
                  }}
                >
                  Screen Sharing
                </Typography>
              </Box>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Box display="flex" alignItems="center" alignContent="center">
                <WhiteBoardIcon />
                <Typography
                  ml={1.5}
                  onClick={() => {
                    //need action
                  }}
                  style={{
                    fontWeight: "300",
                    fontSize: "16px",
                    fontFamily: "Calibri",
                  }}
                >
                  Whiteboard
                </Typography>
              </Box>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Box display="flex" alignItems="center" alignContent="center">
                <AIIcon />
                <Typography
                  ml={1.5}
                  onClick={() => {
                    //need action
                  }}
                  style={{
                    fontWeight: "300",
                    fontSize: "16px",
                    fontFamily: "Calibri",
                  }}
                >
                  Ai
                </Typography>
              </Box>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Box display="flex" alignItems="center" alignContent="center">
                <VisualEffectIcon />
                <Typography
                  ml={1.5}
                  onClick={() => {
                    //need action
                  }}
                  style={{
                    fontWeight: "300",
                    fontSize: "16px",
                    fontFamily: "Calibri",
                  }}
                >
                  Visual Effects
                </Typography>
              </Box>
            </MenuItem>
          </Menu>
        </div>

        {room.isNoiseCancellationEnabled ? (
          <div
            className="toggle-container"
            onClick={async () => {
              if (isAudioPluginAdded) {
                plugin.toggle();
                setIsPluginActive((prev) => !prev);
              } else {
                await actions.addPluginToAudioTrack(plugin);
                setIsPluginActive(true);
              }
            }}
          >
            <AudioLevelIcon />
          </div>
        ) : null}
      </div>
      <div className="stream">
        <Streaming />
      </div>
      {snackbarOpen && (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          message={snackbarMessage}
        />
      )}
    </>
  );
}

export default Footer;
