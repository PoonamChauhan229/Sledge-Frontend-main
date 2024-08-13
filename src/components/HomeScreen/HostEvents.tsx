import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Checkbox,
  FormControlLabel,
  Switch,
  TextField,
  MenuItem,
  Select,
  SelectChangeEvent,
  Dialog,
  DialogContent,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { Link, useNavigate } from "react-router-dom";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import axios, { AxiosRequestConfig } from "axios";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import IconButton from "@mui/material/IconButton";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, color: "#fff" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const typoValues = [
  "Event Details",
  "Schedule",
  "Permission for tools",
  "Payment Settings",
];
export default function HostEvents() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [notification, setNotification] = React.useState("Email");
  const [minutes, setMinutes] = React.useState("Add Mins");
  const [eventData, setEventData] = React.useState({
    title: "",
    description: "",
    instructions: "",
    start_date: dayjs(),
    end_date: dayjs(),
    members: [],
    file_sharing: true,
    one_to_one_chat: true,
    recording: false,
    event_language: "",
    audience_size: "",
    event_industry: "",
    documents: [],
    alerts_reminder: 0,
    alert_type: "Email",
    fee_per_audience: 0,
    audience_fees: 0,
    taxes: 0,
    platform_charges: 0,
  });
  const [isAttachClicked, setIsAttachClicked] = React.useState(false);
  const [isDropDownClicked, setIsDropDownClicked] = React.useState(true);
  const [fileName, setFileName] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);
  const [isAttachButtonClicked, setIsAttachButtonClicked] =
    React.useState(false);
  const [uplodaData, setUploadData] = React.useState({
    pic: "",
  });
  const [titleMsg, setTitleMsg] = React.useState("");
  const [scheduleMsg, setScheduleMsg] = React.useState("");
  const [resMsg, setResMsg] = React.useState("");
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleNext = () => {
    if (validateFormData()) {
      if (value < 3) {
        handleChange({} as React.SyntheticEvent, value + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (value > 0) {
      handleChange({} as React.SyntheticEvent, value - 1);
    }
  };

  const handleAttachClick = () => {
    setIsAttachClicked(true);
    setIsDropDownClicked(false);
  };

  const handleDropDownClick = () => {
    setIsAttachClicked(false);
    setIsDropDownClicked(true);
  };

  const handleAttachButtonClick = () => {
    setIsAttachButtonClicked(true);
    setIsDropDownClicked(false);
  };

  const handleFileUpload = async () => {
    // const { file } = uplodaData;
    if (!file) {
      // handleSnackbarOpen("Please select a file", 'error');
      setResMsg("Please Select file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    const fileName = file?.name;
    try {
      const config: AxiosRequestConfig<any> = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      };
      let payload = {
        file_name: fileName,
        pic: file,
      };

      const response = await axios
        .post("http://65.0.19.86:8000/User/upload_attachment", payload, config)
        .then((res: any) => {
          console.log("response Data image url", res.data);
          // handleSnackbarOpen("File Uploaded Successfully", 'success');
          localStorage.setItem("image_url", res.data.data.image_url);
        });
      setUploadedFiles([...uploadedFiles, file]);
      setIsAttachButtonClicked(false);
      setFile(null);
      setFileName("");
    } catch (error: any) {
      let errorResponse = error.response.data.message;
      // Handle Axios errors
      console.error("Upload failed....", errorResponse);
      // handleSnackbarOpen(errorResponse, 'error');
    }
  };

  const notificationOptions = ["Email", "Sledge", "Both"];
  const minutesOptions = [
    "Add Mins",
    "5 mins",
    "10 mins",
    "15 mins",
    "20 mins",
    "30 mins",
    "1 hour",
    "2 hours",
    "3 hours",
    "6 hours",
    "12 hours",
  ];

  const handleNotificationChange = (event: SelectChangeEvent) => {
    setNotification(event.target.value);
  };

  const handleMinutesChange = (event: SelectChangeEvent) => {
    setMinutes(event.target.value);
  };
  const userInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateFormData = () => {
    const {
      title,
      members,
      start_date,
      end_date,
      file_sharing,
      one_to_one_chat,
      recording,
    } = eventData;
    console.log("valuee...", value);
    if (value === 0) {
      if (!title) {
        setTitleMsg("Title field can't be empty");
        console.log("setTitlemsg....", titleMsg);
        return false;
      }
    }
    if (value === 1) {
      console.log("members length", members.length);
      if (!members.length && !start_date.isValid() && !end_date.isValid()) {
        setScheduleMsg("Mandatory fields are required.");
        console.log("schedule msg....", scheduleMsg);
        return false;
      }
    }
    if (value === 2) {
      if (!file_sharing && !one_to_one_chat) {
        setResMsg(
          "Please ensure that both file sharing and one-to-one chat are enabled."
        );
        console.log("resmsg/....", resMsg);
        return false;
      }
    }
    return true;
  };

  const handleStartDateChange = (date: any) => {
    setEventData((prevState) => ({
      ...prevState,
      start_date: date,
    }));
  };

  const handleEndDateChange = (date: any) => {
    setEventData((prevState) => ({
      ...prevState,
      end_date: date,
    }));
  };

  const handleCreateEvent = () => {
    if (validateFormData()) {
      const config: AxiosRequestConfig<any> = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const membersArray = Array.isArray(eventData.members)
        ? eventData.members
        : [];
      const { title, description, start_date, end_date } = eventData;
      let payload = {
        title,
        description: "this is testing",
        start_date: start_date.format(), // Format start_date as string
        end_date: end_date.format(), // Format end_date as string
        members: membersArray,
        file_sharing: true,
        one_to_one_chat: true,
        recording: true,
        documents: [
          { file_name: "testing", url: localStorage.getItem("image_url") },
        ],
        instructions: "empty",
        event_language: false,
        audience_size: "100",
        event_industry: "none",
        alerts_reminder: 0,
        alert_type: "Email",
        fee_per_audience: 0,
        audience_fees: 0,
        taxes: 0,
        platform_charges: 0,
      };

      axios
        .post("http://65.0.19.86:8000/Post/create_event", payload, config)
        .then((res: any) => {
          console.log("event host data.....", res.data);
          navigate(`/join-event?post_id=${res.data.data.post_id}`, {
            state: { events: res.data.data },
          });
        });
    }
  };
  return (
    <div className="hostevents" style={{ overflowY: "auto", height: "100vh" }}>
      <Box sx={{ width: "50%", backgroundColor: "#1B1B1B", margin: "auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#000",
            padding: "20px",
          }}
        >
          <Typography sx={{ textAlign: "center", margin: "3% auto 0 auto" }}>
            <Link
              to="/hosteventshome"
              style={{ color: "#FFFFFFCC", textDecoration: "none" }}
            >
              <ArrowBackIosIcon />
            </Link>
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: "#fff", textAlign: "center", flex: "1" }}
          >
            Hosting Events
          </Typography>
        </div>
        <Box sx={{ borderBottom: 1 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
            sx={{ "& .MuiTabs-indicator": { display: "none" } }}
          >
            <Tab
              sx={{
                color: "#fff !important",
                textTransform: "capitalize",
                backgroundColor: value === 0 ? "#1B1B1B" : "#000",
              }}
              label="Event Details"
              {...a11yProps(0)}
            />
            <Tab
              sx={{
                color: "#fff !important",
                textTransform: "capitalize",
                backgroundColor: value === 1 ? "#1B1B1B" : "#000",
              }}
              label="Schedule"
              {...a11yProps(1)}
            />
            <Tab
              sx={{
                color: "#fff !important",
                textTransform: "capitalize",
                backgroundColor: value === 2 ? "#1B1B1B" : "#000",
              }}
              label="Permission for tools"
              {...a11yProps(2)}
            />
            <Tab
              sx={{
                color: "#fff !important",
                textTransform: "capitalize",
                backgroundColor: value === 3 ? "#1B1B1B" : "#000",
              }}
              label="Payment Settings"
              {...a11yProps(3)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div>
            <label>Topic</label>
            <TextField
              fullWidth
              size="small"
              name="title"
              value={eventData.title}
              onChange={userInputChange}
              placeholder="Topic of Meeting"
              sx={{
                backgroundColor: "#FFFFFF33",
                color: "#fff",
                borderRadius: "25px",
                marginBottom: "3%",
                border: "1px solid #ccc",
                marginTop: "1%",
              }}
            />
            {titleMsg && (
              <Typography variant="body2" color="red" sx={{ mb: 2 }}>
                {titleMsg}
              </Typography>
            )}
            <label>Description</label>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={eventData.description}
              onChange={userInputChange}
              size="small"
              placeholder="Add the Event Description"
              sx={{
                backgroundColor: "#FFFFFF33",
                color: "#fff",
                borderRadius: "25px",
                marginBottom: "3%",
                border: "1px solid #ccc",
                marginTop: "1%",
              }}
              name="description"
            />
            <label>Language</label>
            <TextField
              fullWidth
              name="event_language"
              value={eventData.event_language}
              onChange={userInputChange}
              size="small"
              placeholder="Language in which meeting is going to held"
              sx={{
                backgroundColor: "#FFFFFF33",
                color: "#fff",
                borderRadius: "25px",
                marginBottom: "3%",
                border: "1px solid #ccc",
                marginTop: "1%",
              }}
            />
            <label>Audience Size</label>
            <TextField
              fullWidth
              name="audience_size"
              value={eventData.audience_size}
              onChange={userInputChange}
              size="small"
              placeholder="500 Members"
              sx={{
                backgroundColor: "#FFFFFF33",
                color: "#fff",
                borderRadius: "25px",
                marginBottom: "3%",
                border: "1px solid #ccc",
                marginTop: "1%",
              }}
            />
            <label>Event Industry</label>
            <TextField
              fullWidth
              name="event_industry"
              value={eventData.event_industry}
              onChange={userInputChange}
              size="small"
              placeholder="Which industry this event belongs?"
              sx={{
                backgroundColor: "#FFFFFF33",
                color: "#fff",
                borderRadius: "25px",
                marginBottom: "3%",
                border: "1px solid #ccc",
                marginTop: "1%",
              }}
            />
            {/* <label>Instruction to the joiners (optional)</label>
                        <TextField fullWidth size='small' placeholder={`Add the Instruction in Points \n 1.For the Joinees \n 2.While they join the meet`} sx={{ backgroundColor: "#FFFFFF33", color: "#fff", borderRadius: "25px", marginBottom: "3%", border: "1px solid #ccc", marginTop: "1%" }} /> */}
            <Typography
              variant="h6"
              sx={{
                color: "#fff",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Instruction to the joinees(optional)</span>
              <span>
                <AttachFileIcon
                  onClick={handleAttachClick}
                  style={{ cursor: "pointer" }}
                />
                <KeyboardArrowDownIcon
                  style={{ cursor: "pointer" }}
                  onClick={handleDropDownClick}
                />
              </span>
            </Typography>
            {isAttachClicked && (
              <>
                <Button
                  fullWidth
                  sx={{
                    backgroundColor: "#FFFFFF33",
                    color: "#fff",
                    borderRadius: "25px",
                    marginBottom: "3%",
                    border: "1px solid #ccc",
                    marginTop: "1%",
                  }}
                  onClick={handleAttachButtonClick}
                >
                  Upload File
                </Button>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#FFFFFF33",
                        color: "#fff",
                        padding: "5px 10px",
                        borderRadius: "20px",
                        marginBottom: "3%",
                      }}
                    >
                      {/* <AttachFileIcon /> */}
                      <span>{file.name}</span>
                      <span
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                        onClick={() =>
                          setUploadedFiles(
                            uploadedFiles.filter((_, i) => i !== index)
                          )
                        }
                      >
                        &times;
                      </span>
                      <a
                        href={URL.createObjectURL(file)}
                        download={file.name}
                        style={{
                          marginLeft: "10px",
                          color: "#fff",
                          textDecoration: "none",
                        }}
                      >
                        <FileDownloadOutlinedIcon />
                      </a>
                    </div>
                  ))}
                </div>
              </>
            )}
            {isAttachButtonClicked && (
              <Dialog
                open={isAttachButtonClicked}
                onClose={() => setIsAttachButtonClicked(false)}
              >
                <DialogContent>
                  <h2>Upload Files</h2>
                  <input
                    type="file"
                    // accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        setFile(files[0]);
                      }
                    }}
                    // onChange={(e)=>handleFileUpload(e)}
                  />
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "20px",
                    }}
                  >
                    <Button
                      sx={{
                        color: "blue",
                        borderRadius: "180px",
                        backgroundColor: "blanchedalmond",
                        border: "1px solid #ccc",
                      }}
                      onClick={handleFileUpload}
                    >
                      Upload
                    </Button>
                    <IconButton
                      sx={{
                        border: "1px solid #ccc",
                        color: "black",
                        borderRadius: "180px",
                        backgroundColor: "lightblue",
                      }}
                      onClick={() => setIsAttachButtonClicked(false)}
                      size="small"
                    >
                      Cancel
                    </IconButton>
                  </span>
                </DialogContent>
              </Dialog>
            )}
            {isDropDownClicked && (
              <TextField
                fullWidth
                multiline
                rows={3}
                size="small"
                placeholder={
                  "Add the Instruction in Points \n 1. For the Joinees \n 2. While they join the meet"
                }
                sx={{
                  backgroundColor: "#FFFFFF33",
                  color: "#fff",
                  borderRadius: "25px",
                  marginBottom: "3%",
                  border: "1px solid #ccc",
                  marginTop: "1%",
                }}
                value={eventData.description}
                name="instructions"
                onChange={userInputChange}
              />
            )}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "transparent",
                  borderRadius: "25px",
                  border: "1px solid #ccc",
                }}
                onClick={() => navigate("/home")}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                className="next-button"
                onClick={handleNext}
              >
                Next
              </Button>
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Typography variant="h6" sx={{ color: "#fff" }}>
            Schedule
          </Typography>
          <div style={{ display: "flex" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={eventData.start_date}
                onChange={handleStartDateChange}
                sx={{
                  backgroundColor: "#FFFFFF33",
                  color: "#fff",
                  borderRadius: "25px",
                  marginBottom: "3%",
                  margin: 2,
                }}
              />
              <TimePicker
                value={eventData.start_date}
                onChange={handleStartDateChange}
                sx={{
                  backgroundColor: "#FFFFFF33",
                  color: "#fff",
                  borderRadius: "25px",
                  marginBottom: "3%",
                  margin: 2,
                }}
              />
              <TimePicker
                value={eventData.end_date}
                onChange={handleEndDateChange}
                sx={{
                  backgroundColor: "#FFFFFF33",
                  color: "#fff",
                  borderRadius: "25px",
                  marginBottom: "3%",
                  margin: 2,
                }}
              />
            </LocalizationProvider>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" sx={{ color: "#fff" }}>
              Notification
            </Typography>
            <Typography variant="h6" sx={{ color: "#fff" }}>
              + Add
            </Typography>
          </div>

          <div style={{ display: "flex", gap: "20px" }}>
            <Select
              fullWidth
              sx={{
                backgroundColor: "#FFFFFF33",
                color: "#fff",
                borderRadius: "25px",
                marginBottom: "3%",
                marginTop: "2%",
                border: "1px solid #ccc",
              }}
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={notification}
              label="Select"
              onChange={handleNotificationChange}
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: "#333333",
                    border: "1px solid #ccc",
                    borderRadius: "15px",
                    color: "lightgrey",
                    marginTop: "0.5%",
                  },
                },
              }}
            >
              {notificationOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            <Select
              fullWidth
              sx={{
                backgroundColor: "#FFFFFF33",
                color: "#fff",
                borderRadius: "25px",
                marginBottom: "3%",
                marginTop: "2%",
                border: "1px solid #ccc",
              }}
              labelId="demo-select-small-label"
              id="demo-select-small1"
              value={minutes}
              label="Select"
              onChange={handleMinutesChange}
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: "#333333",
                    border: "1px solid #ccc",
                    borderRadius: "15px",
                    color: "lightgrey",
                    marginTop: "0.5%",
                  },
                },
              }}
            >
              {minutesOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </div>
          <FormControlLabel
            required
            control={<Checkbox />}
            label="Notify All Audience"
          />
          {scheduleMsg && (
            <Typography variant="body2" color="red" sx={{ mb: 2 }}>
              {scheduleMsg}
            </Typography>
          )}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "transparent",
                borderRadius: "25px",
                border: "1px solid #ccc",
              }}
              onClick={handlePrevious}
            >
              Back
            </Button>
            <Button
              variant="contained"
              className="next-button"
              onClick={handleNext}
            >
              Next
            </Button>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Typography variant="h6" sx={{ color: "#fff" }}>
            Permission for tools
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              margin: "10px",
              justifyContent: "space-around",
            }}
          >
            {/* <FormControlLabel control={<Switch defaultChecked />} label="1 - 1 Chat" sx={{ color: "#fff", marginBottom: "3%", margin: 2, }} />
                        <FormControlLabel control={<Switch defaultChecked color='primary' />} label="File Sharing" sx={{ color: "#fff", marginBottom: "3%", margin: 2 }} />
                        <FormControlLabel control={<Switch color='primary' />} label="Record" sx={{ color: "#fff", marginBottom: "3%", margin: 2 }} /> */}
            <div style={{ marginBottom: "3%" }}>
              <label className="switch">
                <input defaultChecked type="checkbox" />
                <span className="slider round"></span>
              </label>
              <span style={{ color: "#fff", marginLeft: "10px" }}>
                1-1 Chat
              </span>
            </div>
            <div style={{ marginBottom: "3%" }}>
              <label className="switch">
                <input defaultChecked type="checkbox" />
                <span className="slider round"></span>
              </label>
              <span style={{ color: "#fff", marginLeft: "10px" }}>
                File Sharing
              </span>
            </div>
            <div style={{ marginBottom: "3%" }}>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
              <span style={{ color: "#fff", marginLeft: "10px" }}>
                Recording
              </span>
            </div>
          </div>
          {resMsg && (
            <Typography variant="body2" color="red" sx={{ mb: 2 }}>
              {resMsg}
            </Typography>
          )}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "transparent",
                borderRadius: "25px",
                border: "1px solid #ccc",
              }}
              onClick={handlePrevious}
            >
              Back
            </Button>
            <Button
              variant="contained"
              className="next-button"
              onClick={handleNext}
            >
              Next
            </Button>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <Typography variant="h6" sx={{ color: "#fff" }}>
            Payment Options
          </Typography>
          <div style={{ display: "flex", marginTop: "10px" }}>
            <div>
              <label>Fee per audience</label>
              <TextField
                fullWidth
                size="small"
                placeholder="1300"
                sx={{
                  backgroundColor: "#FFFFFF33",
                  color: "#fff",
                  borderRadius: "25px",
                  marginBottom: "3%",
                }}
              />
            </div>
            <div>
              <Typography>Full Billing Part</Typography>
              <div style={{ display: "flex", marginLeft: "25px" }}>
                <div>
                  <p>Audience Fee :</p>
                  <p>Taxes :</p>
                  <p>Platform Charges :</p>
                  <p>Total Charges :</p>
                </div>
                <div>
                  <p>1300</p>
                  <p>1300</p>
                  <p>1300</p>
                  <p>1300</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "transparent", borderRadius: "25px" }}
              onClick={handlePrevious}
            >
              Back
            </Button>
            <Button
              variant="contained"
              className="next-button"
              onClick={handleCreateEvent}
            >
              Host
            </Button>
          </div>
        </CustomTabPanel>
      </Box>
    </div>
  );
}
