import { ExitIcon } from "@100mslive/react-icons";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

interface HeaderProps {
  title: string;
  timeRemaining: string;
}

function Header({ title, timeRemaining }: HeaderProps) {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();
  const navigate = useNavigate();

  return isConnected ? (
    <div className="event-header">
      <div>{title}</div>
      <div className="event-time-count">
        <span
          style={{
            color: "#6D6D6D",
            fontSize: "14px",
            fontWeight: "400",
          }}
        >
          Time Remaining
        </span>
        <span style={{ color: "#D1D5DB", fontSize: "18px", fontWeight: "400" }}>
          {" "}
          {timeRemaining}
        </span>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Header;
