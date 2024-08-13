import { backgrounds } from "./plugins/VB/vbutils";
import { Button, Drawer, Grid, Modal, styled } from "@mui/material";
import { Dispatch, SetStateAction, useCallback, useRef } from "react";
import QuickMeetingContext from "../../../context/QuickMeetingContext";
import { useContext, useState } from "react";
import MuiDrawer from "@mui/material/Drawer";
import { HMSVirtualBackgroundTypes } from "@100mslive/hms-virtual-background";
import useVB from "./plugins/VB/useVB";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

interface VirtualBackground {
  background: string;
  backgroundType: HMSVirtualBackgroundTypes;
}

export default function CustomizedDrawer({ open, setOpen }: Props) {
  const { toggleVB } = useVB();
  const {setVisualEffects} = useContext(QuickMeetingContext);
  const selectedImage = useRef<(HTMLImageElement | HTMLVideoElement) | null>(null);
  
  const submitVB = () => {
    const vb = {
      background: selectedImage.current?.src,
      backgroundType:
        selectedImage.current?.tagName === "IMG"
          ? HMSVirtualBackgroundTypes.IMAGE
          : HMSVirtualBackgroundTypes.VIDEO,
    };
      toggleVB(vb);
      setVisualEffects((prev: any)=> !prev)
  };

  const selectVB = (e: React.MouseEvent<HTMLImageElement | HTMLVideoElement>) => {
      const vb = {
        background: e.currentTarget.src,
        backgroundType:
          e.currentTarget.tagName === "IMG"
            ? HMSVirtualBackgroundTypes.IMAGE
            : HMSVirtualBackgroundTypes.VIDEO,
      };
      selectedImage.current = e.currentTarget;
      console.log(document.querySelector(".selectedVB"))
      document.querySelector(".selectedVB")?.classList.remove("selectedVB");
      selectedImage.current.classList.add("selectedVB");
    };


  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      backgroundColor: "#111111",
      position: "relative",
      whiteSpace: "nowrap",
      width: "300px",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        color: "#fff",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
  }));

  

  console.log("re-render");
  return (
    <Drawer variant="permanent" open={open} anchor="right">
      <Grid container spacing={1} sx={{ marginTop: "3rem" }}>
        {backgrounds.map((background) => (
          <Grid item xs={6} md={6} lg={6} key={background.url}>
            {background.type === "image" ? (
            <img src={background.url} alt="background" width="100px" style={{borderRadius: "20px", cursor: "pointer"}} onClick={selectVB} />
        ) : (
            <video
            src={background.url}
            autoPlay
            muted
            playsInline
            width="100px"
            style={{borderRadius: "20px", cursor: "pointer"}}
            onClick={selectVB}
            />)}
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" sx={{ marginTop: "2rem" }} onClick={submitVB}>
        Submit
      </Button>
    </Drawer>
  );
}
