import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import { Box, Modal, Fade, Button, Typography, TextField, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { style, titleStyle } from "../login/login-style.jsx";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { addUserToGroup } from "../../redux/actions/index.js";

export default function AddMemberModel(props) {
  const dispatch = useDispatch();

  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const groupId = props.groupId;

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await dispatch(addUserToGroup(email, groupId));
    if (response.status) {
      props.setMessage(true);
      props.setInfoText("Invitation email was successfully sent ");
      props.handleClose();
    }
  };

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
              Add Member
            </ModelTitles>
            <form onSubmit={handleSubmit}>
              <TextField
                className="inputRounded"
                label="Email Address"
                variant="outlined"
                type={"email"}
                required
                fullWidth
                sx={{ marginBlockEnd: "25px" }}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <SelectField fullWidth className="inputRounded">
                <InputLabel className="TextField-border-radius" id="demo-simple-select-label">
                  Role
                </InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={role} label="Age" onChange={handleChange}>
                  <MenuItem value={10}>Admin</MenuItem>
                  <MenuItem value={20}>Member</MenuItem>
                </Select>
              </SelectField>

              <MainButton variant="contained" size="large" type="submit">
                Send invitation
              </MainButton>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
