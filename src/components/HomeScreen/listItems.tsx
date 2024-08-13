import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { ReactComponent as SledgeIcon } from "../../assets/S-Hub-Icon.svg";
import { ReactComponent as HomeIcon } from '../../assets/HomeIcon.svg';
import { ReactComponent as HostIcon } from '../../assets/Plus-icon.svg';
import { ReactComponent as ChatIcon } from '../../assets/Chats-icon.svg';
import { ReactComponent as PlusIcon } from '../../assets/HostEvent-icon.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Popover,
  Button,
  Box
} from '@mui/material';

interface ProfileMenuProps {
  handleMenuItemClick: (content: string) => void;
}

interface ProfileData {
  profile_pic: string;
  name: string;
  designation: string;
}
type ProfileProps = {
  profileData: ProfileData | null;
};

export const MainListItems = () => {
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleItemClick = (item: string, path: string) => {
    setSelectedItem(item);
    navigate(path);
  };
  return (
    <React.Fragment>
      <ListItemButton
        selected={currentPath === "/home"}
        onClick={() => navigate("/home")}
      >
        <ListItemIcon>
          <HomeIcon style={{ color: "white", margin: "auto" }} />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton
        selected={currentPath === "/chatstream"}
        onClick={() => navigate("/chatstream")}
      >
        <ListItemIcon>
          <ChatIcon style={{ margin: "auto" }} />
        </ListItemIcon>
        <ListItemText primary="Chats" />
      </ListItemButton>
      <ListItemButton
        selected={currentPath === "/hosteventshome"}
        onClick={() => navigate("/hosteventshome")}
      >
        <ListItemIcon>
          <HostIcon style={{ margin: "auto" }} />
        </ListItemIcon>
        <ListItemText primary="Host Events" />
      </ListItemButton>
      <ListItemButton
        selected={currentPath === "/createpost"}
        onClick={() => navigate("/createpost")}
      >
        <ListItemIcon>
          <PlusIcon style={{ margin: "auto" }} />
        </ListItemIcon>
        <ListItemText primary="Post" />
      </ListItemButton>
      <ListItemButton
        selected={currentPath === "/settings"}
        onClick={() => navigate("/settings")}
      >
        <ListItemIcon>
          <SledgeIcon style={{ margin: "auto" }} />
        </ListItemIcon>
        <ListItemText primary="Sledge Hub" />
      </ListItemButton>
    </React.Fragment>
  );
};

export const ProfileMenu: React.FC<ProfileMenuProps> = ({
  handleMenuItemClick,
}) => (
  <>
    <ListItemButton onClick={() => handleMenuItemClick("Privacy")}>
      <ListItemIcon>
        <HomeOutlinedIcon sx={{ color: "#fff", margin: "auto" }} />
      </ListItemIcon>
      <ListItemText primary="Privacy" />
    </ListItemButton>
    <ListItemButton onClick={() => handleMenuItemClick("Notification")}>
      <ListItemIcon>
        <ChatIcon style={{ margin: "auto" }} />
      </ListItemIcon>
      <ListItemText primary="Notification" />
    </ListItemButton>
    <ListItemButton onClick={() => handleMenuItemClick("Contents")}>
      <ListItemIcon>
        <HostIcon style={{ margin: "auto" }} />
      </ListItemIcon>
      <ListItemText primary="Contents" />
    </ListItemButton>
    <ListItemButton onClick={() => handleMenuItemClick("Payments")}>
      <ListItemIcon>
        <PlusIcon style={{ margin: "auto" }} />
      </ListItemIcon>
      <ListItemText primary="Payments" />
    </ListItemButton>
    <ListItemButton onClick={() => handleMenuItemClick("Others")}>
      <ListItemIcon>
        <SettingsOutlinedIcon sx={{ color: "#fff", margin: "auto" }} />
      </ListItemIcon>
      <ListItemText primary="Others" />
    </ListItemButton>
  </>
);

export const Profile: React.FC<ProfileProps> = React.memo(({ profileData }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewProfile = () => {
    navigate('/profile', { state: { prop1: profileData } });
    handleClose();
  };

  const handleLogout = () => {
    console.log('Logging out...');
    sessionStorage.removeItem("isLoggedIn");
    console.log("session storage", sessionStorage.getItem("isLoggedIn"))
    // window.location.reload();
    setTimeout(() => {
      navigate('/');
    }, 0);
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <img
            src={profileData?.profile_pic}
            height={32}
            width={32}
            style={{ borderRadius: '50%', margin: "auto" }}
            alt="Profile"
          />
        </ListItemIcon>
        <div style={{ display: "flex", flexDirection: "column", marginLeft: "8px" }}>
          <ListItemText primary={profileData?.name} sx={{ color: "#fff", margin: 0 }} />
          <ListItemText primary={profileData?.designation} sx={{ color: "gray", margin: 0 }} />
        </div>
      </ListItemButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: '#333',
              color: '#fff',
              borderRadius: '4px',
              border: "1px solid #666666",
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            }
          }
        }}
      >
        <Box sx={{ p: 0.5, minWidth: 120, }}>
          <Button
            onClick={handleViewProfile}
            fullWidth
            sx={{
              justifyContent: 'flex-start', color: '#fff', py: 0.5, textTransform: "none", '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
            }}
          >
            View Profile
          </Button>
          <Button
            onClick={handleLogout}
            fullWidth
            sx={{
              justifyContent: 'flex-start', color: '#fff', py: 0.5, textTransform: "none", '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
            }}
          >
            Logout
          </Button>
        </Box>
      </Popover>
    </>
  );
});


// export const Profile: React.FC<ProfileProps> = React.memo(({ profileData }) => {
//   const navigate = useNavigate();


//   return (
//     <ListItemButton onClick={() => navigate('/profile', { state: { prop1: profileData } })}>
//       <ListItemIcon>
//         <img src={profileData?.profile_pic} height={32} width={32} style={{ borderRadius: '50%', margin: "auto" }} />
//       </ListItemIcon>
//       <div style={{ display: "flex", flexDirection: "column", marginLeft: "8px" }}>
//         <ListItemText primary={profileData?.name} sx={{ color: "#fff", margin: 0 }} />
//         <ListItemText primary={profileData?.designation} sx={{ color: "gray", margin: 0 }} />
//       </div>
//     </ListItemButton>

//   );
// });