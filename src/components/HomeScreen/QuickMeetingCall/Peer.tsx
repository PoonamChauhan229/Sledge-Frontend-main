import { PersonIcon } from "@100mslive/react-icons";
import {
  selectIsPeerAudioEnabled,
  selectIsPeerVideoEnabled,
  useVideo,
  useHMSStore,
} from "@100mslive/react-sdk";
import { ReactComponent as MicOffIcon } from "../../../assets/Mute.svg";
import { ReactComponent as MicOnIcon } from "../../../assets/On.svg";

interface PeerProps {
  peer: {
    id: string;
    videoTrack: string;
    name: string;
    isLocal: boolean;
  };
  presenting: boolean;
}

function Peer({ peer, presenting }: PeerProps) {
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });

  const isPeerAudioEnabled = useHMSStore(selectIsPeerAudioEnabled(peer.id));
  const isPeerVideoEnabled = useHMSStore(selectIsPeerVideoEnabled(peer.id));

  return (
    <>
      <div className="peer-container">
        <video
          ref={videoRef}
          className="peer-video"
          autoPlay
          muted
          playsInline
          style={{ display: isPeerVideoEnabled ? "block" : "none" }}
        />

        {!isPeerVideoEnabled && (
          <div className="peer-video video-cover">
            <PersonIcon height={48} width={48} />
          </div>
        )}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            zIndex: "100",
            paddingLeft: "18px",
            paddingRight: "18px",
            height: "24px",
            paddingTop: "6px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: "0 6px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              color: "#FFF",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "1.5",
              display: "flex",
              alignItems: "center",
            }}
          >
            {peer.name} {peer.isLocal && "(You)"}
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
            zIndex: "100",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: "0.5rem",
            borderRadius: "6px 0",
            display: "flex",
            alignItems: "center",
          }}
        >
          {isPeerAudioEnabled ? (
            <MicOnIcon height={16} width={16} />
          ) : (
            <MicOffIcon height={16} width={16} />
          )}
        </div>
      </div>
    </>
  );
}

export default Peer;
