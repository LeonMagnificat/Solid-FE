import React, { useState } from "react";
import { Backdrop, Box, Modal, Fade, InputLabel, TextField, MenuItem, FormControl, Alert, LinearProgress } from "@mui/material";
import Select from "@mui/material/Select";
import { style, titleStyle } from "../login/login-style.jsx";
import { ModelTitles, MainButton } from "./groupDataStyle.jsx";
import { useDispatch } from "react-redux";
import { createGroup } from "../../redux/actions/index.js";

export default function CreateGroupModel(props) {
  const dispatch = useDispatch();
  const [currency, setCurrency] = useState("");
  const [group, setGroup] = useState({
    name: "",
    currency: "",
  });
  const [errorMessages, setErrorMessages] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userId = props.user._id;

  const handleChange = (event) => {
    const selectedCurrency = event.target.value;
    setCurrency(selectedCurrency);
    setGroup({ ...group, currency: selectedCurrency });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await dispatch(createGroup(group, userId));
      if (response.status) {
        props.handleClose();
      } else {
        setIsLoading(false);
        setErrorMessages(true);
        setErrorText(response.message);
        setTimeout(() => {
          setErrorMessages(false);
        }, 3000);
      }
    } catch (error) {
      console.log("error", error);
    }

    setIsLoading(false);
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
              Create Group
            </ModelTitles>
            <form onSubmit={handleSubmit}>
              {errorMessages && (
                <Fade in={true} timeout={600}>
                  <Alert severity="error" onClose={() => setErrorMessages(false)} sx={{ position: "absolute", top: "-45px", width: "380px", borderRadius: "10px", border: "solid 1px red" }}>
                    {errorText}
                  </Alert>
                </Fade>
              )}
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
              <FormControl fullWidth className="inputRounded" sx={{ marginBlockEnd: "25px" }} required>
                <InputLabel className="TextField-border-radius" id="demo-simple-select-label">
                  Currency
                </InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={currency} label="Currency" onChange={handleChange}>
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="PLN">PLN</MenuItem>
                </Select>
              </FormControl>

              <MainButton sx={{ padding: "0px 0px" }} fullWidth variant="contained" size="large" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Box sx={{ width: "100%", height: "56px" }}>
                    <LinearProgress color="primary" sx={{ height: "100%", borderRadius: "20px" }} />
                  </Box>
                ) : (
                  "Save"
                )}
              </MainButton>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
