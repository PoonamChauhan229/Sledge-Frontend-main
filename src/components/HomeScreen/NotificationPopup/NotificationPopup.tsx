import React from "react";
import { Modal, Typography, IconButton, Box, Button, Card, CardContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./NotificationPopup.css";
import axios from "axios";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

interface NotificationPopupProps {
  open: boolean;
  onClose: () => void;
  notifications: NotificationData[];
  onNotificationRead: (notificationId: string) => void;
  setNotifications: React.Dispatch<React.SetStateAction<NotificationData[]>>;
}

interface NotificationData {
  date: string;
  notifications: NotificationItem[];
}


interface NotificationItem {
  _id: string;
  added_time: string;
  is_seen: boolean;
  message: string;
  notification_type: string;
  post_id: {
    _id: string;
    title: string;
    post_type: string;
    start_date: string;
    end_date: string;
  };
  user_id: {
    _id: string;
    name: string;
    user_name: string;
    profile_pic: string;
  };
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({
  open,
  onClose,
  notifications,
  onNotificationRead,
  setNotifications
}) => {

  const [upcomingEvents, setUpcomingEvents] = React.useState<NotificationItem[]>([]);
  const [showAll, setShowAll] = React.useState(false);

  React.useEffect(() => {
    const checkUpcomingEvents = () => {
      const currentDate = new Date();
      const upcomingNotifications: NotificationItem[] = [];

      notifications.forEach((group: NotificationData) => {
        group.notifications.forEach((notification: NotificationItem) => {
          const startDate = new Date(notification.post_id.start_date);
          const timeDiff = startDate.getTime() - currentDate.getTime();
          const minutesDiff = Math.floor(timeDiff / (1000 * 60));
          return minutesDiff === 5;
          // if (minutesDiff < 0 && minutesDiff <= 5) {
          //   upcomingNotifications.push(notification);
          //   console.log("hi notificationss", upcomingNotifications)
          // }
        });
      });

      setUpcomingEvents(upcomingNotifications);
      // console.log("upcoming notifications....", upcomingEvents)
    };

    checkUpcomingEvents();
    const intervalId = setInterval(checkUpcomingEvents, 10000);

    return () => clearInterval(intervalId);
  }, [notifications]);

  const renderUpcomingEventNotification = (event: NotificationItem) => {
    const startDate = new Date(event.post_id.start_date);
    const currentDate = new Date();
    const minutesUntilStart = Math.floor((startDate.getTime() - currentDate.getTime()) / (1000 * 60));
    const postType = event.post_id.post_type;

    return (
      <>
        {postType === "Post" && (
          <Box className="post-notification" key={event._id}>
            <Box className="post-notification-content" >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" sx={{ color: "#ffffff", fontWeight: "bold" }}>
                  {event.user_id.name}' Post
                </Typography>
                <IconButton size="small" className="close-button" onClick={(e) => handleRemoveNotification(event._id, e)}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", gap: "8px" }}>
                  <MailOutlineIcon />
                  <Typography variant="body2" sx={{ color: "#01E5D4" }}>
                    You earned a credit!
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: "#808080" }}>
                  {new Date(parseInt(event.added_time)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
        {(postType === "Meeting" || postType === "Event") && minutesUntilStart && (
          <Box className="upcoming-event-notification" key={event._id}>
            <Box className="notification-content">
              <Box sx={{ display: "flex", gap: "3px", fontSize: "40px", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex" }}>
                  <NotificationsActiveIcon sx={{ color: 'orange' }} />
                  <Typography variant="subtitle2" className="event-time">
                    {postType} Starts in {minutesUntilStart} mins
                  </Typography>
                </Box>
                <IconButton size="small" className="close-button" onClick={(e) => handleRemoveNotification(event._id, e)}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
              <Typography variant="body1" className="user-name">{event.user_id.name}</Typography>
              <Box className="event-details" sx={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
                <Typography variant="body2" className="event-title">{event.post_id.title}</Typography>
                <Typography variant="caption" className="timestamp">{new Date(startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Typography>
              </Box>
            </Box>
          </Box>
        )}
      </>
    );
  };

  const renderNotifications = () => {
    // const allNotifications = notifications.flatMap((group) =>
    //   group.notifications.filter((notification) => !notification.is_seen)
    // );

    const allNotifications = notifications.flatMap((group) => group.notifications);
    const notificationsToShow = showAll ? allNotifications : allNotifications.slice(0, 5);

    return notificationsToShow.map((notification: NotificationItem) => (
      <div key={notification._id} className={`notification-item ${!notification.is_seen ? 'unread' : 'read'}`} onClick={() => handleNotificationClick(notification._id)} style={{ cursor: 'pointer' }}>
        <Box className="notification-contents">
          <Box className="notification-message" sx={{ display: "flex", gap: "3px", fontSize: "40px", justifyContent: "space-between" }}>
            <Typography variant="subtitle2" className="notification-title">
              {notification.user_id.name}
            </Typography>
            <IconButton
              size="small"
              onClick={(e) => handleRemoveNotification(notification._id, e)}
              className="close-button"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", gap: "6px" }}>
            <MailOutlineIcon sx={{ color: notification.post_id.post_type == "Meeting" ? "#4ADE80" : "#7089FB" }} className={`${notification.post_id.post_type == "Meeting" ? ".notification-meeting-item" : ".notification-event-item"}`} />
            <Typography variant="body2" className="notification-text" sx={{ color: "#ffffff" }}>
              Invite : {notification.post_id.title}
            </Typography>
          </Box>
          {notification.notification_type === "NEW_MEETING" && (
            <Box sx={{ display: "flex", gap: "3px", fontSize: "40px", justifyContent: "space-between" }}>
              <Box className="notification-actions" mt={1} sx={{ display: "flex" }}>
                <Button
                  size="small"
                  onClick={() => handleMeetingResponse(notification.post_id._id, 'Accepted')}
                  sx={{ marginRight: '8px', textTransform: "none", fontWeight: "700px", color: notification.post_id.post_type == "Meeting" ? "#4ADE80" : "#7089FB", fontSize: "18px", fontFamily: "Calibri" }}>
                  Accept
                </Button>
                <Button
                  size="small"
                  onClick={() => handleMeetingResponse(notification.post_id._id, "Rejected")}
                  sx={{ marginRight: '8px', textTransform: "none", fontWeight: "400px", color: "#5f5f5f", fontSize: "18px", fontFamily: "Calibri" }}>
                  Decline
                </Button>
              </Box>
              <Typography variant="caption" className="timestamp">{new Date(parseInt(notification.added_time)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Typography>
            </Box>
          )}
        </Box>
      </div>
    ));
  };

  const handleMeetingResponse = async (postId: string, status: 'Accepted' | 'Rejected') => {
    try {
      const response = await axios.put('http://65.0.19.86:8000/Post/change_quick_meeting_status', {
        post_id: postId,
        status: status
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200) {
        console.log(`Meeting ${status ? 'accepted' : 'declined'} successfully`);
        setNotifications(prevData =>
          prevData.map((group: NotificationData) => ({
            ...group,
            notifications: group.notifications.map((notification: NotificationItem) =>
              notification.post_id._id === postId
                ? { ...notification, meeting_status: status, is_seen: true }
                : notification
            )
          }))
        );
      } else {
        console.error('Failed to update meeting status');
      }
    } catch (error) {
      console.error('Error updating meeting status:', error);
    }
  };

  const handleNotificationClick = async (notificationId: string) => {
    try {
      const response = await axios.put('http://65.0.19.86:8000/User/read_notification', {
        notification_id: notificationId
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200) {
        console.log(`Notification ${notificationId} marked as read`);
        onNotificationRead(notificationId);
      } else {
        console.error('Failed to mark notification as read');
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleRemoveNotification = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setNotifications(prevData =>
      prevData.map(group => ({
        ...group,
        notifications: group.notifications.filter(notification => notification._id !== id)
      })).filter(group => group.notifications.length > 0)
    );
  };

  const handleClearAll = async () => {
    try {
      const response = await axios.put('http://65.0.19.86:8000/User/clear_notifications', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (response.status === 200) {
        console.log('Notifications Cleared');
        setNotifications([]);
      } else {
        console.error('Failed to clear notifications');
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleViewAll = () => {
    setShowAll(true);
    setTimeout(() => {
      const notificationContainer = document.getElementById('notification-container');
      if (notificationContainer) {
        notificationContainer.scrollTop = notificationContainer.scrollHeight;
      }
    }, 0);
  };

  const handleClose = () => {
    setShowAll(false);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="modal"
    >
      <div id="modal-modal-description" className="notification-modal-box">

        <div id="notification-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {notifications.length > 0 ?
            <Box>
              {upcomingEvents.map(renderUpcomingEventNotification)}
              {renderNotifications()}
            </Box>
            : (
              <Typography className="notification-content">
                No notifications available.
              </Typography>
            )}
        </div>
        {notifications.length > 0 && (
          <div>
            <Button
              size="small"
              sx={{ marginRight: '8px', textTransform: "none", padding: "6px", margin: "6px", fontWeight: "400px", color: "#ccc", fontSize: "18px", fontFamily: "Calibri" }}
              onClick={() => handleClearAll()}
            >
              Clear All
            </Button>
          </div>
        )}
        {notifications.length > 5 && (
          <Box sx={{ background: "#1B1B1B", borderRadius: "0px 0px 9px 9px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Button
              size="small"
              sx={{ marginRight: '8px', textTransform: "none", padding: "6px", fontWeight: "400px", color: "#ccc", fontSize: "18px", fontFamily: "Calibri" }}
              onClick={handleViewAll}
            >
              View All
            </Button>
          </Box>
        )}
      </div>
    </Modal>
  );
};

export default NotificationPopup;