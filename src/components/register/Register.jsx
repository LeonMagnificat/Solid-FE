import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import { style, titleStyle } from "../login/login-style.jsx";
import { styled } from "@mui/material/styles";
import googleIcon from "../../icons/google.svg";

export default function LoginModel(props) {
  const InputField = styled(TextField)({
    border: "none",
    borderRadius: "20px",
    // width: "178px",
    height: "56px",
    marginBlockEnd: "23px",
  });

  const ModelTitles = styled(Typography)({
    fontSize: "24px",
    marginBlock: "39px",
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
    marginBottom: "40px",
  });

  const MainButton = styled(Button)({
    height: "56px",
    width: "129px",
    borderRadius: "20px",
    textTransform: "capitalize",
  });

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
              Register
            </ModelTitles>
            <form action="">
              <InputField className="inputRounded" sx={{ width: "193px", marginInlineEnd: "23px" }} label="First Name" variant="outlined" />
              <InputField className="inputRounded" sx={{ width: "193px" }} label="Last Name" variant="outlined" />
              <InputField className="inputRounded" label="Email" variant="outlined" fullWidth />
              <InputField className="inputRounded" label="Password" variant="outlined" fullWidth />
            </form>
            <Typography>Or continue with</Typography>
            <GoogleButton fullWidth variant="contained">
              <img src={googleIcon} alt="" className="margin-right" />
              Google
            </GoogleButton>
            <MainButton variant="contained" size="large">
              Sign Up
            </MainButton>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
