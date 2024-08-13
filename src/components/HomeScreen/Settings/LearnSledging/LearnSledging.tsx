import React from "react";
import { Box, Button, Card, Divider, Grid } from "@mui/material";
import card1 from "../../../../assets/card1Img.png";
import card2 from "../../../../assets/card2Img.png";
import card3 from "../../../../assets/card3Img.png";
import card4 from "../../../../assets/card4Img.png";
import card5 from "../../../../assets/card5Img.png";
import card6 from "../../../../assets/card6Img.png";
import { ReactComponent as LineArrow } from "../../../../assets/Vector 123.svg";
import { Link } from "react-router-dom";
import Help from "../Help";

const LearnSledge: React.FC = () => {
  const imagesArr = [
    {
      cardName: "Events & Meeting",
      imgURL: card1,
      content:
        "Connect your Audience and Friends to Learn, Engage, Collaborate and Fun.",
    },
    {
      cardName: "Posts",
      imgURL: card2,
      content:
        "Show the world about your Day, Interests, Thoughts and attract like minded people",
    },
    {
      cardName: "Monetisation",
      imgURL: card3,
      content: "Create an income flow with Sledge using the Features offered.",
    },
    {
      cardName: "Socialise",
      imgURL: card4,
      content:
        "Connect and Explore communities, cultures, Knowledge sharing etc through chats, varies Events and Videos.",
    },
    {
      cardName: "Ads & Leads",
      imgURL: card5,
      content:
        "Market you ideas, products, or anything in Sledge and attract customers or prospects to your business.",
    },
    {
      cardName: "Copyright",
      imgURL: card6,
      content: "Protect your contents when it is use unauthorised in Sledge.",
    },
  ];
  return (
    <>
      <div className="plan-label">Learn SLEDGING</div>
      <div className="learn-container">
        <div className="card-container">
          {imagesArr.map((info, index) => {
            return (
              <Card className="learn-card" key={index}>
                <div className="card2-root-learn">
                  <div className="card-2-learn">
                    <img src={info.imgURL} width={180} height={90} />
                    <div className="card2-content-learn">
                      <div className="line"></div>
                      <span className="title">{info.cardName}</span>
                      <p className="learn-description">{info.content}</p>
                      <Link to="/settings">
                        <Button className="learn-button">
                          <span>Learn</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
      <Divider variant="middle" style={{ backgroundColor: "#474747" }} />
      <Help />
    </>
  );
};

export default LearnSledge;
