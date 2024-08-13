import React, { useMemo, useState } from "react";
import {
  HMSPeer,
  selectIsLocalScreenShared,
  useHMSStore,
  useHMSActions,
  useAVToggle,
} from "@100mslive/react-sdk";

import "./OtherParticipants.css";
import OtherPeer from "./OtherPeer";
import Participant from "./../../../../assets/Participant.png";
import { PeerData } from "../Conference";
import { ReactComponent as KickoutIcon } from "../../../../assets/kickout.svg";
import { ReactComponent as MuteIcon } from "../../../../assets/Mute.svg";
import { ReactComponent as StopShareIcon } from "../../../../assets/StopShare.svg";

interface OtherParticipantsProps {
  otherParticipants: HMSPeer[];
  onKickout: (peerId: string) => void;
}

const OtherParticipants: React.FC<OtherParticipantsProps> = ({
  otherParticipants,
  onKickout,
}) => {
  const [selectedPeerId, setSelectedPeerId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const amIScreenSharing = useHMSStore(selectIsLocalScreenShared);
  const { isLocalAudioEnabled, toggleAudio } = useAVToggle();
  const { setScreenShareEnabled } = useHMSActions();
  const handleStopShare = () => {
    setScreenShareEnabled(false); // This will disable screen sharing
  };

  const peers: PeerData[] = useMemo(
    () =>
      otherParticipants.map((peer: HMSPeer) => ({
        id: peer.id,
        videoTrack: peer.videoTrack || "",
        name: peer.name || "",
        isLocal: peer.isLocal || false,
        roleName: peer.roleName,
      })),
    [otherParticipants]
  );

  const MAX_VISIBLE_PARTICIPANTS = 10; // Set your limit here
  const showMoreCount = peers.length > MAX_VISIBLE_PARTICIPANTS;
  const visiblePeers = !isExpanded
    ? peers.slice(
        0,
        showMoreCount ? MAX_VISIBLE_PARTICIPANTS - 1 : MAX_VISIBLE_PARTICIPANTS
      )
    : peers;

  const isHost = peers.find((peer) => peer.roleName === "host");
  const handlePeerClick = (peerId: string) => {
    setSelectedPeerId((prevPeerId) => (prevPeerId === peerId ? null : peerId));
  };
  const handleMoreParticipantsClick = () => {
    console.log("miral");
    setIsExpanded(true);
  };

  return (
    <div className="participants-container">
      <div className="sticky-image">
        <img src={Participant} width={52} height={52} alt="Participants" />
      </div>
      <ul
        className={
          isExpanded
            ? "participants-list participant-scrollable-list"
            : "participants-list"
        }
      >
        {visiblePeers.map((peer) => (
          <li
            key={peer.id}
            className="participant-item"
            onClick={() => handlePeerClick(peer.id)}
          >
            <OtherPeer key={peer.id} peer={peer} presenting={false} />
            {selectedPeerId === peer.id && (
              <div className="popup">
                <div className="popup-items" onClick={() => onKickout(peer.id)}>
                  <KickoutIcon width={16} height={16} />
                  <div>Kickout</div>
                </div>
                {isLocalAudioEnabled && (
                  <div className="popup-items" onClick={toggleAudio}>
                    <MuteIcon width={16} height={16} />
                    <div>Mute</div>
                  </div>
                )}
                {amIScreenSharing && (
                  <div className="popup-items" onClick={handleStopShare}>
                    <StopShareIcon width={16} height={16} />
                    <div>Stop</div>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
        {showMoreCount && (
          <li
            key="more"
            className="participant-item overlay-container"
            style={{ cursor: isHost ? "pointer" : "not-allowed" }}
          >
            <OtherPeer
              key={peers[MAX_VISIBLE_PARTICIPANTS - 1].id}
              peer={peers[MAX_VISIBLE_PARTICIPANTS - 1]}
              presenting={false}
            />
            {!isExpanded && (
              <div className="more-count" onClick={handleMoreParticipantsClick}>
                +{peers.length - MAX_VISIBLE_PARTICIPANTS + 1}
              </div>
            )}
          </li>
        )}
      </ul>
    </div>
  );
};

export default OtherParticipants;
