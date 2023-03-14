import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { style, titleStyle } from "../login/login-style.jsx";
import { ModelTitles, InputField, SelectField, MainButton } from "./groupDataStyle.jsx";
import { useSelector, useDispatch } from "react-redux";
import { FormControl } from "@mui/material";
import { createGroup } from "../../redux/actions/index.js";

export default function CreateGroupModel(props) {
  const dispatch = useDispatch();
  const [currency, setCurrency] = useState("");
  const [group, setGroup] = useState({
    name: "",
    currency: "",
  });
  const userId = useSelector((state) => state.user.UserData._id);
  console.log("userId", userId);

  const handleChange = (event) => {
    const selectedCurrency = event.target.value;
    setCurrency(selectedCurrency);
    setGroup({ ...group, currency: selectedCurrency });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("group", group);
    dispatch(createGroup(group, userId));
  };

  console.log("group", group);
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
              Create Group
            </ModelTitles>
            <form onSubmit={handleSubmit}>
              <TextField
                className="inputRounded"
                label="Group Name"
                variant="outlined"
                fullWidth
                sx={{ marginBlockEnd: "25px" }}
                onChange={(event) => {
                  setGroup({ ...group, name: event.target.value });
                }}
              />
              <FormControl fullWidth className="inputRounded" sx={{ marginBlockEnd: "25px" }}>
                <InputLabel className="TextField-border-radius" id="demo-simple-select-label">
                  Currency
                </InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={currency} label="Currency" onChange={handleChange}>
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="PLN">PLN</MenuItem>
                </Select>
              </FormControl>

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
