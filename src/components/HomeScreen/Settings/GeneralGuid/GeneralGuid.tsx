import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import { ReactComponent as LineArrow } from "../../../../assets/Vector 123.svg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Help from "../Help";

const GeneralGuid: React.FC = () => {
  return (
    <>
      <h1>General Guidelines</h1>
      <div style={{ marginBottom: "20px" }}>
        <Accordion sx={{ backgroundColor: "#111", color: "#fff" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Events & Meetings
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul>
              <li>
                The Events have features of Mute, unmute, share screen, Hand
                raise, Video On/Off, Chat & Lobby options for the Audience. The
                Chat has a private chat to directly message the Host in the
                Event. Lobby can be used to interact with the other participants
                as well.
              </li>
              <li>
                The Event Features such as White Board, Ai, Controlling the
                Audience using Stop, Kickout etc as available along with the
                other features of the audience for the Host.
              </li>
              <li>
                The Events can be Recorded and Downloaded along with the Notes
                (Written on Whiteboard) in Word, PDF, JPG Formats.
              </li>
              <li>
                Meetings be for a unlimited duration, where the features shall
                be available like the Events however the limit is 15
                participants including the Host.
              </li>
              <li>
                All the Participants and Host in both Events and Meetings needs
                to adhere to the Sledge Guidelines and Terms and Conditions.
                Violation shall attract subsequent actions on the user profile
                by Sledge.
              </li>
            </ul>
          </AccordionDetails>
        </Accordion>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <Accordion sx={{ backgroundColor: "#111", color: "#fff" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Chats
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul>
              <li>
                Chats are available in the Menu sections for Sledge users to
                interact with their friends and share information on any
                specific matter.
              </li>
              <li>
                Any Sledge user is allowed to use it Ethically and in line with
                Sledge Terms and Conditions.
              </li>
              <li>
                The Events can be Recorded and Downloaded along with the Notes
                (Written on Whiteboard) in Word, PDF, JPG Formats.
              </li>
              <li>
                Things such as Spamming, Annoying, Bullying and other which are
                prohibited by Sledge shall not be done. Else the user shall
                attract subsequent actions from Sledge.
              </li>
            </ul>
          </AccordionDetails>
        </Accordion>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <Accordion sx={{ backgroundColor: "#111", color: "#fff" }}>
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon sx={{ color: "#fff", marginBottom: "10px" }} />
            }
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Posts
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul>
              <li>
                Post can be any data in the form of Text, Image or Video
                uploaded in Sledge which can be viewed by any Sledge user. Video
                contents are available for monetisation once the criteria
                specified is met.
              </li>
              <li>
                The control on the post such as likes, reviews etc shall be with
                the user who posted. However the control wont be available with
                the user when using a copyrighted content of others. The Content
                owner shall be consulted for Dividend from the monetisation
                benefits or taking the content down entirely from Sledge.
              </li>
              <li>
                At any instance of the content ownership the documents submitted
                as a proof shall be evaluated and the direction from Sledge
                shall be the Final.
              </li>
              <li>
                Any post needs to adhere to the Terms and conditions of Sledge
              </li>
            </ul>
          </AccordionDetails>
        </Accordion>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <Accordion
          sx={{ backgroundColor: "#111", color: "#fff", marginBottom: "10px" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Ads
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul>
              <li>
                The Ad Campaigns shall be customised as per the user’s wish
                during the uploading phase. Using which the Ad campaign shall be
                targeted on the Target Audience
              </li>
              <li>
                The Basic Details section shall be furnished with Accurate
                details of the Campaign Runner.
              </li>
              <li>
                Ad Details Section shall be furnished with the details of the
                Ads and the redirection of the customers and leads.
              </li>
              <li>
                The Upload button in this section can be used for both Videos
                the limits and the size are given in the Thumbnail & Sizes
                Section
              </li>
              <li>
                The Pricing shall be set according the views required on the Ad.
                This shall go with $0.1 for every 7 Views. Which turns to be
                $100 for 7K Views.
              </li>
              <li>
                The Pricing shall be set according the views required on the Ad.
                This shall go with $0.1 for every 7 Views. Which turns to be
                $100 for 7K Views.
              </li>
              <li>
                The Pricing shall be set according the views required on the Ad.
                This shall go with $0.1 for every 7 Views. Which turns to be
                $100 for 7K Views.
              </li>
            </ul>
          </AccordionDetails>
        </Accordion>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <Accordion sx={{ backgroundColor: "#111", color: "#fff" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Thumbnail & Sizes
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ol>
              <li>
                The Pricing shall be set according the views required on the Ad.
                This shall go with $0.1 for every 7 Views. Which turns to be
                $100 for 7K Views.
              </li>
            </ol>
            <ul>
              <li>
                *Thumbnail for Event - 740 x 380 px Thumbnail for Video -
                Minimum size 808 x 632 px Uploading files for the Ads - 740 x
                380 px
              </li>
              <li>
                Size for PPT, PDF, DOC in Post - square (1:1), portrait (4:5),
                or landscape (4:6 ratio) (1.9:1 ratio) Size for Image in Post -
                1080 x 1080 px for a square layout, 1080 x 1920 px for stories,
                630 x 1200 px for portrait , and 1200 x 630 px for
                landscape-oriented posts.*
              </li>
            </ul>
          </AccordionDetails>
        </Accordion>
      </div>
      <Divider variant="middle" style={{ backgroundColor: "#474747" }} />
      <Help />
    </>
  );
};

export default GeneralGuid;
