import React from "react";
import { Grid, Box, Typography, Fade, TextField, Alert, Slide } from "@mui/material";
import { style2, titleStyle } from "../login/login-style.jsx";
import googleIcon from "../../icons/google.svg";
import registerImage from "../../icons/registerillustration.svg";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { addUser } from "../../redux/actions/index.js";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { MainButton, ModelTitles, GoogleButton, ImageLogin } from "./registerStyle.jsx";
import { useSelector } from "react-redux";

function RegisterbyInvitation() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const groupId = location.pathname.split("/")[2];
  const email = location.pathname.split("/")[3];

  const errorMessage = useSelector((state) => state.user.errorMessage);

  console.log("errorMessage", errorMessage);

  const [fNameErrors, setFNameErrors] = useState(false);
  const [lNameErrors, setLNameErrors] = useState(false);
  const [emailErrors, setEmailErrors] = useState(false);
  const [isUser, setIsUser] = useState(errorMessage.status);
  const [passwordErrors, setPasswordErrors] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: email,
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
                variant="outlined"
                className="inputRounded"
                value={email}
                readOnly={true}
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
