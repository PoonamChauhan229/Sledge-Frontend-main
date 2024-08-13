
import { useState, useRef } from "react";
import { useHMSActions } from "@100mslive/react-sdk";
import { ArrowRightIcon } from "@100mslive/react-icons";
import { Box, TextField, Button, Typography } from "@mui/material";

interface Props{
  roomcode?: string;
}

function Join({roomcode}: Props) {
  const hmsActions = useHMSActions();
  const roomCodeRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // use room code to fetch auth token
    try {
      const roomCode = roomCodeRef.current?.value;
      if (roomCode) {
        const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode });
        const userName = userNameRef.current?.value;
        if (userName) {
          await hmsActions.join({
            userName,
            authToken,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="quick-meeting-home">
      <Typography variant="h3" sx={{ color: "#fff" }}>
        Join Room
      </Typography>
      <Typography variant="h6" sx={{ color: "#fff", textAlign: "center" }}>
        Enter your room code and name before joining
      </Typography>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            ref={roomCodeRef}
            id="room-code"
            type="text"
            name="roomCode"
            placeholder="Your Room Code"
          />
        </div>
        <div className="input-container">
          <input
            required
            ref={userNameRef}
            id="name"
            type="text"
            name="name"
            placeholder="Your Name"
          />
        </div>
        <div>
          <Button
            className="next-button"
            type="submit"
            fullWidth
            variant="contained"
          >
            Join Now
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Join;
