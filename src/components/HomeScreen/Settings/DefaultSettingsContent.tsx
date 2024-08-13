import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Divider, Grid, Typography, Button, Box } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from "react-router-dom";
import { ReactComponent as LineArrow } from '../../../assets/Vector 123.svg';
import "./AdCampaign.css";


export const DefaultContent: React.FC = () => {
  const navigate = useNavigate();
  const [expandedPanel1, setExpandedPanel1] = useState(true);
  const [expandedPanel2, setExpandedPanel2] = useState(false);
  const [expandedPanel3, setExpandedPanel3] = useState(false);

  const handlePanel1Change = () => {
    setExpandedPanel1(!expandedPanel1);
  };

  const handlePanel2Change = () => {
    setExpandedPanel2(!expandedPanel2);
  };

  const handlePanel3Change = () => {
    setExpandedPanel3(!expandedPanel3);
  };


  return (
    <>
      <Grid xs={12} md={12} item sx={{ color: "#fff", margin: "10px" }}>
        <Box className="help">
          <h3>Help</h3>
          <div className='help-content'>
            <LineArrow />
            <div className='help-box'>
              <span className='help-heading'>Violation Filing Content</span>
              <div className='help-description'>
                <p>Violation of Sledge Terms and condition or Sledge Guideline or Both can be done by clicking the “File Violation” Button with adequate details and proof of the violation.</p>
                <p>Details may require screenshots, screen videos & the URL. One can also upload other details if relevant to the situation.</p>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }} className='file-button-container'>
                <Button size="medium" sx={{ color: "#fff" }} className="file-button" onClick={() => navigate('/fileviolation')}>File a Violation </Button>
              </div>
            </div>
          </div>
          <div className='faq-content'>
            <Typography variant="body1">FAQ</Typography>
            <Grid container>
              <Grid md={2} item sx={{ display: "flex", justifyContent: "center", fontSize: "55px", color: "gray" }}>01</Grid>
              <Grid md={10} item>
                <Accordion
                  expanded={expandedPanel1}
                  onChange={handlePanel1Change}
                  sx={{ backgroundColor: "transparent", color: "#fff", border: "none", boxShadow: "none" }}
                >
                  <AccordionSummary
                    expandIcon={expandedPanel1 ? <RemoveIcon sx={{ color: "#fff", backgroundColor: "black", borderRadius: "180px", padding: "5px", fontSize: "25px" }} /> : <AddCircleIcon sx={{ color: "#fff" }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography variant="h5">How to Earn through Sledge?</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ color: "lightgray", marginBottom: "2%" }}>
                    There are Multiple ways few of them have been listed.<br />
                    1. Host Events and get paid for every audience <br />
                    2. Start posting Free Video Contents and get paid for the Ads being run on it<br />
                    3. Start creating Owner content and derive Dividends out of it.<br />
                    One can also figure out a lawful means of Earning through Sledge making use of the features.
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid md={12} item>
                <Divider sx={{ backgroundColor: "gray" }} />
              </Grid>
              <Grid md={2} item sx={{ display: "flex", justifyContent: "center", fontSize: "55px", color: "gray" }}>02</Grid>
              <Grid md={10} item>
                <Accordion
                  expanded={expandedPanel2}
                  onChange={handlePanel2Change}
                  sx={{ backgroundColor: "transparent", color: "#fff", border: "none", boxShadow: "none" }}
                >
                  <AccordionSummary
                    expandIcon={expandedPanel2 ? <RemoveIcon sx={{ color: "#fff", backgroundColor: "black", borderRadius: "180px", padding: "5px", fontSize: "25px" }} /> : <AddCircleIcon sx={{ color: "#fff" }} />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography variant="h5">How to Invite new people or friends to the Event?</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ color: "lightgray", marginBottom: "2%" }}>
                    - Invite through Email while Hosting the Event through the Invite Option. <br />
                    - Invite Using the Event Link of the corresponding Event from the Host Event Section.
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid md={12} item>
                <Divider sx={{ backgroundColor: "gray" }} />
              </Grid>
              <Grid md={2} item sx={{ display: "flex", justifyContent: "center", fontSize: "55px", color: "gray" }}>03</Grid>
              <Grid md={10} item>
                <Accordion
                  expanded={expandedPanel3}
                  onChange={handlePanel3Change}
                  sx={{ backgroundColor: "transparent", color: "#fff", border: "none", boxShadow: "none" }}
                >
                  <AccordionSummary
                    expandIcon={expandedPanel3 ? <RemoveIcon sx={{ color: "#fff", backgroundColor: "black", borderRadius: "180px", padding: "5px", fontSize: "25px" }} /> : <AddCircleIcon sx={{ color: "#fff" }} />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                  >
                    <Typography variant="h5">How to connect Sledge Customer Support?</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ color: "lightgray", marginBottom: "2%" }}>
                    - Use Raise Ticket option at the top right corner of the screen <br />
                    - Support Team will respond within 48 hours.
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid md={12} item>
                <Divider sx={{ backgroundColor: "gray" }} />
              </Grid>
            </Grid>
          </div>

        </Box>
      </Grid>
    </>
  );
}
