import { useRef, useCallback, useEffect, useState } from "react";
// import {
//   useHMSStore,
//   useHMSActions,
//   selectIsLocalVideoPluginPresent,
// } from "@100mslive/react-sdk";
// import {
//   HMSVBPlugin,
//   HMSVirtualBackgroundTypes,
// } from "@100mslive/hms-virtual-background";
// import { HMSVirtualBackgroundPlugin } from "@100mslive/hms-virtual-background";

import { Button } from "@mui/material";

import { useContext } from "react";
import QuickMeetingContext from "../../../../../context/QuickMeetingContext";

export default function VirtualBackground() {
  
  const { setVisualEffects } = useContext(QuickMeetingContext);

  return (
    <Button size="small" variant="contained" color="success" onClick={()=>setVisualEffects((prev: any)=> !prev)}>
      VB
    </Button>
  );
}
