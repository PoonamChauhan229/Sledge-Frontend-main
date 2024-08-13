import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HMSRoomProvider } from "@100mslive/react-sdk";
import App from './App';
import QuickMeetingProvider from './context/QuickMeetingProvider';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
<>
    <HMSRoomProvider>
      <QuickMeetingProvider>
    

      <App />
  
      </QuickMeetingProvider>
    </HMSRoomProvider>
</>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
