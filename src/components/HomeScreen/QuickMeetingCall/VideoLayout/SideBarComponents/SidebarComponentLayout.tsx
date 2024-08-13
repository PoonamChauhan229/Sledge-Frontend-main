import { ChevronLeftIcon, ChevronRightIcon } from "@100mslive/react-icons";
import { Box, Drawer, IconButton } from "@mui/material";
import { useState } from "react";

interface SidebarComponentLayoutProps {
  component: any;
}

const SidebarComponentLayout: React.FC<SidebarComponentLayoutProps> = ({
  component,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {isDrawerOpen && (
        <Drawer
          variant="persistent"
          anchor="left"
          open={isDrawerOpen}
          className="drawer"
          sx={{
            width: 326,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 326,
              boxSizing: "border-box",
              backgroundColor: "#1a1a1a",
              color: "white",
            },
            "& .css-12i7wg6-MuiPaper-root-MuiDrawer-paper": {
              left: "unset",
            },
          }}
        >
          {component}
        </Drawer>
      )}
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: "fixed",
          left: isDrawerOpen ? 402 : 90,
          top: "10%",
          transform: "translateY(-50%)",
          backgroundColor: "#1a1a1a",
          color: "white",
          // border: "1px solid #ccc",
          borderRadius: "50%",
          "&:hover": {
            backgroundColor: "#2a2a2a",
            // border: "1px solid #ccc",
          },
          zIndex: 1200,
        }}
      >
        {isDrawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </Box>
  );
};

export default SidebarComponentLayout;
