import React, { useContext, useEffect, useState } from "react";
import JoinForm from "./JoinForm";
import "./QuickMeeting.css";
import Conference from "./Conference";
import {
  HMSPeer,
  HMSRoomState,
  selectIsConnectedToRoom,
  selectRoomState,
  useHMSActions,
  useHMSStore,
  useParticipants,
} from "@100mslive/react-sdk";
// import { Loader } from "./Loader";
import Chat from "./chat/Chat";
import OtherParticipants from "./VideoLayout/OtherParticipants";
import CustomizedDrawer from "./CustomizedDrawer";
import { useParams, useLocation } from "react-router-dom";
import QuickMeetingContext from "../../../context/QuickMeetingContext";
import Sidebar from "./VideoLayout/SideBarComponents/Sidebar";
import { Grid, Typography } from "@mui/material";

const loadingStates = [HMSRoomState.Connecting, HMSRoomState.Disconnecting];

export default function StartQuickMeeting() {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const roomState = useHMSStore(selectRoomState);
  const hmsActions = useHMSActions();
  const participants = useParticipants();
  const [otherParticipants, setOtherParticipants] = useState<HMSPeer[]>([]);
  const { room_code } = useParams();
  const location = useLocation();
  const { audio, video, visualEffects, setVisualEffects } =
    useContext(QuickMeetingContext);

  const [activeTab, setActiveTab] = useState(1);
  const [selectedPeer, setSelectedPeer] = useState<{ id: string, name: string } | null>(null);

  useEffect(() => {
    if (participants.peerCount >= 7) {
      setOtherParticipants(participants.participants.slice(6));
    }
  }, [participants]);

  const handleKickout = (peerId: string) => {
    // Remove the peer from the state
    setOtherParticipants((prevParticipants) =>
      prevParticipants.filter((peer) => peer.id !== peerId)
    );
    // Optionally, add logic here to notify the backend or meeting server to remove the peer from the session
    hmsActions.removePeer(peerId, "You have been removed from the meeting.");
  };

  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);

  useEffect(() => {
    // use room code to fetch auth token
    const join = async () => {
      try {
        const roomCode = room_code;
        if (roomCode) {
          const authToken = await hmsActions.getAuthTokenByRoomCode({
            roomCode,
          });
          const userName = "John";
          if (userName) {
            const config = {
              userName: userName,
              authToken: authToken, // client-side token generated from your token service
              settings: {
                isAudioMuted: !audio,
                isVideoMuted: !video,
              },
              metaData: JSON.stringify({
                city: "Winterfell",
                knowledge: "nothing",
              }),
              rememberDeviceSelection: true, // remember manual device change
            };
            await hmsActions.join(config);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };

    join();

    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [isConnected]);

  return (
    <>
      {isConnected && (
        <div className="quick-meeting">
          <Sidebar setActiveTab={setActiveTab} setSelectedPeer={setSelectedPeer} />
          <Conference
            title={location.state.hostData.title}
            end_date={location.state.hostData.end_date}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {!visualEffects && (
              <Chat
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                selectedPeer={selectedPeer}
                setSelectedPeer={setSelectedPeer}
              />
            )}
            {visualEffects && (
              <CustomizedDrawer
                open={visualEffects}
                setOpen={setVisualEffects}
              />
            )}

            {participants.peerCount >= 7 && (
              <OtherParticipants
                otherParticipants={otherParticipants}
                onKickout={handleKickout}
              />
            )}
          </div>
        </div>
      )}
      {!isConnected && (
        <Grid
          container
          sx={{
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#333",
          }}
        >
          <Typography variant="h4" sx={{ color: "#fff" }}>
            Sleding...
          </Typography>
        </Grid>
      )}
    </>
  );
}
