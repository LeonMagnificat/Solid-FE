import React, { useState } from "react";
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
import { style, titleStyle } from "../login/login-style.jsx";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { addUserToGroup } from "../../redux/actions/index.js";

export default function AddMemberModel(props) {
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
                  console.log("email", email);
                }}
              />
              <SelectField fullWidth className="inputRounded">
                <InputLabel className="TextField-border-radius" id="demo-simple-select-label">
                  Role
                </InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={role} label="Age" onChange={handleChange}>
                  <MenuItem value={10}>Admin</MenuItem>
                  <MenuItem value={20}>User</MenuItem>
                </Select>
              </SelectField>

              <MainButton variant="contained" size="large" type="submit">
                Send Invitaion
              </MainButton>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
