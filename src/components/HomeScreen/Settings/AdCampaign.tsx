import React, { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { FormControlLabel, Switch, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link, useNavigate, useLocation } from "react-router-dom";

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

export default function AdCampaign() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [selectedType, setSelectedType] = React.useState<
    "business" | "individual"
  >("business");
  const [file, setFile] = React.useState<File | null>(null);

  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.fromTab !== undefined) {
      const selectedTab = location.state.fromTab;
      console.log("Received state:", selectedTab);
      // Perform any actions you need with the selectedTab state
    }
  }, [location]);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedName = event.target.name as "business" | "individual";
    setSelectedType(selectedName);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleNext = () => {
    if (value < 3) {
      handleChange({} as React.SyntheticEvent, value + 1);
    }
  };

  const handlePrevious = () => {
    if (value > 0) {
      handleChange({} as React.SyntheticEvent, value - 1);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="hostevents">
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
              to="/settings"
              style={{ color: "#FFFFFFCC", textDecoration: "none" }}
              state={location.state}
            >
              <ArrowBackIosIcon />
            </Link>
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: "#fff", textAlign: "center", flex: "1" }}
          >
            Ad Campaign
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
              label="basic details"
              {...a11yProps(0)}
            />
            <Tab
              sx={{
                color: "#fff !important",
                textTransform: "capitalize",
                backgroundColor: value === 1 ? "#1B1B1B" : "#000",
              }}
              label="ad details"
              {...a11yProps(1)}
            />
            <Tab
              sx={{
                color: "#fff !important",
                textTransform: "capitalize",
                backgroundColor: value === 2 ? "#1B1B1B" : "#000",
              }}
              label="purpose"
              {...a11yProps(2)}
            />
            <Tab
              sx={{
                color: "#fff !important",
                textTransform: "capitalize",
                backgroundColor: value === 3 ? "#1B1B1B" : "#000",
              }}
              label="pricing"
              {...a11yProps(3)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div>
            <Typography variant="h6">Select Type</Typography>
            <FormControlLabel
              control={
                <Switch
                  name="business"
                  checked={selectedType === "business"}
                  onChange={handleSwitchChange}
                  color="warning"
                />
              }
              label="Bussiness"
              sx={{ color: "#fff", marginBottom: "3%", margin: 2 }}
            />
            <FormControlLabel
              control={
                <Switch
                  name="individual"
                  checked={selectedType === "individual"}
                  onChange={handleSwitchChange}
                  color="warning"
                />
              }
              label="Individual"
              sx={{ color: "#fff", marginBottom: "3%", margin: 2 }}
            />
            <br />
            {selectedType === "business" && (
              <>
                <label>Bussiness Name</label>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type your organization name"
                  sx={{
                    backgroundColor: "#FFFFFF33",
                    color: "#fff",
                    borderRadius: "25px",
                    marginBottom: "3%",
                  }}
                />
                <label>Bussiness Size</label>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="500 Members"
                  sx={{
                    backgroundColor: "#FFFFFF33",
                    color: "#fff",
                    borderRadius: "25px",
                    marginBottom: "3%",
                  }}
                />
                <label>Bussiness Industry</label>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Which industry?"
                  sx={{
                    backgroundColor: "#FFFFFF33",
                    color: "#fff",
                    borderRadius: "25px",
                    marginBottom: "3%",
                  }}
                />
                <label>Bussiness Website</label>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type your Website"
                  sx={{
                    backgroundColor: "#FFFFFF33",
                    color: "#fff",
                    borderRadius: "25px",
                    marginBottom: "3%",
                  }}
                />
                <label>Bussiness Location</label>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type your Location"
                  sx={{
                    backgroundColor: "#FFFFFF33",
                    color: "#fff",
                    borderRadius: "25px",
                    marginBottom: "3%",
                  }}
                />
              </>
            )}

            {selectedType === "individual" && (
              <>
                <label>Name</label>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type your name"
                  sx={{
                    backgroundColor: "#FFFFFF33",
                    color: "#fff",
                    borderRadius: "25px",
                    marginBottom: "3%",
                  }}
                />
                <Typography variant="h6" sx={{ color: "#fff" }}>
                  Who You Are?
                </Typography>
                <div style={{ display: "flex" }}>
                  <FormControlLabel
                    control={<Switch defaultChecked color="warning" />}
                    label="Freelancer"
                    sx={{ color: "#fff", marginBottom: "3%", margin: 2 }}
                  />
                  <FormControlLabel
                    control={<Switch color="warning" />}
                    label="Student"
                    sx={{ color: "#fff", marginBottom: "3%", margin: 2 }}
                  />
                  <FormControlLabel
                    control={<Switch color="warning" />}
                    label="Others"
                    sx={{ color: "#fff", marginBottom: "3%", margin: 2 }}
                  />
                </div>
                <label>Industry</label>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type your Ad industry"
                  sx={{
                    backgroundColor: "#FFFFFF33",
                    color: "#fff",
                    borderRadius: "25px",
                    marginBottom: "3%",
                  }}
                />
                <label>Website</label>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type your Website"
                  sx={{
                    backgroundColor: "#FFFFFF33",
                    color: "#fff",
                    borderRadius: "25px",
                    marginBottom: "3%",
                  }}
                />
                <label>Location</label>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type your Location"
                  sx={{
                    backgroundColor: "#FFFFFF33",
                    color: "#fff",
                    borderRadius: "25px",
                    marginBottom: "3%",
                  }}
                />
              </>
            )}

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "transparent", borderRadius: "25px" }}
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
            Product Details
          </Typography>
          <label>Product Name</label>
          <TextField
            fullWidth
            size="small"
            placeholder="Type your product name"
            sx={{
              backgroundColor: "#FFFFFF33",
              color: "#fff",
              borderRadius: "25px",
              marginBottom: "3%",
            }}
          />
          <label>Product Decription</label>
          <TextField
            fullWidth
            size="small"
            placeholder="About Product"
            sx={{
              backgroundColor: "#FFFFFF33",
              color: "#fff",
              borderRadius: "25px",
              marginBottom: "3%",
            }}
          />
          <label>Product Industry</label>
          <TextField
            fullWidth
            size="small"
            placeholder="Which industry?"
            sx={{
              backgroundColor: "#FFFFFF33",
              color: "#fff",
              borderRadius: "25px",
              marginBottom: "3%",
            }}
          />
          <label>Product Uses</label>
          <TextField
            fullWidth
            size="small"
            placeholder="Type about product uses"
            sx={{
              backgroundColor: "#FFFFFF33",
              color: "#fff",
              borderRadius: "25px",
              marginBottom: "3%",
            }}
          />
          <label>Product Features</label>
          <TextField
            fullWidth
            size="small"
            placeholder="Type about product features"
            sx={{
              backgroundColor: "#FFFFFF33",
              color: "#fff",
              borderRadius: "25px",
              marginBottom: "3%",
            }}
          />
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
              onClick={handleNext}
            >
              Next
            </Button>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Typography variant="h6" sx={{ color: "#fff" }}>
            Ad Purpose
          </Typography>
          <label>How long the campaign is</label>
          <TextField
            fullWidth
            size="small"
            placeholder="10 days"
            sx={{
              backgroundColor: "#FFFFFF33",
              color: "#fff",
              borderRadius: "25px",
              marginBottom: "3%",
            }}
          />
          <label>Budget</label>
          <TextField
            fullWidth
            size="small"
            placeholder="100-120"
            sx={{
              backgroundColor: "#FFFFFF33",
              color: "#fff",
              borderRadius: "25px",
              marginBottom: "3%",
            }}
          />
          <Typography variant="h6" sx={{ color: "#fff" }}>
            Medium of Ad
          </Typography>
          <div style={{ display: "flex" }}>
            <FormControlLabel
              control={<Switch defaultChecked color="warning" />}
              label="Video"
              sx={{ color: "#fff", marginBottom: "3%", margin: 2 }}
            />
            <FormControlLabel
              control={<Switch color="warning" />}
              label="Image"
              sx={{ color: "#fff", marginBottom: "3%", margin: 2 }}
            />
          </div>
          <label>Target Geography</label>
          <TextField
            fullWidth
            size="small"
            placeholder="Target location"
            sx={{
              backgroundColor: "#FFFFFF33",
              color: "#fff",
              borderRadius: "25px",
              marginBottom: "3%",
            }}
          />
          <label>Target Industry Audience</label>
          <TextField
            fullWidth
            size="small"
            placeholder="Type the target industry"
            sx={{
              backgroundColor: "#FFFFFF33",
              color: "#fff",
              borderRadius: "25px",
              marginBottom: "3%",
            }}
          />
          <label>Upload the Ad Video or Image</label>
          <div
            style={{
              width: "100%",
              backgroundColor: "#FFFFFF33",
              height: 100,
              border: "1px solid #ccc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
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
                    <source src={URL.createObjectURL(file)} type={file.type} />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            ) : (
              <>
                <Typography>
                  Drop files here or clik browse through your machine
                </Typography>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  className="next-button"
                  sx={{ textTransform: "capitalize" }}
                >
                  Browse Files
                  <VisuallyHiddenInput type="file" />
                </Button>
              </>
            )}
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
              onClick={handleNext}
            >
              Next
            </Button>
          </div>
        </CustomTabPanel>
      </Box>
    </div>
  );
}
