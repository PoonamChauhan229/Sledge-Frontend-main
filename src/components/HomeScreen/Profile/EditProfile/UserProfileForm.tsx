import React, { useState, ChangeEvent } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  FormHelperText,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import "./UserProfileForm.css";

const UserProfileForm: React.FC = () => {
  const [gender, setGender] = useState<string>("female");
  const [name, setName] = useState<string>("Rudhika Agarwal");
  const [userName, setUserName] = useState<string>("Rudhika Agarwal");
  const [intro, setIntro] = useState<string>("Rudhika Agarwal");
  const [interests, setInterests] = useState<string>("#music");
  const [contact, setContact] = useState<string>("923898922");
  const [email, setEmail] = useState<string>("yvdgsy@gmail.com");
  const [location, setLocation] = useState<string>("Delhi");
  const [links, setLinks] = useState<string>("hasbdhbaybwab.inxsabinn.ccom");

  const handleGenderChange = (event: SelectChangeEvent<string>) => {
    setGender(event.target.value as string);
  };

  const handleUpdate = () => {
    const formData = {
      name,
      userName,
      intro,
      interests,
      contact,
      email,
      gender,
      location,
      links,
    };
    console.log(formData);
    // Here you can send the formData to your backend or perform any action you need
  };

  return (
    <Box className="editform-container">
      <Box className="section">
        <Typography className="section-header">Name</Typography>
        <Box className="fields">
          <div className="field-container">
            <span>Name</span>
            <TextField
              className="field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                classes: { root: "field-root" },
                disableUnderline: true,
              }}
              InputLabelProps={{ style: { color: "#fff" } }}
            />
          </div>

          <div className="field-container">
            <span>User Name</span>
            <TextField
              className="field"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              InputProps={{
                classes: { root: "field-root" },
                disableUnderline: true,
              }}
              InputLabelProps={{ style: { color: "#fff" } }}
            />
          </div>
        </Box>
      </Box>
      <Divider variant="middle" style={{ border: "0.6px solid #383838" }} />
      <Typography className="section-header">Intro</Typography>
      <Box className="fields">
        <div className="field-container">
          <span>Intro</span>
          <TextField
            className="field"
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            multiline
            rows={4}
            helperText={
              <FormHelperText className="helper-text">
                Word count: {intro.length}
              </FormHelperText>
            }
            InputProps={{
              classes: { root: "intro-field-root" },
              disableUnderline: true,
            }}
            InputLabelProps={{ style: { color: "#fff" } }}
          />
        </div>

        <div className="field-container">
          <span>Interests</span>
          <TextField
            className="field"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            helperText={
              <FormHelperText className="helper-text">
                5 tags only
              </FormHelperText>
            }
            multiline
            rows={4}
            InputProps={{
              classes: { root: "intro-field-root" },
              disableUnderline: true,
            }}
            InputLabelProps={{ style: { color: "#fff" } }}
          />
        </div>
      </Box>
      <Divider variant="middle" style={{ border: "0.6px solid #383838" }} />
      <Box className="section">
        <Typography className="section-header">Contact</Typography>
        <Box className="fields">
          <div className="field-container">
            <span>Contact</span>
            <TextField
              className="field"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              InputProps={{
                classes: { root: "field-root" },
                disableUnderline: true,
              }}
              InputLabelProps={{ style: { color: "#fff" } }}
            />
          </div>

          <div className="field-container">
            <span>Email</span>
            <TextField
              type="email"
              className="field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                classes: { root: "field-root" },
                disableUnderline: true,
              }}
              InputLabelProps={{ style: { color: "#fff" } }}
            />
          </div>
        </Box>
      </Box>
      <Divider variant="middle" style={{ border: "0.6px solid #383838" }} />
      <Box className="section">
        <Typography className="section-header">Other</Typography>
        <Box className="fields">
          <div className="field-container">
            <span>Gender</span>
            <Select
              value={gender}
              onChange={handleGenderChange}
              className="field-root"
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
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </div>
          <div className="field-container">
            <span>Location</span>
            <TextField
              className="field"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              InputProps={{
                classes: { root: "field-root" },
                disableUnderline: true,
              }}
              InputLabelProps={{ style: { color: "#fff" } }}
            />
          </div>
          <div className="field-container">
            <span>Links</span>
            <TextField
              type="url"
              className="field"
              value={links}
              onChange={(e) => setLinks(e.target.value)}
              InputProps={{
                classes: { root: "field-root" },
                disableUnderline: true,
              }}
              InputLabelProps={{ style: { color: "#fff" } }}
            />
          </div>
        </Box>
      </Box>

      <Box className="update-button-container">
        <Button
          variant="contained"
          className="update-button"
          onClick={handleUpdate}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default UserProfileForm;
