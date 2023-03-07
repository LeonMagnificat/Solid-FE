import * as React from "react";
import { Typography, Box, Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import addsm from "../../icons/addsm.svg";
import add from "../../icons/add.svg";
import emptyContact from "../../icons/nocontact.svg";
import GroupMemberCard from "./GroupMemberCard.jsx";
import AddMemberModel from "./AddMemberModel.jsx";

const GroupBox = styled(Box)({
  backgroundColor: "white",
  borderRadius: "20px",
  paddingInline: "30px",
  paddingBlock: "20px",
  boxSizing: "border-box",
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

const AddButton = styled(Button)({
  height: "35px",
  width: "35px",
  borderRadius: "50px",
  textTransform: "capitalize",
  boxShadow: "none",
  minWidth: "0",
});

const AddContactButton = styled(Button)({
  height: "50px",
  width: "150px",
  borderRadius: "35px",
  textTransform: "capitalize",
  boxShadow: "none",
});

export default function TheListOfMembersCard() {
  const [open, setOpen] = useState(false);
  const content = false;
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid item xs={6}>
        <GroupBox>
          <Box sx={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", marginBlockEnd: "20px" }}>
            <Box>
              <Typography>Group Name (6)</Typography>
            </Box>
            <Box>
              <AddButton variant="outlined" color="secondary" onClick={handleOpen} sx={{ visibility: !content ? "visible" : "visible" }}>
                <img src={addsm} alt="" />
              </AddButton>
            </Box>
          </Box>
          <Box>
            {!content ? (
              <Box>
                <GroupMemberCard />
              </Box>
            ) : (
              <Box sx={{ display: " flex", flexDirection: "column", alignItems: "center", height: "250px", justifyContent: "space-around", textAlign: "center" }}>
                <Box sx={{ width: "100px" }}>
                  <img style={{ width: "100%" }} src={emptyContact} alt="" />
                </Box>
                <Box>
                  <Typography>There are no members in this group; click the button below to add members.</Typography>
                </Box>
                <Box>
                  <AddContactButton variant="contained" color="secondary" onClick={handleOpen}>
                    <img className="mr-3" src={add} alt="" /> Add Member
                  </AddContactButton>
                </Box>
              </Box>
            )}
          </Box>
        </GroupBox>
        <AddMemberModel open={open} handleClose={handleClose} />
      </Grid>
    </>
  );
}
