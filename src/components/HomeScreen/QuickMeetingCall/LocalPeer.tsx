import { MicOffIcon, PersonIcon } from "@100mslive/react-icons";
import {
  selectIsPeerAudioEnabled,
  selectIsPeerVideoEnabled,
  useVideo,
  useHMSStore,
} from "@100mslive/react-sdk";

import Footer from "./Footer";
import Header from "./Header";

interface PeerProps {
  peer: {
    id: string;
    videoTrack: string;
    name: string;
    isLocal: boolean;
  };
  presenting: boolean;
  title: string;
  timeRemaining: string;
}

function LocalPeer({ peer, presenting, title, timeRemaining }: PeerProps) {
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });

  const isPeerAudioEnabled = useHMSStore(selectIsPeerAudioEnabled(peer.id));
  const isPeerVideoEnabled = useHMSStore(selectIsPeerVideoEnabled(peer.id));

  return (
    <>
      <div
        className={`${presenting ? "peer-container-local" : ""}`}
        style={{ position: "relative" }}
      >
        <video
          ref={videoRef}
          className="peer-video"
          autoPlay
          muted
          playsInline
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            height: "100%",
            objectFit: "contain", // Ensure the video maintains its aspect ratio
          }}
        />

        {!isPeerVideoEnabled ? (
          <div className="peer-video video-cover">
            <PersonIcon height={100} width={100} />
          </div>
        ) : null}
        <div
          className="peer-name"
          style={{
            position: "absolute",
            bottom: "1rem",
            right: "1rem",
            zIndex: 2,
            borderRadius: "0.75rem",
            height: "1rem",
            width: "5rem",
          }}
        >
          {peer.name} {peer.isLocal ? "(You)" : ""}
        </div>

        <div className="time-remaining">
          <Header title={title} timeRemaining={timeRemaining} />
        </div>

        {/* {!isPeerAudioEnabled && (
          <div
            style={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem",
              zIndex: 2,
              backgroundColor: "#293042",
              padding: "0.5rem",
              borderRadius: "0.75rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MicOffIcon height={16} width={16} />
          </div>
        )} */}
      </div>
      <Footer />
    </>
  );
}

export default LocalPeer;
