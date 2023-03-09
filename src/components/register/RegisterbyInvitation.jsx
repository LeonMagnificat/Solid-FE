import React from "react";
import { Grid, Box, Typography, Fade, TextField } from "@mui/material";
import { style2, titleStyle } from "../login/login-style.jsx";
import googleIcon from "../../icons/google.svg";
import registerImage from "../../icons/registerillustration.svg";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { addUser } from "../../redux/actions/index.js";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { MainButton, ModelTitles, GoogleButton, ImageLogin } from "./registerStyle.jsx";

function RegisterbyInvitation() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const groupId = location.pathname.split("/")[2];

  const [fNameErrors, setFNameErrors] = useState(false);
  const [lNameErrors, setLNameErrors] = useState(false);
  const [emailErrors, setEmailErrors] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.firstName === "") {
      setFNameErrors(true);
      console.log("firstName is empty");
    }
    if (user.lastName === "") {
      setLNameErrors(true);
      console.log("lastName is empty");
    }
    if (user.email === "") {
      setEmailErrors(true);
      console.log("email is empty");
    }
    if (user.password === "") {
      setPasswordErrors(true);
      console.log("password is empty");
    }

    dispatch(addUser(user, groupId));
    navigate("/getStarted");
    console.log(user);
  };

  return (
    <Grid container spacing={2} columns={16} sx={{ height: "103vh" }}>
      <Fade in={true} timeout={1000}>
        <Grid item xs={8} sx={{ transition: "opacity 3s ease-in-out", backgroundColor: "#A62BF2" }}>
          <ImageLogin>
            <img style={{ width: "100%" }} src={registerImage} alt="" />
          </ImageLogin>
        </Grid>
      </Fade>

      <Fade in={true} timeout={1000}>
        <Grid item xs={8} sx={{ transition: "opacity 3s ease-in-out", backgroundColor: "#F4F7FD" }}>
          <Box sx={style2}>
            <ModelTitles sx={titleStyle} variant="h3" gutterBottom>
              Register
            </ModelTitles>

            <form autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                sx={{ width: "193px", marginInlineEnd: "23px" }}
                label="First Name"
                variant="outlined"
                className="inputRounded"
                onChange={(e) => {
                  setUser({ ...user, firstName: e.target.value });
                  console.log(user.firstName);
                }}
                error={fNameErrors}
                required
                type="text"
              />
              <TextField
                sx={{ width: "193px" }}
                label="Last Name"
                variant="outlined"
                className="inputRounded"
                onChange={(e) => {
                  setUser({ ...user, lastName: e.target.value });
                }}
                error={lNameErrors}
                required
                type="text"
              />
              <TextField
                sx={{ marginBlockStart: "25px" }}
                label="Email"
                variant="outlined"
                className="inputRounded"
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                }}
                error={emailErrors}
                type="email"
                fullWidth
                required
              />
              <TextField
                sx={{ marginBlockStart: "25px", marginBlockEnd: "25px" }}
                label="Password"
                variant="outlined"
                className="inputRounded"
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
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
              <MainButton variant="contained" size="large" type="submit" fullWidth>
                Sign Up
              </MainButton>
            </form>
            <Box sx={{ marginBlockStart: "30px", display: "flex" }}>
              <Typography sx={{ marginInlineEnd: "5px" }}>Already have an account? </Typography>
              <Typography component={Link} to="/login/:id" sx={{ backgroundColor: "white", textDecoration: "none" }}>
                Log in here
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Fade>
    </Grid>
  );
}

export default RegisterbyInvitation;
