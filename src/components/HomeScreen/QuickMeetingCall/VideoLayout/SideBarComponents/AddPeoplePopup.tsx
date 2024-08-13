import React, { useState } from "react";
import {
  Dialog,
  Button,
  TextField,
  Avatar,
  Checkbox,
  FormControlLabel,
  Typography,
  IconButton,
  Autocomplete,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import "./AddPeoplePopup.css";
import { ReactComponent as CloseMenuIcon } from "../../../../../assets/Group 33569.svg";
import { ReactComponent as InfoIcon } from "../../../../../assets/info-svg.svg";

import axios, { AxiosRequestConfig } from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { HMSPeer, useParticipants } from "@100mslive/react-sdk";
import CustomCheckbox from "../../../../ShareModel/CustomCheckbox/CustomCheckbox";

export interface AddPopupComponentProps {
  open: boolean;
  handleClose: () => void;
}

const AddPopupComponent: React.FC<AddPopupComponentProps> = ({
  open,
  handleClose,
}) => {
  const [emails, setEmails] = useState<string[]>([]);
  const [searchVal, setSearchVal] = React.useState("");
  const [emailDropdown, setEmailDropdown] = React.useState<string[]>([]);
  const [selectedEmail, setSelectedEmail] = React.useState<string | null>("");
  const [finalEmailsList, setFinalEmailsList] = React.useState<string[]>([]);
  const participants = useParticipants();

  const [suggestions] = useState([
    {
      name: "Eleanor Pena",
      email: "eleanorpena@gmail.com",
      avatar: "/path-to-avatar",
    },
    {
      name: "Eleanor Pena",
      email: "eleanorpena@gmail.com",
      avatar: "/path-to-avatar",
    },
    {
      name: "Eleanor Pena",
      email: "eleanorpena@gmail.com",
      avatar: "/path-to-avatar",
    },
  ]);

  const handleCheckboxChange = (index: number) => {
    const updatedCheckedState = checkedState.map((item, idx) =>
      idx === index ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  const [checkedState, setCheckedState] = useState(
    new Array(suggestions.length).fill(false)
  );

  // Find the participant with the role "host"
  const hostParticipant = participants.participants.find(
    (participant: HMSPeer) => participant.roleName === "host"
  );

  const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    "& .MuiFormControlLabel-label": {
      fontFamily: "Calibri",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "16px",
    },
  }));

  const handleAddEmail = () => {
    if (searchVal && !emails.includes(searchVal)) {
      setEmails([...emails, searchVal]);
      setSearchVal("");
    }
  };

  const handleSuggestionClick = (suggestion: {
    name: string;
    email: string;
    avatar: string;
  }) => {
    if (!emails.includes(suggestion.email)) {
      setEmails([...emails, suggestion.email]);
    }
  };

  const CustomPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: "#333333",
    border: "1px solid #ccc",
    borderRadius: "15px",
    color: "lightgrey",
    marginTop: "0.5%",
  }));

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

  const handleRemoveEmail = (email: any) => {
    setFinalEmailsList(finalEmailsList.filter((e) => e !== email));
  };

  const getInitials = (email: string) => {
    const parts = email.split("@")[0].split(".");
    return parts.map((part) => part[0].toUpperCase()).join("");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="add-people-popup"
      sx={{
        "& .MuiDialog-paper": {
          width: "678px",
          backgroundColor: "#1b1b1b",
          borderRadius: "12px",
          position: "relative", // Add position relative to the dialog paper
          padding: "20px 24px",
        },
      }}
    >
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 0, // Adjust distance from the right edge
          top: 0, // Adjust distance from the top edge
          zIndex: 1300, // Ensure the icon is above other content
        }}
      >
        <CloseMenuIcon />
      </IconButton>
      <div className="invite-people-popup">
        <Typography
          style={{
            fontFamily: "Calibri",
            fontWeight: 700,
            fontSize: "26px",
            lineHeight: "24.41px",
          }}
        >
          Add People
        </Typography>
        <Typography
          style={{
            fontFamily: "Calibri",
            fontWeight: 700,
            fontSize: "20px",
            lineHeight: "24.41px",
          }}
        >
          Invite
        </Typography>

        <Autocomplete
          multiple={false}
          fullWidth={true}
          inputValue={searchVal}
          isOptionEqualToValue={(option, value) => option === value}
          disablePortal
          options={emailDropdown}
          onChange={(event, newValue) => {
            setSelectedEmail(newValue);
            if (newValue) {
              setFinalEmailsList((prevState) => [...prevState, newValue]);
            }
            setSearchVal(""); // Clear the input field
          }}
          onInputChange={searchUser}
          PaperComponent={CustomPaper}
          sx={{
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
              {...params}
              fullWidth
              placeholder="Enter User name or email"
              sx={{
                borderRadius: "30px",
                paddingLeft: "10px",
                paddingRight: "10px",
                background: "#FFFFFF33",
                "& .MuiInputBase-input::placeholder": {
                  fontFamily: "Calibri",
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#FFFFFF",
                  opacity: 1,
                },
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
              }}
            />
          )}
        />
        <div className="email-list">
          {finalEmailsList.length > 0 &&
            finalEmailsList.map((email, index) => (
              <div key={index} className="email-item">
                <Avatar sx={{ width: 24, height: 24, marginRight: "3px" }}>
                  {getInitials(email)}
                </Avatar>
                <span className="email-text">{email}</span>

                <CloseIcon
                  sx={{ width: "18px", height: "18px" }}
                  onClick={() => handleRemoveEmail(email)}
                />
              </div>
            ))}
        </div>

        <div className="suggestions">
          <Typography
            style={{
              fontFamily: "Calibri",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "24.41px",
            }}
          >
            Suggestions
          </Typography>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <Avatar src={suggestion.avatar} className="suggestion-avatar" />
              <span className="suggestion-name">{suggestion.name}</span>
              <CustomCheckbox
                checked={checkedState[index]}
                onChange={() => handleCheckboxChange(index)}
              />
            </div>
          ))}
        </div>
        {finalEmailsList && (
          <Typography
            style={{
              fontFamily: "Calibri",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "24.41px",
            }}
          >
            {selectedEmail} is invited by {hostParticipant?.name} for “Ai
            Revolution Event”.
          </Typography>
        )}

        {finalEmailsList.length > 0 && (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <CustomFormControlLabel
              sx={{
                fontFamily: "Calibri",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "24.41px",
              }}
              control={<InfoIcon />}
              label="Participants can enter the meeting directly without requesting access."
              className="access-checkbox"
            />
            <Button onClick={handleClose} className="send-button">
              Send
            </Button>
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default AddPopupComponent;
