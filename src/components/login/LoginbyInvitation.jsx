import React from "react";
import { Grid, Box, Typography, Fade, TextField, Alert } from "@mui/material";

import { style2, titleStyle, MainButton, ModelTitles, GoogleButton, ImageLogin } from "./login-style.jsx";
import { Link, useLocation } from "react-router-dom";
import googleIcon from "../../icons/google.svg";
import loginImage from "../../icons/loginillustration.svg";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginInvitedUser } from "../../redux/actions/index.js";

function LoginbyInvitation(props) {
  const location = useLocation();
  const dispatch = useDispatch();

  const groupId = location.pathname.split("/")[2];
  const email = location.pathname.split("/")[3];

  const errorMessage = useSelector((state) => state.user.errorMessage);

  const [emailErrors, setEmailErrors] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState(false);
  const [isUser, setIsUser] = useState(errorMessage.status);
  const [user, setUser] = useState({
    email: email,
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
    dispatch(loginInvitedUser(user, groupId));

    if (errorMessage) {
      setIsUser(true);
      setTimeout(() => {
        setIsUser(false);
      }, 7000);
    }
  };

  return (
    <Grid container spacing={2} columns={16} sx={{ height: "103vh" }}>
      <Fade in={true} timeout={1000}>
        <Grid item xs={8} sx={{ transition: "opacity 3s ease-in-out", backgroundColor: "#699CFF" }}>
          <ImageLogin>
            <img style={{ width: "100%" }} src={loginImage} alt="" />
          </ImageLogin>
        </Grid>
      </Fade>

      <Fade in={true} timeout={1000}>
        <Grid item xs={8} sx={{ transition: "opacity 3s ease-in-out", backgroundColor: "#F4F7FD" }}>
          <Box sx={style2}>
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

              <MainButton variant="contained" fullWidth type="submit">
                Sign In
              </MainButton>
            </form>
            <Box sx={{ marginBlockStart: "30px", display: "flex" }}>
              <Typography sx={{ marginInlineEnd: "5px" }}>Don???t have an account? </Typography>
              <Typography component={Link} to="/register/:id" sx={{ backgroundColor: "white", textDecoration: "none" }}>
                Sign Up
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Fade>
    </Grid>
  );
}

export default LoginbyInvitation;
