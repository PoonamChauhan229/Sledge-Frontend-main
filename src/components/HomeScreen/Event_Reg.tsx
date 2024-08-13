import { Button, Grid, Rating, Typography } from "@mui/material";
import React from "react";
import ProfilePic from '../../assets/Profile.png';
import RegisterImg from '../../assets/meeting-girl.png';
import { Avatar } from "stream-chat-react";
import { ReactComponent as Notes } from '../../assets/Note-Reg.svg';
import { ReactComponent as Chair } from '../../assets/waiting-room.svg';
import { ReactComponent as ShareIcon } from '../../assets/Share-icon.svg';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from "react-router-dom";
const EventReg: React.FC = () => {
    const [value, setValue] = React.useState<number | null>(4);
    return (
        <Grid container sx={{ color: "#fff", padding: "2rem 5rem" }}>
            <Grid item xs={12}>
            <div style={{ display: "flex", alignItems: "center", padding: "20px",margin:"2%" }}>
                    <Typography sx={{ textAlign: "center",}}>
                        <Link to="/home" style={{ color: "#FFFFFFCC", textDecoration: "none" }}>
                            <ArrowBackIosIcon />
                        </Link>
                    </Typography>
                    <Typography variant='h5' sx={{ color: "#fff", textAlign: "center", flex: "1",fontWeight:"bold" }}>Event Registration</Typography>
                </div>
                {/* <Typography variant="h5" align="center" sx={{ margin: "3rem 0" }}>Event Registration</Typography> */}
            </Grid>
            <Grid item xs={6} sx={{ padding: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img src={ProfilePic} height={30} width={30} />
                        <div style={{ marginLeft: "5px" }}>
                            <h4 style={{ margin: 0 }}>Kapadila Ehsteshem</h4>
                            <p style={{ margin: 0 }}>kep_09_eht</p>
                        </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            sx={{ color: "skyblue" }}
                        />
                        <div>
                            <h5 style={{ margin: 0 }}>5 star</h5>
                            <p style={{ margin: 0, color: "gray" }}>128 reviews</p>
                        </div>
                    </div>
                </div>
                <img src={RegisterImg} alt="registering girl" style={{ width: "100%", borderRadius: "10px", margin: "5px" }} />
                <div style={{ display: "flex", justifyContent: "space-between",margin:"10px" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Notes />
                        <div style={{ marginLeft: "5px" }}>
                            <h4 style={{ margin: 0 }}>Sunday, Febraury 18</h4>
                            <p style={{ margin: 0, color: "gray" }}>8:30 PM - 9:30 PM GMT+5:30</p>
                        </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Chair />
                        <div style={{ marginLeft: "5px" }}>
                            <h4 style={{ margin: 0 }}>5/15</h4>
                            <p style={{ margin: 0, color: "gray" }}>Seats Available</p>
                        </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <ShareIcon />
                        <p style={{ margin: 0, color: "gray" }}>Share</p>
                    </div>
                </div>
                <div style={{display:"flex",margin:"10px"}}>
                  <img src={ProfilePic} height={30} width={30} style={{margin:"5px"}}/>
                  <img src={ProfilePic} height={30} width={30} style={{margin:"5px"}}/>
                  <img src={ProfilePic} height={30} width={30} style={{margin:"5px"}}/>
                  <img src={ProfilePic} height={30} width={30} style={{margin:"5px"}}/>
                  <img src={ProfilePic} height={30} width={30} style={{margin:"5px"}}/>
                  <img src={ProfilePic} height={30} width={30} style={{margin:"5px"}}/>
                </div>
                <p style={{ margin: 0, color: "gray" }}>Aaarti, Abdullah, Rajesh, Riya, Dev & 15 Others Registered the Event</p>
                <Button variant="contained" sx={{margin:"2.5rem 0px",textTransform:"capitalize"}} className="reg-button">Register Now @ ₹ 250 </Button>
            </Grid>
            <Grid item xs={6} sx={{padding:"1rem"}}>
                <p style={{ margin: 0, color: "gray" }}>Event Title</p>
                <Typography variant="h5" sx={{fontWeight:"bold"}}>Updated in Digital Marketing Event (2024)</Typography>
                <p style={{ marginTop: "2rem", color: "gray" }}>Event Description</p>
                <p>Embarking on the highly anticipated Remote Revolution Season 2 with a surge of enthusiasm!🌊</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                     when an unknown printer took a galley of type and scrambled it to 
                    make a type specimen book. It has survived not only five centuries, </p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                     when an unknown printer took a galley of type and scrambled it to 
                    make a type specimen book. It has survived not only five centuries, </p>
                    <p style={{ marginTop: "3rem", color: "gray" }}>Instructions:</p>
                <Typography variant="h6" sx={{fontWeight:"bold",marginBottom:"1rem"}}>1. For the Joinees</Typography>
                <Typography variant="h6" sx={{fontWeight:"bold"}}>2. While they join the meet</Typography>
            </Grid>
        </Grid>
    );
};

export default EventReg;