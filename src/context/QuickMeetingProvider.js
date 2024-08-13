import React, { useState } from 'react';
import QuickMeetingContext from './QuickMeetingContext';


const QuickMeetingProvider = ({ children }) => {
  const [audio, setAudio] = useState();
  const [video, setVideo] = useState();
  const [visualEffects, setVisualEffects] = useState(false); 

 return (
    <QuickMeetingContext.Provider value={{ audio, setAudio, video, setVideo,  visualEffects, setVisualEffects }}>
      {children}
    </QuickMeetingContext.Provider>
  );
};
export default QuickMeetingProvider;
