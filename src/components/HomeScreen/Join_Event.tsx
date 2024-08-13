import React, { useState, useEffect, useRef } from "react";
import axios, { AxiosRequestConfig } from "axios";
import {
  Button,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  styled,
  Paper,
} from "@mui/material";
import RegisterImg from "../../assets/meeting-girl.png";
import { ReactComponent as Recorder } from "../../assets/recorder.svg";
import { ReactComponent as InviteMember } from "../../assets/Invite-member.svg";
import { ReactComponent as CopyInvite } from "../../assets/copy-invitaion.svg";
import { ReactComponent as Mike } from "../../assets/mike.svg";
import { ReactComponent as Mute } from "../../assets/MuteMike.svg";
import { ReactComponent as VideoOff } from "../../assets/videoOFF.svg";
import { useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link, useNavigate } from "react-router-dom";
import { useHMSActions } from "@100mslive/react-sdk";
import QuickMeetingContext from "../../context/QuickMeetingContext";
import { useContext } from "react";
import CustomizedDrawer from "./QuickMeetingCall/CustomizedDrawer";
import VirtualBackground from "./QuickMeetingCall/plugins/VB/VB";

const JoinEvent: React.FC = () => {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [visualEffects, setVisualEffects] = useState(false);
  const [meetingDetails, setMeetingDetails] = useState<any>(null);
  const { postId } = useParams();
  const { setAudio, setVideo } = useContext(QuickMeetingContext);

  const [inviteEmail, setInviteEmail] = React.useState("");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [invitees, setInvitees] = useState<string[]>([]);
  const [selectedInvitees, setSelectedInvitees] = useState<string[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const navigate = useNavigate();
  const config: AxiosRequestConfig<any> = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const hostName = meetingDetails?.created_by;
  const startTime = new Date(meetingDetails?.start_date).getTime();
  const now = new Date().getTime();
  const diffInMinutes = Math.max(Math.floor((startTime - now) / 6000), 0);
  const hours = Math.floor(diffInMinutes / 60);
  const minutes = diffInMinutes % 60;
  const timeToStart = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}`;
  const [emailDropdown, setEmailDropdown] = React.useState<string[]>([]);
  const [selectedEmail, setSelectedEmail] = React.useState<string | null>("");
  const [finalEmailsList, setFinalEmailsList] = React.useState<
    (string | null)[]
  >([]);
  const [searchVal, setSearchVal] = React.useState("");

  const CustomPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: "#333333",
    border: "1px solid #ccc",
    borderRadius: "15px",
    color: "lightgrey",
    marginTop: "0.5%",
  }));

  const openVisualEffectsDrawer = () => {
    setVisualEffects((prev) => !prev);
  };

  useEffect(() => {
    const startMediaStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setMediaStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    };

    startMediaStream();
    setIsAudioOn(false);
    setIsVideoOn(false);

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // const postType = prop1 ? prop1.post_type : events.post_type;
  useEffect(() => {
    console.log("post id", postId);
    const fetchMeetingDetails = async () => {
      try {
        const response = await axios
          .get(
            `http://65.0.19.86:8000/Post/get_quick_meeting_details?post_id=${postId}`,
            config
          )
          .then((res: any) => {
            setMeetingDetails(res.data.data);
            console.log("meeting details", res.data.data);
          });
      } catch (error) {
        console.error("Error fetching meeting details:", error);
      }
    };

    fetchMeetingDetails();
  }, []);

  const handleToggleAudio = () => {
    if (mediaStream) {
      mediaStream
        .getAudioTracks()
        .forEach((track) => (track.enabled = !track.enabled));
      setIsAudioOn((prev) => !prev);
      console.log("audio", isAudioOn);
    }
  };

  const handleToggleVideo = async () => {
    if (mediaStream) {
      if (isVideoOn) {
        // Turn off video
        mediaStream.getVideoTracks().forEach((track) => {
          track.stop();
          track.enabled = false;
        });
        setIsVideoOn(false);
        console.log("video", isVideoOn);
      } else {
        // Turn on video
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          const videoTrack = stream.getVideoTracks()[0];
          mediaStream.addTrack(videoTrack);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
          setIsVideoOn(true);
          console.log("video", isVideoOn);
        } catch (error) {
          console.error("Error accessing video stream.", error);
        }
      }
    }
  };

  const calculateDuration = (end: string, start: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const duration = endDate.getTime() - startDate.getTime();
    const durationMinutes = Math.floor(duration / 60000);
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    return `${hours}h ${minutes}m`;
  };
  const duration = calculateDuration(
    meetingDetails?.end_date,
    meetingDetails?.start_date
  );

  if (!meetingDetails) {
    return (
      <Typography variant="h5" sx={{ color: "#fff", textAlign: "center" }}>
        Loading...
      </Typography>
    );
  }

  const copyInvitationLink = () => {
    const url = `${window.location.origin}/join-event?post_id=${postId}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Invitation link copied to clipboard:");
      })
      .catch((error) => {
        console.error("Failed to copy invitation link:", error);
      });
  };

  const handleInviteModelOpen = () => {
    fetchInvitees();
    setShowInviteModal(true);
  };
  const handleInviteModalClose = () => {
    setShowInviteModal(false);
  };

  const handleInviteMembers = async () => {
    let membersArray: any[] = [];

    const config: AxiosRequestConfig<any> = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    console.log("Final Email List", finalEmailsList);
    for (let email of finalEmailsList) {
      let payload = {
        email: email,
      };

      axios
        .post("http://65.0.19.86:8000/User/search_users", payload, config)
        .then((res: any) => {
          const users = [...res.data.data];
          membersArray.push(users.map((user) => user._id)[0]);
        })
        .catch((error) => {
          console.error("Error fetching users", error);
        });
    }
    console.log("membersArray", membersArray);
    const data = {
      post_id: postId,
      members: membersArray,
    };
    try {
      const response = await axios.post(
        "http://65.0.19.86:8000/Post/add_quick_meeting_participants",
        data,
        config
      );
      if (response.status === 200) {
        alert(response.data.data);
      } else {
        console.error("Error inviting members:", response);
      }
    } catch (error) {
      console.error("Error inviting members:", error);
    }
    setShowInviteModal(false);
    setSelectedEmails([]);
  };

  const fetchInvitees = async () => {
    const payload = {
      email: "rakhi@gmail.com",
    };
    try {
      await axios
        .post(`http://65.0.19.86:8000/User/search_users`, payload, config)
        .then((res) => {
          console.log("email response..", res.data);
          // setInvitees(res.data.data);
        });
    } catch (error) {
      console.error("Error fetching invitees:", error);
    }
  };

  const handleCheckboxChange = (email: string) => {
    setSelectedEmails((prevSelectedEmails) =>
      prevSelectedEmails.includes(email)
        ? prevSelectedEmails.filter((e) => e !== email)
        : [...prevSelectedEmails, email]
    );
  };
  const descriptionArray = meetingDetails.description.split("\n");

  const handleJoinNow = async () => {
    setAudio(isAudioOn);
    setVideo(isVideoOn);
    try {
      let payload = {
        post_id: postId,
      };
      await axios
        .post("http://65.0.19.86:8000/Post/join_quick_meeting", payload, config)
        .then(async (res: any) => {
          console.log("event host data.....", res.data);
          navigate(`/startmeeting/${res.data.data.room_code}`, {
            state: {
              hostData: meetingDetails, // Pass any additional data you need
            },
          });
        });
    } catch (error) {
      console.error("Error joining the meeting:", error);
    }
  };

  const searchUser = (
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    setSearchVal(value);
    const config: AxiosRequestConfig<any> = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    let payload = {
      email: searchVal,
    };

    axios
      .post("http://65.0.19.86:8000/User/search_users", payload, config)
      .then((res: any) => {
        const users = [...res.data.data];
        let newEmailList = users.map((user) => user.email);
        setEmailDropdown(newEmailList || []);
      })
      .catch((error) => {
        console.error("Error fetching users", error);
      });
  };

  return (
    <Grid
      container
      sx={{
        color: "#fff",
        padding: "2rem 5rem",
        display: "flex",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Grid item xs={7} sx={{ padding: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ marginLeft: "10px", display: "flex" }}>
            <Typography>
              <Link
                to="/home"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                <ArrowBackIosIcon />
              </Link>
            </Typography>
            <div style={{ marginLeft: "20px" }}>
              <p style={{ margin: 0, color: "gray" }}>Topic</p>
              <h3 style={{ margin: 0 }}>{meetingDetails?.title}</h3>
            </div>
          </div>
          <div>
            <p style={{ margin: 0, color: "gray" }}>Duration</p>
            <h3 style={{ margin: 0 }}>{"1 Hour" || "N/A"}</h3>
          </div>
        </div>
        <div className="image-container">
          {isVideoOn ? (
            <video
              ref={videoRef}
              autoPlay
              style={{ width: "100%", borderRadius: "10px", margin: "5px" }}
            />
          ) : (
            <img
              src={RegisterImg}
              alt="registering girl"
              style={{ width: "100%", borderRadius: "10px", margin: "5px" }}
            />
          )}

          <div className="overlay">
            <p>{hostName?.name}</p>
            <p>
              Starts In:
              <span style={{ color: "#01e5d4" }}> {timeToStart} </span> Mins
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
            height: "50px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              onClick={handleToggleAudio}
              sx={{
                marginRight: "5px",
                textTransform: "capitalize",
                color: "#fff",
              }}
            >
              {isAudioOn ? <Mike height="50px" /> : <Mute height="50px" />}
            </Button>
            <Button
              onClick={handleToggleVideo}
              sx={{
                marginLeft: "5px",
                textTransform: "capitalize",
                color: "#fff",
              }}
            >
              {isVideoOn ? (
                <Recorder height="50px" />
              ) : (
                <VideoOff height="50px" />
              )}
            </Button>
            <Button
              variant="outlined"
              sx={{
                marginLeft: "5px",
                textTransform: "capitalize",
                color: "#4B70F5",
              }}
              onClick={openVisualEffectsDrawer}
            >
              VB
            </Button>
          </div>
          <Button
            className="reg-button"
            variant="contained"
            onClick={handleJoinNow}
          >
            Join Now
          </Button>
        </div>
        <h4 style={{ margin: "10px" }}>
          Waiting for host to start the Event...
        </h4>
        <div className="instruct">
          <p style={{ margin: 0, color: "gray" }}>Instruction:</p>
          {descriptionArray ? (
            descriptionArray.map((instruction: string, index: number) => (
              <Typography key={index} variant="h6" sx={{ fontSize: "15px" }}>
                {instruction}
              </Typography>
            ))
          ) : (
            <Typography variant="h6" sx={{ fontSize: "15px" }}>
              No instructions available
            </Typography>
          )}
        </div>
        <div style={{ display: "flex", marginTop: "10px" }}>
          <Button
            variant="outlined"
            sx={{
              marginRight: "5px",
              textTransform: "capitalize",
              color: "#fff",
            }}
            onClick={copyInvitationLink}
            fullWidth
            startIcon={<CopyInvite height="40px" />}
          >
            Copy Invitation
          </Button>
          <Button
            variant="outlined"
            sx={{
              marginLeft: "5px",
              textTransform: "capitalize",
              color: "#fff",
            }}
            onClick={handleInviteModelOpen}
            fullWidth
            startIcon={<InviteMember height="40px" />}
          >
            Invite Members
          </Button>
        </div>
        <Dialog open={showInviteModal} onClose={handleInviteModalClose}>
          <DialogTitle>
            <InviteMember height="25px" />
            Invite Members
          </DialogTitle>
          <DialogContent>
            {/* <TextField
                            label="Email Address"
                            // variant="outlined"
                            value={inviteEmail}
                            onChange={(e) => setInviteEmail(e.target.value)}

                        /> */}
            <Autocomplete
              multiple
              id="tags-standard"
              options={emailDropdown}
              value={selectedEmails}
              inputValue={searchVal}
              isOptionEqualToValue={(option, value) => option === value}
              onInputChange={searchUser}
              onChange={(event, newValue) => {
                setSelectedEmails(newValue);
                if (newValue) {
                  setFinalEmailsList((prevState) => [
                    ...prevState,
                    newValue[newValue.length - 1],
                  ]);
                }
              }}
              PaperComponent={CustomPaper}
              sx={{
                width: "300px",
                backgroundColor: "#FFFFFF33",
                color: "#fff",
                borderRadius: "25px",
                border: "1px solid #ccc",
                marginBottom: "3%",
                marginTop: "1%",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "transparent",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#fff",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#fff",
                },
              }}
              renderInput={(params) => (
                <TextField
                  sx={{
                    "& .MuiInputBase-input::placeholder": {
                      color: "#ffff",
                    },
                    border: "hidden",
                  }}
                  {...params}
                  variant="standard"
                  label="Type Email..."
                  placeholder="Type"
                />
              )}
            />
            {invitees.map((email) => (
              <FormControlLabel
                key={email}
                control={
                  <Checkbox
                    checked={selectedEmails.includes(email)}
                    onChange={() => handleCheckboxChange(email)}
                    name={email}
                    color="primary"
                  />
                }
                label={email}
              />
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleInviteModalClose}>Cancel</Button>
            <Button onClick={handleInviteMembers} variant="contained">
              Send Invitation
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
      {visualEffects && (
        <CustomizedDrawer open={visualEffects} setOpen={setVisualEffects} />
      )}
    </Grid>
  );
};

export default JoinEvent;
