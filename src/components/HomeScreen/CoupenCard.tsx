import React from 'react';
import { Paper, Typography } from '@mui/material';
import CouponS from '../../assets/coupon-s.png';
import { ReactComponent as Calender } from '../../assets/CouponCalender.svg';
import { ReactComponent as Timer } from '../../assets/Vector.svg';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface CouponProps {
  profilePic: string;
  designation: string;
  eventTitle: string;
  eventPhoto: string;
  isCustomEventTitle: boolean;
}

export const StyledEventTitle = styled.span`
  font-size: 16px;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 1);
  text-transform:none;
`;

const Coupon: React.FC<CouponProps> = ({ profilePic, designation, eventTitle, eventPhoto, isCustomEventTitle = false }) => {
  const navigate = useNavigate();
  return (
    <Paper style={{ padding: '20px', position: 'relative', backgroundColor: "#1B1B1B", color: "#fff", display: "flex", cursor: "pointer" }} onClick={() => navigate('/join-event')}>
      <img src={CouponS} alt='coupon sledge logo' height={50} width={50} className='coupon-s' />
      <div className='coupon'>
        <div className='left-part'>
        </div>
        <div className='center-part'>
          {/* <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: 600, margin: "5px" }}>{eventTitle}</Typography> */}
          {/* {isCustomEventTitle ? (
            <StyledEventTitle>{eventTitle}</StyledEventTitle>
          ) : ( */}
          <Typography variant="body2" sx={{ fontSize: "14px", fontWeight: 600, margin: "5px", textTransform: "none" }}>
            {eventTitle}
          </Typography>
          {/* // )} */}
          <div style={{ display: "flex", justifyContent: "space-between", margin: "5px" }}>
            <Typography variant='body2' sx={{ fontSize: "12px" }}><Calender style={{ height: "12px" }} />Feb 10,2024</Typography>
            <Typography variant='body2' sx={{ fontSize: "12px" }}><Timer style={{ height: "12px" }} />8.20 PM</Typography>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", margin: "5px" }}>
            <div>
              <span style={{ fontSize: "13px", color: "#E7E8EF" }}>Hosted By:</span>
              <Typography variant='body2' sx={{ fontSize: "13px", fontWeight: "bold" }}>Kapadila Ehtehs</Typography>
            </div>
            <div>
              <span style={{ fontSize: "13px", color: "#E7E8EF" }}>Paid:</span>
              <Typography variant='body2' sx={{ fontSize: "13px", fontWeight: "bold" }}>₹1000</Typography>
            </div>
          </div>
        </div>
        <div className='right-part' style={{ margin: "5px" }}>
        </div>
      </div>
    </Paper>
  );
};

export default Coupon;
