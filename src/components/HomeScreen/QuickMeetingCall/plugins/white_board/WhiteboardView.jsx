import { Whiteboard } from "./Whiteboard";
import { selectRoomID, useHMSStore } from "@100mslive/react-sdk";
import { Box } from "@mui/material";
import React from 'react'

const WhiteboardView = () => {
    const roomId = useHMSStore(selectRoomID);
  return (
    <Box>
        <Whiteboard roomId={roomId}/>
    </Box>
    )
}

export default WhiteboardView;