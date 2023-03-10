import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { style, titleStyle } from "../login/login-style.jsx";
import googleIcon from "../../icons/google.svg";
import { ModelTitles, MainButton, GoogleButton } from "./registerStyle.jsx";
import { useDispatch } from "react-redux";
import { addNewUser } from "../../redux/actions/index.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function LoginModel(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [fNameErrors, setFNameErrors] = useState(false);
  const [lNameErrors, setLNameErrors] = useState(false);
  const [emailErrors, setEmailErrors] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState(false);
  const errorMessage = useSelector((state) => state.user.errorMessage);
  const [errorMessages, setErrorMessages] = useState(false);

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

    dispatch(addNewUser(user));
    if (!errorMessage) {
      navigate("/getStarted");
    }
    setErrorMessages(true);
    setTimeout(() => {
      setErrorMessages(false);
    }, 7000);
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
            <ModelTitles sx={titleStyle} variant="h3">
              Register
            </ModelTitles>
            <form onSubmit={handleSubmit}>
              {errorMessages && (
                <Fade in={true} timeout={900}>
                  {/* <Slide direction="left" in={true} timeout={100} mountOnEnter unmountOnExit> */}
                  <Alert severity="error" onClose={() => setErrorMessages(false)} sx={{ position: "absolute", top: "-20px", width: "380px", borderRadius: "10px", border: "solid 1px red" }}>
                    {errorMessage}
                  </Alert>
                  {/* </Slide> */}
                </Fade>
              )}
              <TextField
                className="inputRounded"
                sx={{ width: "193px", marginInlineEnd: "23px" }}
                label="First Name"
                variant="outlined"
                onChange={(e) => {
                  setUser({ ...user, firstName: e.target.value });
                  console.log(user.firstName);
                }}
                error={fNameErrors}
                required
                type="text"
              />
              <TextField
                className="inputRounded"
                sx={{ width: "193px" }}
                label="Last Name"
                variant="outlined"
                onChange={(e) => {
                  setUser({ ...user, lastName: e.target.value });
                  console.log(user.lastName);
                }}
                error={lNameErrors}
                required
                type="text"
              />
              <TextField
                className="inputRounded"
                label="Email"
                variant="outlined"
                fullWidth
                sx={{ marginBlockStart: "25px" }}
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                }}
                error={emailErrors}
                type="email"
                required
              />
              <TextField
                className="inputRounded"
                label="Password"
                variant="outlined"
                sx={{ marginBlockStart: "25px", marginBlockEnd: "25px" }}
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
              <MainButton fullWidth variant="contained" size="large" type="submit">
                Sign Up
              </MainButton>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
