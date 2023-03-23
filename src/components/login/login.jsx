import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import googleIcon from "../../icons/google.svg";
import { Box, Typography, Fade, TextField, Modal, Backdrop, Alert, LinearProgress } from "@mui/material";
import { style, titleStyle, MainButton, ModelTitles, GoogleButton } from "./login-style.jsx";
import { loginUser } from "../../redux/actions/index.js";
import { useNavigate } from "react-router-dom";

LoginModel.defaultProps = {
  open: false,
};

export default function LoginModel(props) {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [emailErrors, setEmailErrors] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState(false);
  const [errorMessages, setErrorMessages] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 25));
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    console.log("user", user);

    if (user.email === "") {
      setEmailErrors(true);
      console.log("email is empty");
    }
    if (user.password === "") {
      setPasswordErrors(true);
      console.log("password is empty");
    }
    try {
      const response = await dispatch(loginUser(user));
      console.log("response", response);
      if (response.status) {
        setTimeout(() => {
          navigate("/home");
        }, 2000);
        console.log("response", response.status);
      } else {
        setIsLoading(false);
        console.log("response", response.message);
        setErrorText(response.message);
        setErrorMessages(true);
        setTimeout(() => {
          setErrorMessages(false);
        }, 3000);
      }
    } catch (error) {
      console.log("error", error);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 1000,
          },
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            <ModelTitles sx={titleStyle} variant="h3" gutterBottom>
              Login
            </ModelTitles>
            <form onSubmit={handleSubmit}>
              {errorMessages && (
                <Fade in={true} timeout={700}>
                  {/* <Slide direction="left" in={true} timeout={100} mountOnEnter unmountOnExit> */}
                  <Alert severity="error" onClose={() => setErrorMessages(false)} sx={{ position: "absolute", top: "-20px", width: "380px", borderRadius: "10px", border: "solid 1px red" }}>
                    {errorText}
                  </Alert>
                  {/* </Slide> */}
                </Fade>
              )}
              <TextField
                className="inputRounded"
                label="Email"
                variant="outlined"
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                  console.log(user);
                }}
                error={emailErrors}
                type="email"
                fullWidth
                required
              />
              <TextField
                className="inputRounded"
                label="Password"
                variant="outlined"
                sx={{ marginBlockStart: "25px", marginBlockEnd: "25px" }}
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                  console.log(user);
                }}
                error={passwordErrors}
                type="password"
                fullWidth
                required
              />
              <Typography>Or continue with</Typography>
              <GoogleButton fullWidth variant="contained">
                <img src={googleIcon} alt="" className="margin-right" />
                Google
              </GoogleButton>

              <MainButton sx={{ padding: "0px 0px" }} fullWidth variant="contained" size="large" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Box sx={{ width: "100%", height: "56px" }}>
                    <LinearProgress color="primary" sx={{ height: "100%", borderRadius: "20px" }} />
                  </Box>
                ) : (
                  "Sign In"
                )}
              </MainButton>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
