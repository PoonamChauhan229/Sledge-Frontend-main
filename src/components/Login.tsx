import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppleIcon from "@mui/icons-material/Apple";
import { useNavigate } from "react-router-dom";
import { Divider, IconButton, InputAdornment } from "@mui/material";
import LoginImg from "../assets/LoginBanner.png";
import Logo from "../assets/BrandLogo.png";
import GoogleIcon from "../assets/GoogleLogo.png";
import axios from "axios";
import { BASE_URL_USER } from "../apiEndpoints";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import firebase from "firebase/app";
import "firebase/messaging";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { GoogleLogin } from "react-google-login";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { gapi } from "gapi-script";
import FacebookLogin from "react-facebook-login";

interface LoginProps {
  onLogin: (username: string, password: string) => void;
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
const defaultTheme = createTheme();

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [focused, setFocused] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState(false);
  const [resMsg, setResMsg] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<
    "success" | "error" | "info" | "warning" | undefined
  >(undefined);

  const [userForm, setUserForm] = React.useState({
    email: "",
    password: "",
    role: "",
    purpose: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSnackbarOpen = (
    message: string,
    severity: "success" | "error" | "info" | "warning"
  ) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const userInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrorMsg(false);
    setUserForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  // const getFCMToken = async () => {
  //   try {
  //     const messaging = firebase.messaging();
  //     const token = await messaging.getToken();
  //     return token;
  //   } catch (error) {
  //     console.error('Error getting FCM token:', error);
  //     return null;
  //00   }
  // };

  const device_id = Date.now().toString(36) + Math.random().toString(36);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = userForm;

    // Clear any previous error messages
    setErrorMsg(false);

    // Check if email or password is empty
    if (!email.trim() || !password.trim()) {
      // setErrorMsg(true);
      handleSnackbarOpen("Mandatory (*) fields are required", "error");
      return;
    }
    // Prepare the payload for the login request
    const payload = {
      email: email,
      password: password,
      login_type: "APPLE",
      device_id: device_id,
      device_token: "string",
      device_type: "Web",
    };
    try {
      // Send the login request
      const response = await axios.post(BASE_URL_USER + "login", payload);
      // Handle successful login
      if (response.status === 200) {
        onLogin(email, password);
        localStorage.setItem("token", response.data.data.access_token);
        localStorage.setItem("user_email", email);
        handleSnackbarOpen("Logined Successfully", "success");
        navigate("/home");
      } else {
        // Handle unexpected response status
        console.error("Unexpected response status:", response.status);
        // You can display a generic error message to the user or handle it in your UI as needed
      }
    } catch (error: any) {
      let errorResponse = error.response.data.message;
      setResMsg(errorResponse);
      // Handle Axios errors
      console.error("Login failed:", errorResponse);
      handleSnackbarOpen(errorResponse, 'error');
    }
  };

  React.useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({
        clientId:
          "139552447584-opq4ep7hpa3fqjcfknm93qij5ujnhjfj.apps.googleusercontent.com",
      });
    });
  });

  // const handleLogin = async (payload: any) => {
  //   const { email, password } = userForm;
  //   try {
  //     // Send the login request
  //     const response = await axios.post(BASE_URL_USER + 'login', payload);
  //     // Handle successful login
  //     if (response.status === 200) {
  //       onLogin(email, password)
  //       localStorage.setItem('token', response.data.data.access_token);
  //       console.log("user_email", email)
  //       handleSnackbarOpen("Logined Successfully", 'success');
  //       navigate("/home")
  //     } else {
  //       // Handle unexpected response status
  //       console.error("Unexpected response status:", response.status);
  //       // You can display a generic error message to the user or handle it in your UI as needed
  //     }

  //   } catch (error: any) {
  //     let errorResponse = error.response.data.message;
  //     setResMsg(errorResponse)
  //     // Handle Axios errors
  //     console.error("Login failed:", errorResponse);
  //     handleSnackbarOpen(errorResponse, 'error');
  //   }
  // }
  const handleGoogleLogin = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("profileObj" in response) {
      console.log("Google login success:", response);
      sessionStorage.setItem("isLoggedIn", "true");
      navigate("/home");
      window.location.reload();
    } else {
      console.error("Google login failed:", response);
    }
  };
  const CustomGoogleSignUpButton: React.FC<RenderPropsType> = (renderProps) => (
    <Button
      onClick={renderProps.onClick}
      disabled={renderProps.disabled}
      className="signup-google"
      variant="outlined"
      style={{ border: "none", height: "40px", width: "100%" }}
    >
      <img
        src={GoogleIcon}
        style={{ padding: 4 }}
        alt="google icon"
        width={30}
        height={30}
      />{" "}
      Signup with Google
    </Button>
  );

  const handleFacebookLogin = (
    response: ReactFacebookLoginInfo | ReactFacebookFailureResponse
  ) => {
    if ("accessToken" in response) {
      sessionStorage.setItem("isLoggedIn", "true");
      navigate("/home");
      window.location.reload();
    } else {
      console.error("Facebook login failed:", response);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{ height: "100vh" }}
        className="login"
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          component={Paper}
          elevation={6}
          square
          sx={{ backgroundColor: "#1B1B1B" }}
          className="left-grid"
        >
          <Box
            sx={{
              my: 8,
              mx: 10,
              display: "flex",
              flexDirection: "column",
              color: "#FFF",
              marginTop: "2rem",
            }}
          >
            <img
              src={Logo}
              alt="brand logo"
              width={160}
              height={60}
              style={{ marginBottom: "85px", cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
            <div className="login-top">
              <Typography component="h1" variant="h4">
                Log In
              </Typography>
              <p style={{ color: "#FFFFFFCC" }}>
                Not Registered Yet?{" "}
                <Link
                  variant="body2"
                  sx={{ color: "#EF9D3D", cursor: "pointer" }}
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Create an Account
                </Link>
              </p>
            </div>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                onFocus={handleFocus}
                onBlur={handleBlur}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email / User Id"
                name="email"
                type="email"
                value={userForm.email}
                onChange={userInputChange}
                autoFocus
                className="inputs"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: focused ? "25px" : "25px",
                    borderColor: focused ? "#fff" : "#fff",
                    borderWidth: focused ? "2px" : "1px",
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: focused ? "#fff" : "#fff",
                    },
                  },
                  color: "#FFF",
                  backgroundColor: "#FFFFFF33",
                  borderRadius: "25px",
                }}
              />
              {/* {errorMsg && (
                <Typography variant="body2" color="red">
                  Email / User Name is required
                </Typography>
              )} */}
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOff sx={{ color: "#fff" }} />
                        ) : (
                          <Visibility sx={{ color: "#fff" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                value={userForm.password}
                onChange={userInputChange}
                autoComplete="current-password"
                className="inputs"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: focused ? "25px" : "25px",
                    borderColor: focused ? "#fff" : "rgba(0, 0, 0, 0.23)",
                    borderWidth: focused ? "2px" : "1px",
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: focused ? "#fff" : "rgba(0, 0, 0, 0.23)",
                    },
                  },
                  backgroundColor: "#FFFFFF33",
                  borderRadius: "25px",
                }}
              />
              {/* {errorMsg && (
                <Typography variant="body2" color="red">
                  Password is required
                </Typography>
              )} */}
              <Button
                className="login-button"
                type="submit"
                fullWidth
                variant="contained"
              >
                Login
              </Button>
              {/* {resMsg && (
                <Typography variant="body2" color="red" sx={{mb:2}}>
                 {resMsg}
                </Typography>
              )} */}
              <Grid container sx={{ mb: 2, textAlign: "center" }}>
                <Grid item xs sx={{ color: "#FFFFFFCC" }}>
                  Didn't remember your password?
                  <Link
                    sx={{ color: "#fff", padding: 1, cursor: "pointer" }}
                    onClick={() => {
                      navigate("/forgetpassword");
                    }}
                  >
                    Forgot password
                  </Link>
                </Grid>
              </Grid>
              <Divider sx={{ mb: 2 }} className="hr-line">
                or continue with
              </Divider>
              <Grid container spacing={1}>
                <Grid item md={6}>
                  {/* <Button
                    className='signup-google'
                    type="submit"
                    fullWidth
                    variant="outlined"
                  >
                    <img src={GoogleIcon} style={{ padding: 4 }} alt="google icon" width={25} height={25} />  Signup with Google
                  </Button> */}
                  <GoogleLogin
                    // clientId="341135506292-a9sgkdg8jmtfufl9u75hm2k1ve25t624.apps.googleusercontent.com"
                    clientId="https://929076354382-r5t84ikndfl77d0cd636eaqei9cpmru7.apps.googleusercontent.com/"
                    className="signup-google"
                    onSuccess={handleGoogleLogin}
                    onFailure={handleGoogleLogin}
                    cookiePolicy={"single_host_origin"}
                    render={(renderProps) => (
                      <CustomGoogleSignUpButton {...renderProps} />
                    )}
                  />
                </Grid>
                <Grid item md={6}>
                  <FacebookLogin
                    appId="305544962644734"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={handleFacebookLogin}
                    textButton="Signup with Facebook"
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
                      cursor: "pointer",
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          className="right-grid"
          item
          xs={12}
          sm={8}
          md={5}
          sx={{
            backgroundColor: "#1B1B1B",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={LoginImg} alt="Login page image" width={500} height={500} />
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </ThemeProvider>
  );
};
