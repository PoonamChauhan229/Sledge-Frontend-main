import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Divider, IconButton, InputAdornment, Paper } from '@mui/material';
import AppleIcon from '@mui/icons-material/Apple';
import Logo from '../assets/BrandLogo.png';
import GoogleIcon from '../assets/GoogleLogo.png';
import SignupImg from '../assets/SignupBanner.png';
import axios, { AxiosError } from 'axios';
import { BASE_URL_USER } from '../apiEndpoints';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api';
import { GoogleLogin } from 'react-google-login';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { gapi } from 'gapi-script';
import FacebookLogin from 'react-facebook-login';

interface SignUpProps {
  onSignup: (email: string, password: string) => void;
}

interface RenderPropsType {
  onClick: () => void;
  disabled?: boolean;
}

interface ReactFacebookLoginInfo {
  id: string;
  name?: string;
  email?: string;
  accessToken: string;
  userID: string;
  picture?: {
    data: {
      url: string;
    };
  };
}

interface ReactFacebookFailureResponse {
  status?: string;
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export const SignUp: React.FC<SignUpProps> = ({ onSignup }) => {
  const navigate = useNavigate();
  const [focused, setFocused] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<"success" | "error" | "info" | "warning" | undefined>(undefined);
  const inputRef = React.useRef<google.maps.places.SearchBox | null>(null);

  const location = () => {
    const input = inputRef.current;
    if (input) {
      const places = input.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        console.log(place);
        setUserForm({
          ...userForm,
          location: place.formatted_address ?? '',
        });
      }
      console.log("place....", places)
    }
  };

  React.useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: "139552447584-opq4ep7hpa3fqjcfknm93qij5ujnhjfj.apps.googleusercontent.com" });
    })
  })

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const [userForm, setUserForm] = React.useState({
    name: '',
    email: '',
    phone_no: '',
    location: '',
    user_name: '',
    country_code: '+91',
    password: '',
    cnfpassword: ''
  });

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSnackbarOpen = (message: string, severity: "success" | "error" | "info" | "warning") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const userInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrorMsg(false);
    setUserForm((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }
  const device_id = Date.now().toString(36) + Math.random().toString(36);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Destructure values from userForm
    const { name, email, phone_no, location, user_name, password, cnfpassword } = userForm;

    // Validate form inputs
    if (!name.trim() || !email.trim() || !phone_no.trim() || !location.trim() || !user_name.trim() || !password.trim()) {
      // setErrorMsg(true);
      handleSnackbarOpen("Mandatory fields are required", 'error');
      return;
    }

    if (password !== cnfpassword) {
      // setErrorMsg(true);
      handleSnackbarOpen("Passwords do not match", 'error');
      return;
    }

    if (phone_no.length < 10 || phone_no.length > 10) {
      // setErrorMsg(true);
      handleSnackbarOpen("Invalid Phone number", 'error');
      return;
    }

    // Prepare payload for API request
    const payload = {
      name: userForm.name,
      email: userForm.email,
      country_code: userForm.country_code,
      phone_no: userForm.phone_no,
      location: userForm.location,
      user_name: userForm.user_name,
      password: userForm.password,
      registration_type: "EMAIL",
      device_id: device_id
    };

    // Make API request
    handleSignup(payload);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handleSignup = (payload: any) => {
    const { email, password } = userForm;
    axios.post(BASE_URL_USER + 'signup', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        // Handle successful response
        console.log('Response:', res.data);
        handleSnackbarOpen("Signed Up Successfully", 'success');
        setErrorMsg(false);
        onSignup(email, password)
        navigate('/onboarding');
      })
      .catch((error: AxiosError) => {
        // Handle errors
        console.error('Error:', error.message);
        if (error.response) {
          console.error('Status:', error.response.status);
          let errorResponse = JSON.parse(JSON.stringify(error.response.data)).message;
          console.error(error.response.data);
          // setErrorMessage(errorResponse)
          handleSnackbarOpen(errorResponse, 'error');

        } else if (error.request) {
          // The request was made but no response was received
          console.error('Request:', error.request);

        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error:', error.message);

        }
      });
  };

  const handleGoogleLogin = async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ('profileObj' in response) {
      console.log('Google login success:', response);
      const { name, email } = response.profileObj;

      const payload = {
        name: name,
        email: email,
        country_code: "+91",
        phone_no: "null",
        location: "null",
        user_name: "null",
        password: "null",
        registration_type: "GOOGLE",
        device_id: device_id,
        device_type: "Web",
      }

      handleSignup(payload);
    } else {
      console.error('Google login failed:', response);
    }
  };
  const CustomGoogleSignUpButton: React.FC<RenderPropsType> = (renderProps) => (
    <Button
      onClick={renderProps.onClick}
      disabled={renderProps.disabled}
      className="signup-google"
      variant='outlined'
      style={{ border: "none", height: '40px', width: "100%" }}
    >
      <img src={GoogleIcon} style={{ padding: 4 }} alt="google icon" width={30} height={30} />  Signup with Google
    </Button>
  );

  const handleFacebookLogin = (response: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
    if ('accessToken' in response) {
      const payload = {
        name: response.name,
        email: response.email,
        country_code: "+91",
        phone_no: "null",
        location: "null",
        user_name: "null",
        password: "null",
        registration_type: "FACEBOOK",
        device_id: device_id,
        device_type: "Web",
      };
      handleSignup(payload);
    } else {
      console.error('Facebook login failed:', response);
    }
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }} className='signup'>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} component={Paper} elevation={6} square sx={{ backgroundColor: "#1B1B1B" }} className='left-grid'>
          <Box
            sx={{
              my: 8,
              mx: 10,
              display: 'flex',
              flexDirection: 'column',
              color: "#FFF",
              marginTop: "2rem",
            }}
          >
            <img src={Logo} alt='brand logo' width={160} height={60} style={{ marginBottom: "85px", cursor: "pointer" }} onClick={() => navigate('/')} />
            <div className='signup-top'>
              <Typography component="h1" variant="h4">
                Sign Up
              </Typography>
              <p style={{ color: "#FFFFFFCC" }} >
                Already have an account? <Link variant="body2" sx={{ color: "#EF9D3D", cursor: "pointer" }} onClick={() => navigate('/')}>Log In</Link>
              </p>
            </div>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                onFocus={handleFocus}
                onBlur={handleBlur}
                margin="normal"
                required
                id="name"
                label="Name"
                name="name"
                autoComplete="Name"
                value={userForm.name}
                onChange={userInputChange}
                autoFocus
                className='inputs'
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: focused ? "25px" : '25px',
                    borderColor: focused ? '#fff' : 'rgba(0, 0, 0, 0.23)',
                    borderWidth: focused ? '2px' : '1px',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: focused ? '#fff' : 'rgba(0, 0, 0, 0.23)',
                    },
                  },
                  backgroundColor: "#FFFFFF33", color: "#fff", borderRadius: "25px", width: "49%", marginRight: "1%"
                }}
              />
              <TextField
                margin="normal"
                required
                name="email"
                label="Email Id"
                type="email"
                id="email"
                value={userForm.email}
                onChange={userInputChange}
                autoComplete="current-password"
                className='inputs'
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: focused ? "25px" : '25px',
                    borderColor: focused ? '#fff' : 'rgba(0, 0, 0, 0.23)',
                    borderWidth: focused ? '2px' : '1px',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: focused ? '#fff' : 'rgba(0, 0, 0, 0.23)',
                    },
                  }, backgroundColor: "#FFFFFF33", color: "#fff", borderRadius: "25px", width: "49%", marginLeft: "1%"
                }}
              />
              <span style={{ display: "flex" }}>
                <TextField
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  margin="normal"
                  id="phone_no"
                  label="Mobile Number"
                  name="phone_no"
                  value={userForm.phone_no}
                  onChange={userInputChange}
                  className='inputs'
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: focused ? "25px" : '25px',
                      borderColor: focused ? '#fff' : 'rgba(0, 0, 0, 0.23)',
                      borderWidth: focused ? '2px' : '1px',
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: focused ? '#fff' : 'rgba(0, 0, 0, 0.23)',
                      },
                    },
                    backgroundColor: "#FFFFFF33", color: "#fff", borderRadius: "25px", width: "49%", marginRight: "1%"
                  }}
                />

                <LoadScript googleMapsApiKey='AIzaSyBy1CutaeGoSNVQq4PLVdxN9VLOg7PGuxM' libraries={['places']}>
                  <StandaloneSearchBox onLoad={ref => (inputRef.current = ref)} onPlacesChanged={location}>
                    <TextField
                      margin="normal"
                      required
                      name="location"
                      label="Location"
                      id="location"
                      value={userForm.location}
                      onChange={userInputChange}
                      className='inputs'
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: focused ? "25px" : '25px',
                          borderColor: focused ? '#fff' : 'rgba(0, 0, 0, 0.23)',
                          borderWidth: focused ? '2px' : '1px',
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: focused ? '#fff' : 'rgba(0, 0, 0, 0.23)',
                          },
                          '&.Mui-focused .MuiAutocomplete-paper': {
                            backgroundColor: '#FFFFFF33',
                          },
                        },
                        backgroundColor: "#FFFFFF33", color: "#fff", borderRadius: "25px", width: "45vh", marginLeft: "1%"
                      }}
                    />
                  </StandaloneSearchBox>
                </LoadScript>
              </span>
              <TextField
                onFocus={handleFocus}
                onBlur={handleBlur}
                margin="normal"
                required
                fullWidth
                id="user_name"
                label="User Name"
                name="user_name"
                autoComplete="username"
                value={userForm.user_name}
                onChange={userInputChange}
                className='inputs'
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: focused ? "25px" : '25px',
                    borderColor: focused ? '#fff' : 'rgba(0, 0, 0, 0.23)',
                    borderWidth: focused ? '2px' : '1px',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: focused ? '#fff' : 'rgba(0, 0, 0, 0.23)',
                    },
                  },
                  backgroundColor: "#FFFFFF33", color: "#fff", borderRadius: "25px"
                }}
              />

              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff sx={{ color: "#fff" }} /> : <Visibility sx={{ color: "#fff" }} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}

                onFocus={handleFocus}
                onBlur={handleBlur}
                margin="normal"
                required
                id="password"
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="password"
                value={userForm.password}
                onChange={userInputChange}
                className='inputs'
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: focused ? "25px" : '25px',
                    borderColor: focused ? '#fff' : 'rgba(0, 0, 0, 0.23)',
                    borderWidth: focused ? '2px' : '1px',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: focused ? '#fff' : 'rgba(0, 0, 0, 0.23)',
                    },
                  },
                  backgroundColor: "#FFFFFF33", color: "#000", borderRadius: "25px", width: "49%", marginRight: "1%"
                }}
              />

              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff sx={{ color: "#fff" }} /> : <Visibility sx={{ color: "#fff" }} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}

                margin="normal"
                required
                name="cnfpassword"
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                id="confirmpassword"
                value={userForm.cnfpassword}
                onChange={userInputChange}
                autoComplete="current-password"
                className='inputs'
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: focused ? "25px" : '25px',
                    borderColor: focused ? '#fff' : 'rgba(0, 0, 0, 0.23)',
                    borderWidth: focused ? '2px' : '1px',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: focused ? '#fff' : 'rgba(0, 0, 0, 0.23)',
                    },
                  }, backgroundColor: "#FFFFFF33", color: "#fff", borderRadius: "25px", width: "49%", marginLeft: "1%"
                }}
              />

              {errorMsg ? (
                <Button
                  className='next-button'
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled
                >
                  Next
                </Button>
              ) : (
                <Button
                  className='next-button'
                  type="submit"
                  fullWidth
                  variant="contained"
                >
                  Next
                </Button>
              )}
              {errorMessage ? (
                <Typography variant="body2" color="white" >
                  {errorMessage}
                </Typography>
              ) : ''}
              {/* {errorMsg && (
                <Typography variant="body2" color="red" >
                  Mandatory fields are missing
                </Typography>
              )} */}
              <Divider sx={{ mb: 2 }} className='hr-line'>or continue with</Divider>
              <Grid container spacing={1}>
                <Grid item md={6}>
                  <GoogleLogin
                    clientId="341135506292-a9sgkdg8jmtfufl9u75hm2k1ve25t624.apps.googleusercontent.com"
                    className='signup-google'
                    onSuccess={handleGoogleLogin}
                    onFailure={handleGoogleLogin}
                    cookiePolicy={'single_host_origin'}
                    render={(renderProps) => <CustomGoogleSignUpButton {...renderProps} />}
                  />
                </Grid>
                <Grid item md={6}>
                  {/* <Button
                    type="submit"
                    className="apple-icon"
                    fullWidth
                    sx={{ mb: 2, color: "#fff", margin: 1, borderRadius: "25px" }}
                    variant="outlined"
                  > */}
                  {/* <AppleIcon />Signup with Apple */}
                  <FacebookLogin
                    appId="305544962644734"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={handleFacebookLogin}
                    textButton='Signup with Facebook'
                    icon="fa-facebook"
                    buttonStyle={{
                      color: "#fff",
                      margin: 5,
                      borderRadius: "25px",
                      height: "40px",
                      padding: "0 20px",
                      width: "100%",
                      textTransform: "none",
                      fontWeight: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#3b5998",
                      border: "none",
                      cursor: "pointer"
                    }}
                  />
                  {/* </Button> */}
                </Grid>
              </Grid>
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
          <img src={SignupImg} alt='Login page image' width={500} height={450} />
        </Grid>
      </Grid>
      <Snackbar open={openSnackbar} className="snackbar" anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </ThemeProvider>
  );
}