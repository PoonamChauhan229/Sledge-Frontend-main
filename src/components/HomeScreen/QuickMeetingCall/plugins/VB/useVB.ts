
import { HMSVirtualBackgroundTypes } from "@100mslive/hms-virtual-background";
import { useRef, useCallback } from "react";
import {
  useHMSStore,
  useHMSActions,
  selectIsLocalVideoPluginPresent,
} from "@100mslive/react-sdk";
import { HMSVBPlugin } from "@100mslive/hms-virtual-background";

export default function useVB() {
  const VB = useRef(
    new HMSVBPlugin(
      HMSVirtualBackgroundTypes.NONE,
      HMSVirtualBackgroundTypes.NONE
    )
  );
  const isVirtualBackgroundEnabled = useHMSStore(
    selectIsLocalVideoPluginPresent(VB.current.getName())
  );
  const hmsActions = useHMSActions();
  
  const changeBackground = useCallback(async (vb: { background: any; backgroundType: any; }) => {
    const { background, backgroundType } = vb;
    if (backgroundType === "video") {
      const video = document.createElement("video");
      video.src = background;
      await VB.current.setBackground(video, HMSVirtualBackgroundTypes.VIDEO);
    } else if (backgroundType === "image") {
      const img = document.createElement("img");
      img.src = background;
      await VB.current.setBackground(img, HMSVirtualBackgroundTypes.IMAGE);
    } else {
      await VB.current.setBackground(HMSVirtualBackgroundTypes.BLUR, HMSVirtualBackgroundTypes.BLUR);
    }
  }, []);
  
  const toggleVB = useCallback(async (vb: { background: any; backgroundType: any; }) => {
    try {
      if (!isVirtualBackgroundEnabled) {
        const pluginFrameRate = 15;
        await changeBackground(vb);
        await hmsActions.addPluginToVideoTrack(VB.current, pluginFrameRate);
      } else {
        await hmsActions.removePluginFromVideoTrack(VB.current);
        const pluginFrameRate = 15;
        await changeBackground(vb);
        await hmsActions.addPluginToVideoTrack(VB.current, pluginFrameRate);
      }
    } catch (error) {
      console.log("virtual background failure - ", error);
    }
  }, [isVirtualBackgroundEnabled, changeBackground, hmsActions]);
  
  return { toggleVB };
}
