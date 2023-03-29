import * as React from "react";
import { Typography, Box, Button, Grid, Snackbar, Alert } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import add from "../../icons/add.svg";
import CreateGroupModel from "../Group/CreateGroupModel.jsx";
import TheListOfMembersCard from "./TheListOfMembersCard.jsx";
import { useSelector } from "react-redux";

const GroupBox = styled(Box)({
  height: "70px",
  backgroundColor: "white",
  borderRadius: "20px",
  marginBlockEnd: "15px",
  paddingInline: "30px",
  boxSizing: "border-box",
  width: "100%",
  display: "flex",
  alignItems: "center",
});

const AddButton = styled(Button)({
  height: "50px",
  width: "150px",
  borderRadius: "35px",
  textTransform: "capitalize",
  background: "rgb(224, 155, 45)",
  boxShadow: "none",
});

export default function GroupPageCards(props) {
  const user = useSelector((state) => state.user.UserData);
  const groups = useSelector((state) => state.user.groups);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(false);
  const [infoText, setInfoText] = useState(false);
  const [color, setColor] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setMessage(false);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <GroupBox>
          <Box sx={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
            <Box>
              <Typography>All Groups ({groups && groups.length})</Typography>
            </Box>
            <Box>
              <AddButton variant="contained" onClick={handleOpen}>
                <img className="mr-3" src={add} alt="" /> Create Group
              </AddButton>
            </Box>
          </Box>
        </GroupBox>

        <Grid container spacing={2} columns={12}>
          {groups.map((group) => {
            return <TheListOfMembersCard key={group._id} group={group} user={user} setGroupsFunction={props.setGroupsFunction} setMessage={setMessage} setInfoText={setInfoText} />;
          })}
        </Grid>

        <CreateGroupModel open={open} handleClose={handleClose} user={user} setMessage={setMessage} setInfoText={setInfoText} />
      </Box>
      <Snackbar open={message} autoHideDuration={7000} onClose={handleCloseSnack}>
        <Alert severity="info" onClose={handleCloseSnack} sx={{ width: "100%" }}>
          {infoText}
        </Alert>
      </Snackbar>
    </>
  );
}
