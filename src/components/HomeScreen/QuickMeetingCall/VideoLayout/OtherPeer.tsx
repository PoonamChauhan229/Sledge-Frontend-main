import { PersonIcon } from "@100mslive/react-icons";
import {
  selectIsPeerAudioEnabled,
  selectIsPeerVideoEnabled,
  useVideo,
  useHMSStore,
} from "@100mslive/react-sdk";
import { ReactComponent as AudioLinesIcon } from "../../../../assets/AudioLines.svg";

interface PeerProps {
  peer: {
    id: string;
    videoTrack: string;
    name: string;
    isLocal: boolean;
  };
  presenting: boolean;
}

function OtherPeer({ peer, presenting }: PeerProps) {
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });

  const isPeerAudioEnabled = useHMSStore(selectIsPeerAudioEnabled(peer.id));
  const isPeerVideoEnabled = useHMSStore(selectIsPeerVideoEnabled(peer.id));

  return (
    <div
      className="participants-container"
      style={{ position: "relative", borderRadius: "6px" }}
    >
      {!isPeerVideoEnabled && isPeerAudioEnabled && (
        <div
          style={{
            position: "absolute",
            bottom: "0.5rem",
            right: "0rem",
            zIndex: 100,
            backgroundColor: "transparent",
            padding: "0.5rem",
            borderRadius: "0.75rem",
            height: "1rem",
            width: "1rem",
          }}
        >
          <AudioLinesIcon height={16} width={16} />
        </div>
      )}

      {isPeerVideoEnabled ? (
        <video
          ref={videoRef}
          style={{
            width: "52px",
            height: "52px",
            objectFit: "cover",
          }}
          autoPlay
          muted
          playsInline
        />
      ) : (
        // Put Person Image from backend data
        <div
          style={{
            width: "52px",
            height: "52px",
            objectFit: "cover",
            marginTop: "5px",
          }}
        >
          <PersonIcon height={52} width={52} />
        </div>
      )}
    </div>
  );
}

export default OtherPeer;
