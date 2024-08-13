import React, { useState } from "react";
import { List, ListItem, ListItemIcon, IconButton } from "@mui/material";
import { ReactComponent as BrandLogo } from "../../../../../assets/Sledge-s.svg";
import "./Sidebar.css";
import { VideoIcon } from "../VideoIcon";
import { TroubleshootIcon } from "../ChatIcon";
import { AddPersonIcon } from "../AddPersonIcon";
import Troubleshoot from "../SideBarComponents/Troubleshoot";
import AddPeers from "./AddPeers";

interface SidebarProps {
  setActiveTab: (tab: number) => void;
  setSelectedPeer: (peer: { id: string, name: string } | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveTab, setSelectedPeer }) => {
  const [selectedItem, setSelectedItem] = useState<string>("video");

  const handleSelectItem = (item: string) => {
    setSelectedItem(item);
    if (item === 'video') {
      setActiveTab(0);
    }
  };

  const sideBarSelectedIconBase64 = btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="109" viewBox="0 0 120 109" fill="none"><path d="M0 30H89.5C106.109 30 119.862 16.6088 120 0V109C119.862 92.3912 106.109 79 89.5 79H0V30Z" fill="#2A2A2A"/><circle cx="111" cy="55" r="4" fill="white"/></svg>`
  );

  return (
    <>
      <div className="sidebar">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <IconButton
            color="inherit"
            style={{ paddingTop: "20px", paddingBottom: "20px" }}
          >
            <BrandLogo />
          </IconButton>
          <List>
            <ListItem
              onClick={() => handleSelectItem("video")}
              style={{
                backgroundImage:
                  selectedItem === "video"
                    ? `url('data:image/svg+xml;base64,${sideBarSelectedIconBase64}')`
                    : "none",
                backgroundSize: "cover",
                padding: "30px 18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ListItemIcon>
                <VideoIcon
                  color={selectedItem === "video" ? "white" : "#4F4F4F"}
                />
              </ListItemIcon>
            </ListItem>
            <ListItem
              onClick={() => handleSelectItem("addPeers")}
              style={{
                backgroundImage:
                  selectedItem === "addPeers"
                    ? `url('data:image/svg+xml;base64,${sideBarSelectedIconBase64}')`
                    : "none",
                backgroundSize: "cover",
                padding: "30px 18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ListItemIcon>
                <AddPersonIcon
                  color={selectedItem === "addPeers" ? "white" : "#4F4F4F"}
                />
              </ListItemIcon>
            </ListItem>
            <ListItem
              onClick={() => handleSelectItem("troubleshoot")}
              style={{
                backgroundImage:
                  selectedItem === "troubleshoot"
                    ? `url('data:image/svg+xml;base64,${sideBarSelectedIconBase64}')`
                    : "none",
                backgroundSize: "cover",
                padding: "30px 18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ListItemIcon>
                <TroubleshootIcon
                  color={selectedItem === "troubleshoot" ? "white" : "#4F4F4F"}
                />
              </ListItemIcon>
            </ListItem>
          </List>
        </div>
      </div>
      {selectedItem === "addPeers" && <AddPeers setActiveTab={setActiveTab} setSelectedPeer={setSelectedPeer} />}

      {selectedItem === "troubleshoot" && <Troubleshoot />}
    </>
  );
};

export default Sidebar;
