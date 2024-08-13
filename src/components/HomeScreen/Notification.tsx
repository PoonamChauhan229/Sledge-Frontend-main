import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface Notification {
  id: number;
  message: string;
}

const SnackbarExample: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = (id: number) => {
    setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== id));
  };

  const handleOpen = (message: string) => {
    const newNotification: Notification = {
      id: Math.random(),
      message: message
    };
    setNotifications(prevNotifications => [...prevNotifications, newNotification]);
    setOpen(true);
  };

  return (
    <div>
      {notifications.map(notification => (
        <Snackbar
          key={notification.id}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={open}
          autoHideDuration={6000}
          onClose={() => handleClose(notification.id)}
          message={notification.message}
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => handleClose(notification.id)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      ))}
      <button onClick={() => handleOpen('This is a notification')}>Show Notification</button>
    </div>
  );
};

export default SnackbarExample;