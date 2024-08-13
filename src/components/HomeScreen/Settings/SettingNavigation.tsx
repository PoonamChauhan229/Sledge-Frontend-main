import React, { createContext, useEffect } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { ReactComponent as SubscriptionIcon } from "../../../assets/subscription.svg";
import { ReactComponent as AdCampaignIcon } from "../../../assets/ad_campaign.svg";
import { ReactComponent as LearnSledgingIcon } from "../../../assets/learn_sledging.svg";
import { ReactComponent as GeneralGuidelinesIcon } from "../../../assets/general_guidelines.svg";
import SubscriptionPlans from "./SubscriptionPlans/SubscriptionPlans";
import "./SettingNavigation.css";
import AdCampaignHome from "./AdCampainHome";
import { DefaultContent } from "./DefaultSettingsContent";
import LearnSledge from "./LearnSledging/LearnSledging";
import GeneralGuid from "./GeneralGuid/GeneralGuid";
import { useLocation } from "react-router-dom";

const SettingNavigation: React.FC = () => {
  const [value, setValue] = React.useState<number | false>(false);
  const location = useLocation();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (location.state) {
      setValue(location.state);
    }
  }, [location]);

  const getTabStyle = (index: number) => ({
    color: "#FFFF",
    backgroundImage:
      value === index
        ? "linear-gradient(180deg, #01E5D4 0%, #137AEA 83%)"
        : "linear-gradient(180deg, black, black)",
    borderRadius: "8px",
    margin: "0 8px",
    padding: "8px 16px",
  });

  return (
    <Box className="navigation">
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        TabIndicatorProps={{ style: { backgroundColor: "transparent" } }}
      >
        {[
          SubscriptionIcon,
          AdCampaignIcon,
          LearnSledgingIcon,
          GeneralGuidelinesIcon,
        ].map((IconComponent, index) => (
          <Tab
            key={index}
            label={
              <Box className="tab-container">
                <div
                  className="icon-container"
                  style={{
                    background: value === index ? "#3358FF" : "#111111",
                  }}
                >
                  <IconComponent />
                </div>
                <span
                  style={{
                    textTransform: "none",
                    fontSize: "20px",
                    textAlign: "left",
                  }}
                >
                  {
                    [
                      "Subscription",
                      "Ad Campaign",
                      "Learn SLEDGING",
                      "General Guidelines",
                    ][index]
                  }
                </span>
              </Box>
            }
            sx={getTabStyle(index)}
          />
        ))}
      </Tabs>
      {value === 0 && <SubscriptionPlans />}
      {value === 1 && <AdCampaignHome selectedTab={value} />}
      {value === 2 && <LearnSledge />}
      {value === 3 && <GeneralGuid />}

      {value === false && <DefaultContent />}
    </Box>
  );
};

export default SettingNavigation;
