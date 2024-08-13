import React, { useState } from "react";
import {
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  Box,
} from "@mui/material";
import "./Troubleshoot.css";
import SidebarComponentLayout from "./SidebarComponentLayout";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "../../../../../assets/upload.svg";

const Troubleshoot = () => {
  const [troubleType, setTroubleType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [fileType, setFileType] = useState<string>("jpg");
  const [file, setFile] = useState<File | null>(null);

  const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
    fontFamily: "Calibri",
  }));

  const troubleTypes = [
    "Network Issue",
    "Hardware Failure",
    "Software Bug",
    "Performance Problem",
    "Security Concern",
  ];

  const fileTypes = ["jpg", "png", "pdf"];

  const DropZone = styled(Box)(({ theme }) => ({
    border: "1px solid #d7d5dd",
    borderRadius: "30px",
    padding: "45px 25px 45px 25px",
    textAlign: "center",
    cursor: "pointer",
    background: "#303030",
    backgroundImage: `url(${CloudUploadIcon})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  }));

  const handleDrop = (e: any) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleFileSelect = (e: any) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    // Handle the form submission logic here
    console.log({ troubleType, description, fileType, file });
  };

  const TroubleshootPage = (
    <div className="troubleshoot-container">
      <h2>Trubleshoot</h2>
      <form className="troubleshoot-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <FormControl
            fullWidth
            variant="outlined"
            sx={{
              display: "flex",
              flexDirection: "column",
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
          >
            <div>
              <Typography
                style={{
                  fontFamily: "Calibri",
                  fontWeight: 700,
                  fontSize: "18px",
                  lineHeight: "24.41px",
                  paddingBottom: "5px",
                }}
              >
                Type of Trouble
              </Typography>
              <Select
                displayEmpty
                id="trouble-type"
                value={troubleType}
                onChange={(e) => setTroubleType(e.target.value)}
                className="select-trouble"
                sx={{ fontFamily: "Calibri" }}
                MenuProps={{
                  MenuListProps: {
                    sx: {
                      fontFamily: "Calibri",
                    },
                  },
                }}
              >
                <CustomMenuItem value="">Select Type of Trouble</CustomMenuItem>
                {troubleTypes.map((type) => (
                  <CustomMenuItem key={type} value={type}>
                    {type}
                  </CustomMenuItem>
                ))}
              </Select>
            </div>
          </FormControl>
        </div>
        <div className="form-group">
          <Typography
            style={{
              fontFamily: "Calibri",
              fontWeight: 700,
              fontSize: "18px",
              lineHeight: "24.41px",
              paddingBottom: "5px",
            }}
          >
            Describe the Problem faced
          </Typography>

          <TextField
            multiline
            rows={4}
            placeholder="Write about 50 to 300 words of description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            sx={{
              borderRadius: "30px",
              background: "#FFFFFF33",
              border: "1px solid #d7d5dd",
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
            InputProps={{
              sx: {
                color: "#FFFFFF",
                fontSize: "16px",
                fontFamily: "Calibri",
                "& .MuiInputBase-input::placeholder": {
                  fontFamily: "Calibri",
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#FFFFFF",
                  opacity: 1,
                },
              },
            }}
          />
        </div>
        <div className="form-group">
          <FormControl fullWidth variant="outlined">
            <Typography
              style={{
                fontFamily: "Calibri",
                fontWeight: 700,
                fontSize: "18px",
                lineHeight: "24.41px",
                paddingBottom: "5px",
              }}
            >
              Upload
            </Typography>

            <Select
              displayEmpty
              value={fileType}
              className="select-trouble"
              onChange={(e) => setFileType(e.target.value)}
              sx={{ fontFamily: "Calibri" }}
              MenuProps={{
                MenuListProps: {
                  sx: {
                    fontFamily: "Calibri",
                  },
                },
              }}
            >
              {fileTypes.map((type) => (
                <CustomMenuItem key={type} value={type}>
                  {type}
                </CustomMenuItem>
              ))}
            </Select>

            <Box
              sx={{
                width: "100%",
                paddingTop: "10px",
              }}
            >
              <DropZone onDrop={handleDrop} onDragOver={handleDragOver}>
                <Typography
                  sx={{
                    fontFamily: "Calibri",
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#CECECE",
                    opacity: 1,
                  }}
                >
                  Drag and drop your file here
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Calibri",
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#CECECE",
                    opacity: 1,
                  }}
                >
                  - or -
                </Typography>
                <Button
                  className="browse-button"
                  style={{ fontFamily: "Calibri" }}
                >
                  Browse Files
                  <input type="file" hidden onChange={handleFileSelect} />
                </Button>
              </DropZone>
              {file && (
                <Box
                  mt={2}
                  textAlign="center"
                  style={{ fontFamily: "Calibri" }}
                >
                  <Typography variant="body1">
                    Selected file: {file.name}
                  </Typography>
                </Box>
              )}
            </Box>
          </FormControl>
        </div>
        <div className="form-actions">
          <Button
            className="trouble-cancel-button"
            onClick={() => {
              setTroubleType("");
              setDescription("");
              setFileType("jpg");
              setFile(null);
            }}
            style={{ fontFamily: "Calibri" }}
          >
            Cancel
          </Button>
          <Button
            className="file-button"
            type="submit"
            style={{ fontFamily: "Calibri" }}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );

  return <SidebarComponentLayout component={TroubleshootPage} />;
};

export default Troubleshoot;
