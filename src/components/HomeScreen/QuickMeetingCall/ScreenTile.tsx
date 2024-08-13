import {
  selectScreenShareByPeerID,
  useHMSStore,
  useVideo,
} from "@100mslive/react-sdk";

interface PeerProps {
  peer: {
    id: string;
    videoTrack: string;
    name: string;
    isLocal: boolean;
  };
}

export const ScreenTile = ({ peer }: PeerProps) => {
  const screenshareVideoTrack = useHMSStore(selectScreenShareByPeerID(peer.id));
  const { videoRef } = useVideo({
    trackId: screenshareVideoTrack.id,
  });

  return (
    <div className="screen-tile">
      <video
        ref={videoRef}
        className="presenter-video"
        autoPlay
        muted
        playsInline
        style={{ objectFit: "contain" }} // Ensure the video fits the container properly
      />
      <div className="peer-name">
        Screen shared by {peer.name} {peer.isLocal ? "(You)" : ""}
      </div>
    </div>
  );
};
