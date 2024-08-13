import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  FormControlLabel,
  Input,
  Dialog,
  DialogContent,
  Switch,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  Autocomplete,
  colors,
  Popper,
  Paper,
} from "@mui/material";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import axios, { AxiosRequestConfig } from "axios";
import { CREATE_MEETING } from "../../apiEndpoints";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { styled } from "@mui/material/styles";

export default function QuickMeet() {
  const navigate = useNavigate();
  const [formValue, setFormValue] = React.useState({
    title: "",
    description: "",
    start_date: dayjs(), // Initialize start_date with a default value
    end_date: dayjs(), // Initialize end_date with a default value
    members: [],
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
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<
    "success" | "error" | "info" | "warning" | undefined
  >(undefined);
  const [minutes, setMinutes] = React.useState("Add Mins");
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
  const [emailDropdown, setEmailDropdown] = React.useState<string[]>([]);
  const [selectedEmail, setSelectedEmail] = React.useState<string | null>("");
  const [finalEmailsList, setFinalEmailsList] = React.useState<
    (string | null)[]
  >([]);
  const [searchVal, setSearchVal] = React.useState("");
  const [participants, setParticipants] = React.useState<string[]>([]);

  const CustomPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: "#333333",
    border: "1px solid #ccc",
    borderRadius: "15px",
    color: "lightgrey",
    marginTop: "0.5%",
  }));

  const handleMinutesChange = (event: SelectChangeEvent) => {
    setMinutes(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStartDateChange = (date: any) => {
    setFormValue((prevState) => ({
      ...prevState,
      start_date: date,
    }));
  };

  const handleEndDateChange = (date: any) => {
    setFormValue((prevState) => ({
      ...prevState,
      end_date: date,
    }));
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
  const handleFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.value);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const removeEmail = (emailToRemove: string) => {
    setFinalEmailsList((prevState) =>
      prevState.filter((email) => email !== emailToRemove)
    );
  };

  const handleSnackbarOpen = (
    message: string,
    severity: "success" | "error" | "info" | "warning"
  ) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleFileUpload = async () => {
    // const { file } = uplodaData;
    if (!file) {
      handleSnackbarOpen("Please select a file", "error");
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
          const newFileUrl = res.data.data.image_url;
          const storedFileUrls = localStorage.getItem("image_urls");
          let existingFileUrls = storedFileUrls
            ? JSON.parse(storedFileUrls)
            : [];
          if (!Array.isArray(existingFileUrls)) {
            existingFileUrls = [];
          }
          existingFileUrls.push(newFileUrl);
          localStorage.setItem("image_urls", JSON.stringify(existingFileUrls));
          handleSnackbarOpen("File Uploaded Successfully", "success");
        });
      setUploadedFiles([...uploadedFiles, file]);
      localStorage.setItem("file_names", JSON.stringify(file));
      setIsAttachButtonClicked(false);
      setFile(null);
      setFileName("");
    } catch (error: any) {
      let errorResponse = error.response.data.message;
      // Handle Axios errors
      console.error("Upload failed....", errorResponse);
      handleSnackbarOpen(errorResponse, "error");
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

  const selectUser = (event: React.SyntheticEvent<Element, Event>,
    newValue: string | null) => {
    setSelectedEmail(newValue);
    if (newValue) {
      setFinalEmailsList((prevState) => [...prevState, newValue]);

      const config: AxiosRequestConfig<any> = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      let payload = {
        email: newValue,
      };

      axios
        .post("http://65.0.19.86:8000/User/search_users", payload, config)
        .then((res: any) => {
          const users = [...res.data.data];
          let selectedUserId: string = users.length > 0 ? users[0]._id : '';
          setParticipants(prev => [...prev, selectedUserId]);
        })
        .catch((error) => {
          console.error("Error fetching users", error);
        });

    }

  }

  const handleSubmit = () => {
    let membersArray: any[] = [];

    const config: AxiosRequestConfig<any> = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const { title, description, start_date, end_date } = formValue;
    let payload = {
      title,
      description,
      start_date: start_date.format(), // Format start_date as string
      end_date: end_date.format(), // Format end_date as string
      members: participants,
      file_sharing: true,
      one_to_one_chat: true,
      recording: true,
      documents: [
        {
          file_name: "testing",
          url: JSON.stringify(localStorage.getItem("image_url")),
        },
      ],
    };
    console.log("Payload", payload);
    axios
      .post(CREATE_MEETING, payload, config)
      .then((res: any) => {
        console.log("res.data.....", res.data);
        navigate("/home");
        // navigate(`/join-event?post_id=${res.data.data.post_id}`, { state: { prop1: res.data.data } });
      })
      .catch((error) => {
        console.error("Error fetching users", error);
      });
  };

  return (
    <Box className="hostevents" style={{ overflowY: "auto", height: "100vh" }}>
      <Box sx={{ width: "50%", backgroundColor: "#1B1B1B", margin: "auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#000",
            padding: "20px",
          }}
        >
          <Typography sx={{ textAlign: "center", margin: "4% auto 0 auto" }}>
            <Link
              to="/home"
              style={{ color: "#FFFFFFCC", textDecoration: "none" }}
            >
              <ArrowBackIosIcon />
            </Link>
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              textAlign: "center",
              flex: 1,
              fontWeight: "bold",
            }}
          >
            Create Meeting
          </Typography>
        </div>
      </Box>
      <Box
        sx={{
          width: "50%",
          backgroundColor: "#1B1B1B",
          margin: "auto",
          padding: "20px",
          color: "#fff",
        }}
      >
        <Typography variant="h6" sx={{ color: "#fff" }}>
          Topic
        </Typography>
        <TextField
          value={formValue.title}
          onChange={handleInputChange}
          fullWidth
          size="small"
          placeholder="Topic of Meeting"
          sx={{
            backgroundColor: "#FFFFFF33",
            marginTop: "1%",
            color: "#fff",
            borderRadius: "25px",
            marginBottom: "3%",
            border: "1px solid #ccc",
          }}
          name="title"
        />
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
            value={formValue.description}
            name="description"
            onChange={handleInputChange}
          />
        )}
        {/* <TextField fullWidth size='small' placeholder='Topic of Meeting' sx={{ backgroundColor: "#FFFFFF33", color: "#fff", borderRadius: "25px", marginBottom: "3%" }} /> */}
        <Typography variant="h6" sx={{ color: "#fff" }}>
          Invite People
        </Typography>
        <div style={{ display: "flex", gap: "30px" }}>
          <div
            style={{ display: "flex", flexDirection: "column", width: "600px" }}
          >
            <Autocomplete
              multiple={false}
              value={selectedEmail}
              inputValue={searchVal}
              isOptionEqualToValue={(option, value) => option === value}
              disablePortal
              id="combo-box-demo"
              options={emailDropdown}
              onChange={(event, newValue) => selectUser(event, newValue)}
              onInputChange={searchUser}
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
                  }}
                  {...params}
                  placeholder="Email"
                />
              )}
            />
            {finalEmailsList.length > 0 && (
              <div
                style={{
                  maxHeight: "150px",
                  overflowY: "auto",
                  marginTop: "1%",
                }}
              >
                {finalEmailsList.map((email, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "#FFFFFF33",
                      borderRadius: "25px",
                      padding: "10px",
                      marginBottom: "5px",
                      border: "1px solid #ccc",
                      color: "#fff",
                      width: "280px",
                    }}
                  >
                    <Typography
                      sx={{
                        flexGrow: 1,
                      }}
                    >
                      {email}
                    </Typography>
                    {email && (
                      <IconButton
                        size="small"
                        onClick={() => removeEmail(email)}
                        sx={{
                          color: "#fff",
                          marginLeft: "10px",
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Select
            fullWidth
            sx={{
              backgroundColor: "#FFFFFF33",
              color: "#fff",
              borderRadius: "25px",
              marginBottom: "3%",
              marginTop: "1%",
              border: "1px solid #ccc",
              height: "56px",
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

        <Typography variant="h6" sx={{ color: "#fff" }}>
          Schedule
        </Typography>
        <div style={{ display: "flex", gap: "30px", marginTop: "1%" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={formValue.start_date}
              onChange={handleStartDateChange}
              sx={{
                backgroundColor: "#FFFFFF33",
                border: "1px solid #ccc",
                borderRadius: "25px",
                marginBottom: "3%",
                color: "#fff",
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
              slotProps={{
                layout: {
                  sx: {
                    backgroundColor: "#333333",
                    border: "1px solid #ccc",
                    color: "lightgrey",
                    marginTop: "0.5%",
                  },
                },
              }}
            />
            <TimePicker
              value={formValue.start_date}
              onChange={handleStartDateChange}
              sx={{
                backgroundColor: "#FFFFFF33",
                border: "1px solid #ccc",
                color: "#fff",
                borderRadius: "25px",
                marginBottom: "3%",
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
              slotProps={{
                layout: {
                  sx: {
                    backgroundColor: "#333333",
                    border: "1px solid #ccc",
                    color: "lightgrey",
                    marginTop: "0.5%",
                  },
                },
              }}
            />

            <TimePicker
              value={formValue.end_date}
              onChange={handleEndDateChange}
              sx={{
                backgroundColor: "#FFFFFF33",
                border: "1px solid #ccc",
                color: "#fff",
                borderRadius: "25px",
                marginBottom: "3%",
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
              slotProps={{
                layout: {
                  sx: {
                    backgroundColor: "#333333",
                    border: "1px solid #ccc",
                    color: "lightgrey",
                    marginTop: "0.5%",
                  },
                },
              }}
            />
          </LocalizationProvider>
        </div>
        <Typography variant="h6" sx={{ color: "#fff" }}>
          Permission for tools
        </Typography>
        {/* <div style={{ display: "flex", justifyContent: "center" }}>
                    <FormControlLabel control={<Switch defaultChecked color='primary' />} label="1 - 1 Chat" sx={{ color: "#fff", marginBottom: "3%", margin: 2, }} />
                    <FormControlLabel control={<Switch defaultChecked color='primary' />} label="File Sharing" sx={{ color: "#fff", marginBottom: "3%", margin: 2 }} />
                    <FormControlLabel control={<Switch color='primary' />} label="Record" sx={{ color: "#fff", marginBottom: "3%", margin: 2 }} />
                </div> */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            margin: "10px",
            justifyContent: "space-around",
          }}
        >
          <div style={{ marginBottom: "3%" }}>
            <label className="switch">
              <input defaultChecked type="checkbox" />
              <span className="slider round"></span>
            </label>
            <span style={{ color: "#fff", marginLeft: "10px" }}>1-1 Chat</span>
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
            <span style={{ color: "#fff", marginLeft: "10px" }}>Recording</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "transparent", borderRadius: "25px" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            className="next-button"
            sx={{ textTransform: "capitalize" }}
            onClick={handleSubmit}
          >
            Create Meeting
          </Button>
        </div>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}
