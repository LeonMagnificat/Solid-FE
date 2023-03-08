import React from "react";
import { Grid, Box, Button, Typography, Fade, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { style2, titleStyle } from "../login/login-style.jsx";
import { Link } from "react-router-dom";
import googleIcon from "../../icons/google.svg";
import registerImage from "../../icons/registerillustration.svg";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { addUser } from "../../redux/actions/index.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function RegisterbyInvitation() {
  const MainButton = styled(Button)({
    height: "56px",
    borderRadius: "20px",
    textTransform: "capitalize",
  });
  const ModelTitles = styled(Typography)({
    fontSize: "24px",
    marginBlock: "39px",
  });
  const InputField = styled(TextField)({
    border: "none",
    borderRadius: "20px",
    height: "56px",
    marginBlockEnd: "23px",
  });

  const GoogleButton = styled(Button)({
    height: "56px",
    borderRadius: "20px",
    backgroundColor: "white",
    color: "black",
    textTransform: "capitalize",
    boxShadow: "none",
    border: "1px solid #D6D6D6",
    marginTop: "15px",
    marginBottom: "30px",
    "&:hover": {
      backgroundColor: "#f4f4f4",
      boxShadow: "none",
    },
  });

  const ImageLogin = styled(Box)({
    position: "absolute",
    top: "50%",
    left: "30%",
    width: "70em",
    transform: "translate(-50%, -50%)",
    borderRadius: "20px",
    boxSizing: "border-box",
  });

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const groupId = location.pathname.split("/")[2];
  console.log(groupId, "groupId");

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
    navigate("/home");
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

            <form onSubmit={handleSubmit}>
              <TextField
                sx={{ width: "193px", marginInlineEnd: "23px" }}
                label="First Name"
                variant="outlined"
                className="inputRounded"
                onChange={(e) => {
                  setUser({ ...user, firstName: e.target.value });
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
