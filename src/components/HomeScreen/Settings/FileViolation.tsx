import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import {
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link, useNavigate } from "react-router-dom";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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

export default function Fileviolation() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const [format, setFormat] = React.useState("Select");

  const handleChangeFormat = (event: SelectChangeEvent) => {
    setFormat(event.target.value);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue);
    setValue(newValue);
  };

  const [file, setFile] = React.useState<File | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleNext = () => {
    if (value < 2) {
      handleChange({} as React.SyntheticEvent, value + 1);
    }
  };

  const handlePrevious = () => {
    if (value > 0) {
      handleChange({} as React.SyntheticEvent, value - 1);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
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
          <Typography>
            <Link
              to="/settings"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              <ArrowBackIosIcon />
            </Link>
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: "#fff", textAlign: "center", flex: "1" }}
          >
            File Violation
          </Typography>
        </div>
        <Box sx={{ borderBottom: 1, color: "#fff", padding: "20px" }}>
          <label>Type of violation</label>
          <Select
            fullWidth
            sx={{
              backgroundColor: "#FFFFFF33",
              color: "#fff",
              marginTop: "2%",
              borderRadius: "25px",
              marginBottom: "3%",
              border: "1px solid #ccc",
            }}
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={format}
            label="Select"
            onChange={handleChangeFormat}
            MenuProps={{
              PaperProps: {
                style: {
                  backgroundColor: "#494949",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  color: "#FFFFFF",
                  marginTop: "1%",
                },
              },
            }}
          >
            <MenuItem value={"Select"}>Select Type of Violation</MenuItem>
            <MenuItem value={"harassment"}>Harassment</MenuItem>
            <MenuItem value={"bullying"}>Bullying</MenuItem>
            <MenuItem value={"sexual-content"}>Sexual Content</MenuItem>
            <MenuItem value={"mis-leading"}>Mis- Leading</MenuItem>
            <MenuItem value={"child-abuse"}>Child Abuse</MenuItem>
            <MenuItem value={"spam"}>Spam</MenuItem>
          </Select>
          <label>Describe the Violation</label>
          <TextField
            sx={{
              backgroundColor: "#FFFFFF33",
              color: "#fff",
              marginTop: "2%",
              borderRadius: "25px",
              marginBottom: "3%",
              border: "1px solid #ccc",
              "& input::placeholder": {
                color: "#fff",
              },
              "& textarea::placeholder": {
                color: "#fff",
              },
            }}
            fullWidth
            id="outlined-multiline-static"
            multiline
            rows={4}
            // defaultValue="write about 50 to 300 words of Description"
            placeholder="write about 50 to 300 words of Description"
          />
          <label>Upload</label>
          <div>
            <Select
              fullWidth
              sx={{
                backgroundColor: "#FFFFFF33",
                marginTop: "2%",
                color: "#fff",
                borderRadius: "25px",
                marginBottom: "3%",
                border: "1px solid #ccc",
              }}
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={format}
              label="Select"
              onChange={handleChangeFormat}
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: "#494949",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    color: "#FFFFFF",
                    marginTop: "1%",
                  },
                },
              }}
            >
              <MenuItem value={"Select"}>Select File Type</MenuItem>
              <MenuItem value={".jpg"}>JPG</MenuItem>
              <MenuItem value={".mp4"}>.MP4</MenuItem>
              <MenuItem value={".mov"}>.MOV</MenuItem>
              <MenuItem value={".pdf"}>PDF</MenuItem>
            </Select>
            {format !== "Select" && (
              <div>
                <div
                  style={{
                    width: "100%",
                    backgroundColor: "#FFFFFF33",
                    height: 200,
                    border: "1px solid #ccc",
                    display: "grid",
                    placeItems: "center",
                    borderRadius: "30px",
                    marginTop: "2%",
                    marginBottom: "4%",
                  }}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  {file ? (
                    <div>
                      {file.type.includes("image") ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Dropped Image"
                          height="150px"
                          width="200px"
                        />
                      ) : (
                        <video controls>
                          <source
                            src={URL.createObjectURL(file)}
                            type={file.type}
                          />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  ) : (
                    <>
                      <Typography sx={{ marginTop: "5%" }}>
                        Drag & Drop your File Here
                      </Typography>
                      <Typography>-Or-</Typography>
                      <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        className="next-button"
                        sx={{ textTransform: "capitalize" }}
                      >
                        Browse Files
                        <VisuallyHiddenInput
                          type="file"
                          name="post_media"
                          style={{ display: "none" }}
                        />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          <label>URL of the Content.</label>
          <TextField
            sx={{
              backgroundColor: "#FFFFFF33",
              marginTop: "2%",
              color: "#fff",
              borderRadius: "25px",
              border: "1px solid #ccc",
              marginBottom: "3%",
              "& input::placeholder": {
                color: "#fff",
              },
              "& textarea::placeholder": {
                color: "#fff",
              },
            }}
            placeholder="URL"
            fullWidth
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: 10,
            }}
          >
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
              File
            </Button>
          </div>
        </Box>
      </Box>
    </div>
  );
}
