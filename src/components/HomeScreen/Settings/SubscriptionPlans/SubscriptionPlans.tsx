import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ReactComponent as FreeIcon } from "../../../../assets/Paper Plane.svg";
import { ReactComponent as FreeIconWhite } from "../../../../assets/white-bg.svg";

import { ReactComponent as CheckWhiteCircleIcon } from "../../../../assets/Check Circle.svg";
import { ReactComponent as Minus } from "../../../../assets/minus.svg";
import "./SubscriptionPlans.css";

interface Plan {
  title: string;
  subtitle: string;
  description?: string;
  features: string[];
  buttonText: string;
  buttonColor?: string;
}

const freePlan: Plan = {
  title: "For Everyone",
  subtitle: "Free",
  features: [
    "Quick Meeting",
    "Upto 15 Audience",
    "Unlimited Minutes",
    "Featured Host / Admin Control",
    "White Board",
    "AI Assistant",
    "Notify Audience",
    "Only your followers(Email / Sledge Notification)",
    "File Sharing",
    "Audience Control",
    "Private Message",
    "Record",
  ],
  buttonText: "Get started",
  buttonColor: "#00BFFF",
};

const hostPlan: Plan = {
  title: "For Host",
  subtitle: "Free",
  features: [
    "Audience Pays",
    "Host shall set a pricing for the Event. Which the audience shall pay along with the platform charge.",
    "Featured Host / Admin Control",
    "White Board",
    "AI Assistant",
    "Notify Audience",
    "Only your followers(Email / Sledge Notification)",
    "File Sharing",
    "Audience Control",
    "Private Message",
    "Record",
  ],
  buttonText: "Get started",
  buttonColor: "#00BFFF",
};

const audiencePlan: Plan = {
  title: "For Audience",
  subtitle: "Free",
  description: "Host Needs to Chargeable",
  features: [
    "Featured Host / Admin Control",
    "White Board",
    "AI Assistant",
    "Notify Audience",
    "Only your followers(Email / Sledge Notification)",
    "File Sharing",
    "Audience Control",
    "Private Message",
    "Record",
  ],
  buttonText: "View Payment Details",
  buttonColor: "#1e88e5",
};

const FreePlanSubscriptionCard: React.FC<Plan> = ({
  title,
  subtitle,
  features,
  buttonText,
  buttonColor,
}) => (
  <Card className="subscription-card">
    <CardContent>
      <Box className="card-heading">
        <FreeIcon style={{ fill: "white" }} />
        <div className="text-heading">
          <Typography variant="h6" component="div" className="subtitle">
            {subtitle}
          </Typography>
          <Typography variant="h5" component="div" className="title">
            {title}
          </Typography>
        </div>
      </Box>
      <List dense>
        {features.map((feature, index) => (
          <ListItem key={index} className="feature-item">
            <ListItemIcon>
              {feature.startsWith("Quick") || feature.startsWith("Featured") ? (
                <ListItemText
                  className="feature-heading"
                  primary={feature}
                  sx={{ color: "#fff" }}
                />
              ) : (
                <>
                  {index === 1 || index === 2 ? (
                    <CheckCircleIcon
                      className="icon"
                      style={{ marginRight: "8px" }}
                    />
                  ) : feature.startsWith("Only") ? (
                    <Minus
                      className="icon"
                      style={{ marginRight: "8px", paddingLeft: "30px" }}
                    />
                  ) : (
                    <CheckWhiteCircleIcon
                      className="icon"
                      style={{ marginRight: "8px" }}
                    />
                  )}
                  <ListItemText
                    className="feature-text"
                    primary={feature}
                    sx={{ color: "#fff" }}
                  />
                </>
              )}
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        className="action-button"
        style={{ backgroundColor: buttonColor }}
      >
        {buttonText}
      </Button>
    </CardContent>
  </Card>
);

const HostPlanSubscriptionCard: React.FC<Plan> = ({
  title,
  subtitle,
  features,
  buttonText,
  buttonColor,
}) => (
  <Card className="subscription-card">
    <CardContent>
      <Box className="card-heading">
        <FreeIcon style={{ fill: "white" }} />
        <div className="text-heading">
          <Typography variant="h6" component="div" className="subtitle">
            {subtitle}
          </Typography>
          <Typography variant="h5" component="div" className="title">
            {title}
          </Typography>
        </div>
      </Box>
      <List dense>
        {features.map((feature, index) => (
          <ListItem key={index} className="feature-item">
            <ListItemIcon>
              {feature.includes("Audience Pays") ||
              feature.startsWith("Featured") ? (
                <ListItemText
                  className="feature-heading"
                  primary={feature}
                  sx={{ color: "#fff" }}
                />
              ) : (
                <>
                  {index === 1 ? (
                    <CheckCircleIcon
                      className="icon"
                      style={{ marginRight: "8px" }}
                    />
                  ) : feature.startsWith("Only") ? (
                    <Minus
                      className="icon"
                      style={{ marginRight: "8px", paddingLeft: "30px" }}
                    />
                  ) : (
                    <CheckWhiteCircleIcon
                      className="icon"
                      style={{ marginRight: "8px" }}
                    />
                  )}
                  <ListItemText
                    className="feature-text"
                    primary={feature}
                    sx={{ color: "#fff" }}
                  />
                </>
              )}
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        className="action-button"
        style={{ backgroundColor: buttonColor }}
      >
        {buttonText}
      </Button>
    </CardContent>
  </Card>
);

const AudiencePlanSubscriptionCard: React.FC<Plan> = ({
  title,
  subtitle,
  description,
  features,
  buttonText,
  buttonColor,
}) => (
  <Card
    className="subscription-card-audience"
    sx={{
      background: "linear-gradient(to bottom, #01E5D4, #137AEA)",
      borderRadius: "25px",
      width: "32%",
      marginTop: ".5rem",
    }}
  >
    <CardContent>
      <Box className="card-heading">
        <FreeIconWhite style={{ fill: "white" }} />

        <div className="text-heading">
          <Typography variant="h6" component="div" className="subtitle">
            {subtitle}
          </Typography>
          <Typography variant="h5" component="div" className="title">
            {title}
          </Typography>
          {description && (
            <Typography variant="body2" component="div" className="subtitle">
              {description}
            </Typography>
          )}
        </div>
      </Box>
      <List dense>
        {features.map((feature, index) => (
          <ListItem key={index} className="feature-item">
            <ListItemIcon>
              {feature.includes("Audience Pays") ||
              feature.startsWith("Featured") ? (
                <ListItemText
                  className="feature-heading"
                  primary={feature}
                  sx={{ color: "#fff" }}
                />
              ) : (
                <>
                  {feature.startsWith("Only") ? (
                    <Minus
                      className="icon"
                      style={{ marginRight: "8px", paddingLeft: "30px" }}
                    />
                  ) : (
                    <CheckWhiteCircleIcon
                      className="icon"
                      style={{ marginRight: "8px" }}
                    />
                  )}
                  <ListItemText
                    className="feature-text"
                    primary={feature}
                    sx={{ color: "#fff" }}
                  />
                </>
              )}
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "10px" }}
      >
        <Button
          variant="contained"
          className="action-button-audiance"
          style={{ backgroundColor: buttonColor }}
        >
          {buttonText}
        </Button>
      </div>
    </CardContent>
  </Card>
);

const SubscriptionPlans: React.FC = () => (
  <div className="sub-home-setting">
    <div className="plan-label"> Explore Subscription Plan </div>
    <Box className="subscription-plans-container">
      <FreePlanSubscriptionCard {...freePlan} />
      <HostPlanSubscriptionCard {...hostPlan} />
      <AudiencePlanSubscriptionCard {...audiencePlan} />
    </Box>
  </div>
);

export default SubscriptionPlans;
