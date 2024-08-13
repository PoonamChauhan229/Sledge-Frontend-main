import { Login } from "./components/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SignUp } from "./components/Signup";
import Blog from "./components/LandingPage/Landingpage";
import Forgetpassword from "./components/Forgetpassword";
import Resetpassword from "./components/Resetpassword";
import OnBoarding from "./components/Onboarding";
import HostEvents from "./components/HomeScreen/HostEvents";
import Createpost from "./components/HomeScreen/Post";
import QuickMeet from "./components/HomeScreen/QuickMeeting";
import SettingDashboard from "./components/HomeScreen/Settings/SettingDashboard";
import AdCampaign from "./components/HomeScreen/Settings/AdCampaign";
import { useEffect, useState } from "react";
import JoinForm from "./components/HomeScreen/QuickMeetingCall/JoinForm";
import firebase from "firebase/app";
import "firebase/messaging";
import { Firestore } from "firebase/firestore";
import Profile from "./components/HomeScreen/Profile/Profile";
import SledgeHome from "./components/HomeScreen/SledgeHome";
import ChatStream from "./components/HomeScreen/LiveChat/ChatStream";
import ProfileSetting from "./components/HomeScreen/Profile/ProfileSetting/ProfileSetting";
import EventReg from "./components/HomeScreen/Event_Reg";
import JoinEvent from "./components/HomeScreen/Join_Event";
import HostEventsHome from "./components/HomeScreen/HostEventsHome";
import PrevCampaign from "./components/HomeScreen/Settings/PrevCampaign";
import Fileviolation from "./components/HomeScreen/Settings/FileViolation";
import StartQuickMeeting from "./components/HomeScreen/QuickMeetingCall/StartQuickMeeting";
import EditProfile from "./components/HomeScreen/Profile/EditProfile/EditProfile";
// import VideoCallPage from './components/HomeScreen/QuickMeetingCall/VideoCallPage';

const firebaseConfig = {
  apiKey: "AIzaSyB-mPucwnrp-dnxkxz5Mi-SXmp6NL8KxHQ",
  authDomain: "silver-lynx-924d4.firebaseapp.com",
  projectId: "silver-lynx-924d4",
  storageBucket: "silver-lynx-924d4.appspot.com",
  messagingSenderId: "929076354382",
  appId: "1:929076354382:web:2150bfd349953b37f8521f",
  measurementId: "G-HW4H5YQPKV",
};

// Room code of Manju mishra: icy-flhs-npx

//Initialize Firebase
// firebase.initializeApp(firebaseConfig);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("isLoggedIn");
    console.log("print", loggedIn)
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    sessionStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleSignUp = () => {
    sessionStorage.setItem("isLoggedIn", "true");
    setIsSignedUp(true);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={isLoggedIn ? <Navigate to="/home" /> : <Blog />} /> */}
          <Route
            path="/"
            element={<Login onLogin={handleLogin} />}
          />
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/home" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isSignedUp ? (
                <Navigate to="/onboarding" />
              ) : (
                <SignUp onSignup={handleSignUp} />
              )
            }
          />
          <Route
            path="/onboarding"
            element={
              isSignedUp ? <OnBoarding /> : <Login onLogin={handleLogin} />
            }
          />
          <Route path="/forgetpassword" element={<Forgetpassword />} />
          <Route path="/resetpassword" element={<Resetpassword />} />
          <Route
            path="/home"
            element={
              isLoggedIn ? <SledgeHome /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/hosteventshome"
            element={
              isLoggedIn ? <HostEventsHome /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/hostevents"
            element={
              isLoggedIn ? <HostEvents /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/join-event/:postId"
            element={
              isLoggedIn ? <JoinEvent /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/event-reg"
            element={
              isLoggedIn ? <EventReg /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/createpost"
            element={
              isLoggedIn ? <Createpost /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/quickmeeting"
            element={
              isLoggedIn ? <QuickMeet /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/settings"
            element={
              isLoggedIn ? (
                <SettingDashboard />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/adcampaign"
            element={
              isLoggedIn ? <AdCampaign /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/fileviolation"
            element={
              isLoggedIn ? <Fileviolation /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/prevcampaign"
            element={
              isLoggedIn ? <PrevCampaign /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/joinform"
            element={
              isLoggedIn ? <JoinForm /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/profile"
            element={isLoggedIn ? <Profile /> : <Login onLogin={handleLogin} />}
          />
          {/* <Route path="/video-call" element={<VideoCallPage />} /> */}
          <Route
            path="/chatstream"
            element={
              isLoggedIn ? <ChatStream /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="profilesetting"
            element={
              isLoggedIn ? <ProfileSetting /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/startmeeting/:room_code"
            element={
              isLoggedIn ? (
                <StartQuickMeeting />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/edit-profile"
            element={
              isLoggedIn ? <EditProfile /> : <Login onLogin={handleLogin} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
