import React from "react";
import "./AdCampaign.css";
import { Box, Button, Card, Divider, Grid } from "@mui/material";
import AD1 from "../../../assets/AdCampn1.png";
import AD2 from "../../../assets/AdCampn2.png";
import { ReactComponent as LineArrow } from "../../../assets/Vector 123.svg";
import "./AdCampaign.css";
import { Link } from "react-router-dom";
import Help from "./Help";

interface AdCampaignHomeProps {
  selectedTab: number;
}

const AdCampaignHome: React.FC<AdCampaignHomeProps> = ({ selectedTab }) => {
  const StartCampain = () => {
    return (
      <Card className="start-card">
        <div className="root">
          <div className="card-1">
            <img src={AD1} width={190} height={145} />
            <div className="card-content" style={{ padding: "8px " }}>
              <div className="line"></div>
              <span className="title">How to run Ad.</span>
              <p className="description">
                The Ads shall run on the public Video contents of Sledge.
                {/* Which
                may have the button to navigate to <br></br> the desired Website, App,
                Forms, or Other places as <br></br>set by the Ad runner. */}
              </p>
              <Link to="/adcampaign" state={selectedTab}>
                <Button className="button">
                  <span>Start Campaigning</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  const PreviousCampaign = () => {
    return (
      <Card className="start-card">
        <div className="card2-root">
          <div className="card-2">
            <img src={AD2} width={190} height={190} />
            <div className="card2-content">
              <div className="line"></div>
              <span className="title">Check Campaign</span>
              <p className="description">
                Check details of previous campaigns to understand the Market &
                Target your customers Effectively{" "}
              </p>
              <Link to="/prevcampaign" state={selectedTab}>
                <Button className="button">
                  <span>Previous Campaigns</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <>
      <div className="plan-label">Do Ad Campaigns in Sledge</div>
      <div className="image-container">
        <Grid
          container
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <StartCampain />
          <PreviousCampaign />
        </Grid>
      </div>
      <Divider variant="middle" style={{ backgroundColor: "#474747" }} />
      <Help />
    </>
  );
};

export default AdCampaignHome;
