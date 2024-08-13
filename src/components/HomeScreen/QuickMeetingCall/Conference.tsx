import {
  selectPeers,
  useHMSStore,
  HMSPeer,
  selectPeersScreenSharing,
} from "@100mslive/react-sdk";
import Peer from "./Peer";
import LocalPeer from "./LocalPeer";
import { ScreenTile } from "./ScreenTile";
import { useEffect, useState, useMemo, FC } from "react";

export interface PeerData {
  id: string;
  videoTrack: string;
  name: string;
  isLocal: boolean;
  roleName?: string;
}

interface ConferenceProps {
  title: string;
  end_date: string;
}

function Conference({ title, end_date }: ConferenceProps) {
  const rawPeers = useHMSStore(selectPeers);
  const rawPresenters = useHMSStore(selectPeersScreenSharing);

  const peers: PeerData[] = useMemo(
    () =>
      rawPeers.map((peer: HMSPeer) => ({
        id: peer.id,
        videoTrack: peer.videoTrack || "", // Handle the possibility of videoTrack being undefined
        name: peer.name || "", // Handle the possibility of name being undefined
        isLocal: peer.isLocal || false, // Handle the possibility of isLocal being undefined
      })),
    [rawPeers]
  );

  const presenters: PeerData[] = useMemo(
    () =>
      rawPresenters.map((peer: HMSPeer) => ({
        id: peer.id,
        videoTrack: peer.videoTrack || "", // Handle the possibility of videoTrack being undefined
        name: peer.name || "", // Handle the possibility of name being undefined
        isLocal: peer.isLocal || false, // Handle the possibility of isLocal being undefined
      })),
    [rawPresenters]
  );

  const [localPeer, setLocalPeer] = useState<PeerData | null>(null);
  const [otherPeers, setOtherPeers] = useState<PeerData[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  useEffect(() => {
    const foundPeer = peers.find((peer) => peer.isLocal);
    setLocalPeer(foundPeer ?? null);
    const others = peers.filter((peer) => !peer.isLocal);
    setOtherPeers(others);
  }, [peers]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(getRemainingTime(end_date));
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [end_date]);

  function getRemainingTime(endDate: string): string {
    const endTime = new Date(endDate).getTime();
    const currentTime = new Date().getTime();

    // Calculate the difference in milliseconds
    const timeDifference: number = endTime - currentTime;

    if (timeDifference < 0) {
      return "Meeting has already ended";
    }

    // Convert the difference to hours, minutes, and seconds
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Pad hours, minutes, and seconds with leading zeros if needed
    const paddedHours = String(hours).padStart(2, "0");
    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(seconds).padStart(2, "0");

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  }

  return (
    <div className="conference-section">
      <div className="presenter-container">
        {presenters.length >= 1 &&
          presenters.map((peer) => (
            <ScreenTile key={"screen" + peer.id} peer={peer} />
          ))}
        {presenters.length === 0 && localPeer && (
          <LocalPeer
            key={localPeer?.id}
            peer={localPeer}
            presenting={false}
            title={title}
            timeRemaining={timeRemaining}
          />
        )}
      </div>
      {otherPeers.length > 0 && (
        <div className="peers-container">
          {otherPeers.slice(0, 5).map((peer) => (
            <Peer key={peer.id} peer={peer} presenting={false} />
          ))}
          {presenters.map((peer) => (
            <ScreenTile key={"screen" + peer.id} peer={peer} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Conference;
