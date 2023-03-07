import React from "react";
import { Backdrop, Box, Modal, Fade, Button, Typography } from "@mui/material";
import { style } from "../login/login-style.jsx";
import { styled } from "@mui/material/styles";

export default function DeleteUserModel(props) {
  const ModelTitles = styled(Typography)({
    fontSize: "24px",
    marginBlock: "39px",
  });

  const MainButton = styled(Button)({
    height: "56px",
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
                Are You sure you want to permanently remove <span>{"User"}</span> from the group?{" "}
              </Typography>
            </Box>

            <Box>
              <MainButton variant="contained" size="large" color="delete" sx={{ color: "white" }}>
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
