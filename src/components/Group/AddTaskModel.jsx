import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import { Box, Modal, Fade, Button, Typography, TextField } from "@mui/material";
import { style, titleStyle } from "../login/login-style.jsx";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { addNewTask } from "../../redux/actions/index.js";

export default function AddTaskModel(props) {
  const dispatch = useDispatch();

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

  const [task, setTask] = useState("");
  const groupId = props.groupId;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(addNewTask(groupId, task));
    if (response.status) {
      props.handleClose();
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
                  setTask(e.target.value);
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
