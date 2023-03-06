import * as React from "react";
import { Typography, Box, Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import add from "../../icons/add.svg";
import CreateGroupModel from "../Group/CreateGroupModel.jsx";
import TheListOfMembersCard from "./TheListOfMembersCard.jsx";

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

export default function GroupPageCards() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <GroupBox>
          <Box sx={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
            <Box>
              <Typography>All Groups (23)</Typography>
            </Box>
            <Box>
              <AddButton variant="contained" onClick={handleOpen}>
                <img className="mr-3" src={add} alt="" /> Create Group
              </AddButton>
            </Box>
          </Box>
        </GroupBox>
        <Grid container spacing={2} columns={12}>
          <TheListOfMembersCard />
        </Grid>

        <CreateGroupModel open={open} handleClose={handleClose} />
      </Box>
    </>
  );
}
