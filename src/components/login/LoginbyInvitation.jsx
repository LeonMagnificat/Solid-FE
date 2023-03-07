import React from "react";
import { Container, Grid, Box, Button, Typography, Fade, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { style2, titleStyle } from "./login-style.jsx";
import { NavLink, Link } from "react-router-dom";
import googleIcon from "../../icons/google.svg";
import loginImage from "../../icons/loginillustration.svg";

function LoginbyInvitation(props) {
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
            <form>
              <InputField className="inputRounded" label="First Name" variant="outlined" fullWidth />
              <InputField className="inputRounded" label="Last Name" variant="outlined" fullWidth />
            </form>
            <Typography>Or continue with</Typography>
            <GoogleButton fullWidth variant="contained">
              <img src={googleIcon} alt="" className="margin-right" />
              Google
            </GoogleButton>

            <MainButton component={NavLink} to="/home" variant="contained" fullWidth>
              Sign In
            </MainButton>
            <Box sx={{ marginBlockStart: "30px", display: "flex" }}>
              <Typography sx={{ marginInlineEnd: "5px" }}>Don’t have an account? </Typography>
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
