import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import googleIcon from "../../icons/google.svg";
import { Box, Typography, Fade, TextField, Modal, Backdrop, Alert } from "@mui/material";
import { style, titleStyle, MainButton, ModelTitles, GoogleButton } from "./login-style.jsx";
import { loginUser } from "../../redux/actions/index.js";

export default function LoginModel(props) {
  const dispatch = useDispatch();

  const errorMessage = useSelector((state) => state.user.errorMessage);

  const [emailErrors, setEmailErrors] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState(false);
  const [isUser, setIsUser] = useState(errorMessage.status);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
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
    dispatch(loginUser(user));

    if (errorMessage) {
      setIsUser(true);
      setTimeout(() => {
        setIsUser(false);
      }, 7000);
    }
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
              {isUser && (
                <Fade in={true} timeout={700}>
                  {/* <Slide direction="left" in={true} timeout={100} mountOnEnter unmountOnExit> */}
                  <Alert severity="error" onClose={() => setIsUser(false)} sx={{ position: "absolute", top: "-20px", width: "380px", borderRadius: "10px", border: "solid 1px red" }}>
                    {errorMessage}
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

              <MainButton type="submit" variant="contained" size="large">
                Sign In
              </MainButton>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
