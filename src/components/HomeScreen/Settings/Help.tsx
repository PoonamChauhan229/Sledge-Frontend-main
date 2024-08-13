import React from "react";
import { ReactComponent as LineArrow } from "../../../assets/Vector 123.svg";
import { Box, Button, Card, Divider, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Help = () => {
  const navigate = useNavigate();

  return (
    <Box className="help" sx={{ height: "400px" }}>
      <h3>Help</h3>
      <div className="help-content">
        <LineArrow />
        <div className="help-box">
          <span className="help-heading">Violation Filing Content</span>
          <div className="help-description">
            <p>
              Violation of Sledge Terms and condition or Sledge Guideline or
              Both can be done by clicking the “File Violation” Button with
              adequate details and proof of the violation.
            </p>
            <p>
              Details may require screenshots, screen videos & the URL. One can
              also upload other details if relevant to the situation.
            </p>
          </div>
          <div className="help-btn-container">
            <Button
              className="violation-btn"
              onClick={() => navigate("/fileviolation")}
            >
              <span>File a Violation</span>
            </Button>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Help;
