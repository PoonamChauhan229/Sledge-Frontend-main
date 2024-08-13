import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import image1 from "../../../../assets/background1.jpg";
import image2 from "../../../../assets/background2.jpg";
import image3 from "../../../../assets/background3.jpg";
import image4 from "../../../../assets/background4.jpg";
import image5 from "../../../../assets/Rectangle 34625306image5.png";
import image6 from "../../../../assets/Rectangle 34625306image6.png";

import solid1 from "../../../../assets/Rectangle 34625306solid1.png";
import solid2 from "../../../../assets/Rectangle 34625306solid2.png";
import solid3 from "../../../../assets/Rectangle 34625306solid3.png";
import solid4 from "../../../../assets/Rectangle 34625306solid4.png";
import solid5 from "../../../../assets/Rectangle 34625306solid5.png";

import abstract1 from "../../../../assets/Rectangle 34625306ab1.png";
import abstract2 from "../../../../assets/Rectangle 34625306ab2.png";
import abstract3 from "../../../../assets/Rectangle 34625306ab3.png";
import abstract4 from "../../../../assets/Rectangle 34625306ab4.png";
import abstract5 from "../../../../assets/Rectangle 34625306ab5.png";

import "./BackgroundModal.css";

const imageBackgrounds = [image1, image2, image3, image4, image5, image6];
const solidBackgrounds = [solid1, solid2, solid3, solid4, solid5];
const abstractBackgrounds = [
  abstract1,
  abstract2,
  abstract3,
  abstract4,
  abstract5,
];

interface BackgroundModalProps {
  open: boolean;
  handleClose: () => void;
  setSelectedBackground: (image: string) => void;
}

const BackgroundModal: React.FC<BackgroundModalProps> = ({
  open,
  handleClose,
  setSelectedBackground,
}) => {
  const [selectedBackground, handleSelectBackground] = useState<string>(image1);

  const handleSetBackground = () => {
    if (selectedBackground) {
      setSelectedBackground(selectedBackground);
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modal-box">
        <Card style={{ borderRadius: "21px", height: "300px" }}>
          <CardMedia
            height={300}
            component="img"
            image={selectedBackground}
            alt="Selected Background"
          />
        </Card>
        <Box className="image-container-scrollable">
          <div className="image-container">
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Solid
            </Typography>
            <Grid container spacing={2}>
              {solidBackgrounds.map((image) => (
                <Grid item xs={4} key={image}>
                  <Card
                    className={`background-card ${
                      selectedBackground === image ? "selected" : ""
                    }`}
                    onClick={() => handleSelectBackground(image)}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={image}
                        style={{ height: 100 }}
                      />
                      {selectedBackground === image && (
                        <CheckCircleIcon className="selected-icon" />
                      )}
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Typography variant="subtitle1" sx={{ mb: 2, mt: 2 }}>
              Images
            </Typography>
            <Grid container spacing={2}>
              {imageBackgrounds.map((image) => (
                <Grid item xs={4} key={image}>
                  <Card
                    className={`background-card ${
                      selectedBackground === image ? "selected" : ""
                    }`}
                    onClick={() => handleSelectBackground(image)}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={image}
                        style={{ height: 100 }}
                      />
                      {selectedBackground === image && (
                        <CheckCircleIcon className="selected-icon" />
                      )}
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Typography variant="subtitle1" sx={{ mb: 2, mt: 2 }}>
              Abstract
            </Typography>
            <Grid container spacing={2}>
              {abstractBackgrounds.map((image) => (
                <Grid item xs={4} key={image}>
                  <Card
                    className={`background-card ${
                      selectedBackground === image ? "selected" : ""
                    }`}
                    onClick={() => handleSelectBackground(image)}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={image}
                        style={{ height: 100 }}
                      />
                      {selectedBackground === image && (
                        <CheckCircleIcon className="selected-icon" />
                      )}
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </Box>
        <Box className="modal-actions">
          <Button variant="contained" onClick={handleSetBackground}>
            Set Background
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default BackgroundModal;
