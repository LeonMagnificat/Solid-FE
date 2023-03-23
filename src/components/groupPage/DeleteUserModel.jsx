import React, { useState } from "react";
import { Backdrop, Box, Modal, Fade, Button, Typography, Alert } from "@mui/material";
import { style } from "../login/login-style.jsx";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { deleteUserInGroup } from "../../redux/actions/index.js";

function Alertt(props) {
  return <Alert elevation={6} variant="filled" {...props} />;
}
export default function DeleteUserModel(props) {
  const dispatch = useDispatch();
  const ModelTitles = styled(Typography)({
    fontSize: "24px",
    marginBlock: "39px",
  });

  const MainButton = styled(Button)({
    height: "56px",
    borderRadius: "20px",
    textTransform: "capitalize",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const groupId = props.groupId;
  const userId = props.user._id;

  console.log("userIddddddd", userId);
  console.log("grouppppIddddddd", groupId);

  const handleDelete = async () => {
    const response = await dispatch(deleteUserInGroup(groupId, userId));
    if (response.status) {
      setSnackbarOpen(true);
      setSnackbarMessage(response.data.message);
      console.log("responseeeeezzzz", response.data.message);
    } else {
      console.log("responseeeeezzzz", response.data.message);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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
            <ModelTitles sx={{ marginBlockEnd: "10px" }} variant="h3" gutterBottom>
              Delete Member
            </ModelTitles>
            <Box sx={{ display: "flex", marginInlineEnd: "55px", marginBlock: "20px" }}>
              <Typography sx={{ marginBlock: "8px" }}>
                Are You sure you want to permanently remove <span>{props.user.firstName} </span>
                <span>{props.user.lastName}</span> from the group?
              </Typography>
            </Box>

            <Box>
              <MainButton
                variant="contained"
                size="large"
                color="delete"
                sx={{ color: "#fff" }}
                onClick={() => {
                  handleDelete();
                  props.handleClose();
                }}
              >
                Yes Delete
              </MainButton>
              <Button color="delete" sx={{ textTransform: "capitalize", marginInlineStart: "30px" }} onClick={props.handleClose}>
                Do not Delete
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
