import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import { Box, Modal, Fade, Button, Typography, TextField, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { style, titleStyle } from "../login/login-style.jsx";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { addUserToGroup } from "../../redux/actions/index.js";

export default function AddTaskModel(props) {
  const SelectField = styled(FormControl)({
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

  const MainButton = styled(Button)({
    height: "56px",
    width: "160px",
    borderRadius: "20px",
    textTransform: "capitalize",
  });

  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const groupId = props.groupId;

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("group", email, groupId);
    dispatch(addUserToGroup(email, groupId));
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
            timeout: 1500,
          },
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            <ModelTitles sx={titleStyle} variant="h3" gutterBottom>
              Add a spending
            </ModelTitles>
            <form onSubmit={handleSubmit}>
              <TextField
                className="inputRounded"
                label="Spending Name"
                variant="outlined"
                type="text"
                required
                fullWidth
                sx={{ marginBlockEnd: "25px" }}
                onChange={(e) => {
                  setEmail(e.target.value);
                  console.log("email", email);
                }}
              />

              <MainButton variant="contained" size="large" type="submit">
                Save
              </MainButton>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
