import React, { useState } from "react";
import { Backdrop, Box, Modal, Fade, Button, Typography, Snackbar, Alert } from "@mui/material";
import { style } from "../login/login-style.jsx";
import { styled } from "@mui/material/styles";
import { deleteGroup, checkLoggedIn } from "../../redux/actions/index.js";
import { useDispatch } from "react-redux";

function Alertt(props) {
  return <Alert elevation={6} variant="filled" {...props} />;
}

export default function DeleteGroupModel(props) {
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

  const [successMessages, setSuccessMessages] = useState(false);
  const [errorMessages, setErrorMessages] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const groupId = props.group._id;
  const userId = props.user._id;

  const handleDelete = async () => {
    setIsLoading(true);
    const response = await dispatch(deleteGroup(groupId));
    if (response.data) {
      dispatch(checkLoggedIn(userId));
      setSuccessMessages(true);
      setErrorText(response.data.message);
      setIsLoading(false);
    } else {
      console.log("responseeeeezzzz", response);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
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
              Delete Group
            </ModelTitles>
            <Box sx={{ display: "flex", marginInlineEnd: "55px", marginBlock: "20px" }}>
              <Typography sx={{ marginBlock: "8px" }}>
                Are You sure you want to permanently remove <span>{"Group"}</span> group ?{" "}
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
                disabled={isLoading || successMessages}
              >
                Yes Delete
              </MainButton>
              <Button color="delete" sx={{ textTransform: "capitalize", marginInlineStart: "30px" }} onClick={props.handleClose} disabled={isLoading || successMessages}>
                Do not Delete
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
      <Snackbar open={snackbarOpen} autoHideDuration={9000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
