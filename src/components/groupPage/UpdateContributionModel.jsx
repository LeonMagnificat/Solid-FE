import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import profile16 from "../../icons/profile16.svg";
import contribution from "../../icons/contribution.svg";
import { style, titleStyle } from "../login/login-style.jsx";
import { styled } from "@mui/material/styles";

export default function UpdateContributionModel(props) {
  const InputField = styled(TextField)({
    border: "none",
    borderRadius: "20px",
    // width: "178px",
    height: "56px",
    marginBlockEnd: "23px",
  });
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
              Update Member Contribution
            </ModelTitles>
            <Box sx={{ display: "flex", marginInlineEnd: "55px", marginBlock: "20px" }}>
              <img className="avatar-profile" src={profile16} alt="" />
              <Typography sx={{ marginBlockStart: "8px", marginInlineStart: "10px" }}>Member Name </Typography>
            </Box>
            <Box sx={{ display: "flex", marginInlineEnd: "55px", marginBlock: "20px" }}>
              <img className="avatar-profile" src={contribution} alt="" />
              <Typography sx={{ marginBlockStart: "5px", marginInlineStart: "10px", color: "#418DF9", fontSize: "25px", fontWeight: "bold" }}>345 USD </Typography>
            </Box>
            <form>
              <InputField className="inputRounded" label="Add to the current amount" variant="outlined" fullWidth />
            </form>

            <MainButton variant="contained" size="large">
              Update
            </MainButton>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
