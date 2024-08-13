import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import ForgetPassImg from '../assets/ForgetpassImg.png';
import Logo from '../assets/BrandLogo.png';
import axios from 'axios';
import { BASE_URL_USER } from '../apiEndpoints';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const defaultTheme = createTheme();

export default function Resetpassword() {
  const [focused, setFocused] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState(false);
  const [passwordForm, setPasswordForm] = React.useState({
    password: '',
    confirmpassword: ''
  });
  const [resMsg, setResMsg] = React.useState('');
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<"success" | "error" | "info" | "warning" | undefined>(undefined);


  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const userInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrorMsg(false);
    setPasswordForm((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSnackbarOpen = (message: string, severity: "success" | "error" | "info" | "warning") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { password, confirmpassword } = passwordForm;
    if (!password.trim()) {
      // setErrorMsg(true);
      handleSnackbarOpen("All fields are required", 'error');
      return;
    }
    if (confirmpassword !== password) {
      // setErrorMsg(true);
      handleSnackbarOpen("Password not matched!", 'error');
      return;
    }
    let payload = {
      password: passwordForm.password,
      token: token
    }
    axios.post(BASE_URL_USER + 'reset_password', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        // setResMsg("Reset Link has been sent to your Email..!")
        handleSnackbarOpen("Password Changes Successfully!", 'success');
      })
      .catch((err: any) => {
        let resErr = JSON.parse(JSON.stringify(err.response.data)).message;
        setResMsg(resErr);
        handleSnackbarOpen(resErr, 'error');
        setErrorMsg(false);
      })
    setErrorMsg(false);
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }} className='forgotpass'>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} component={Paper} elevation={6} square sx={{ backgroundColor: "#1B1B1B" }} className='left-grid'>
          <Box
            sx={{
              my: 8,
              mx: 10,
              display: 'flex',
              flexDirection: 'column',
              color: "#FFF",
              marginTop: "10rem",
            }}
          >
            <img src={Logo} alt='brand logo' width={160} height={60} style={{ marginBottom: "85px", cursor: "pointer" }} onClick={() => navigate('/')} />

            <Typography component="h1" variant="h4">
              Reset Password
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                onFocus={handleFocus}
                onBlur={handleBlur}
                margin="normal"
                required
                fullWidth
                id="password"
                label="New Password"
                name="password"
                type='password'
                value={passwordForm.password}
                onChange={userInputChange}
                autoFocus
                className='inputs'
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: focused ? "25px" : '25px',
                    borderColor: focused ? '#fff' : '#fff',
                    borderWidth: focused ? '2px' : '1px',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: focused ? '#fff' : '#fff',
                    },
                  },
                  color: "#FFF", backgroundColor: "#FFFFFF33", borderRadius: "25px"
                }}
              />
              <TextField
                onFocus={handleFocus}
                onBlur={handleBlur}
                margin="normal"
                required
                fullWidth
                id="confirmpassword"
                label="Confirm New Password"
                name="confirmpassword"
                type='password'
                value={passwordForm.confirmpassword}
                onChange={userInputChange}
                className='inputs'
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: focused ? "25px" : '25px',
                    borderColor: focused ? '#fff' : '#fff',
                    borderWidth: focused ? '2px' : '1px',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: focused ? '#fff' : '#fff',
                    },
                  },
                  color: "#FFF", backgroundColor: "#FFFFFF33", borderRadius: "25px"
                }}
              />
              {/* {errorMsg && (
                <Typography variant="body2" color="white">
                  All Fields Are Required
                </Typography>
              )} */}
              {/* {resMsg && (
                <Typography variant="body2" color="white">
                  {resMsg}
                </Typography>
              )} */}
              <Button
                className='Getlink-button'
                type="submit"
                fullWidth
                variant="contained"
              >
                Reset
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          className='right-grid'
          item
          xs={12}
          sm={8}
          md={5}
          sx={{
            backgroundColor: "#1B1B1B",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <img src={ForgetPassImg} alt='Login page image' width={500} height={500} />
        </Grid>
      </Grid>
      <Snackbar open={openSnackbar} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </ThemeProvider>
  );
}