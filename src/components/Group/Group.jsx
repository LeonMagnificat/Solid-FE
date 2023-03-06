import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, Button } from "@mui/material";
import empty from "../../icons/empty01.svg";
import add from "../../icons/add.svg";
import CreateGroupModel from "./CreateGroupModel.jsx";
import { useState } from "react";
import GroupWithcontent from "./GroupWithcontent.jsx";

const GroupBox = styled(Box)({
  height: "400px",
  backgroundColor: "white",
  borderRadius: "20px",
  marginBlockEnd: "15px",
});

const AddButton = styled(Button)({
  height: "50px",
  width: "150px",
  borderRadius: "35px",
  textTransform: "capitalize",
  background: "rgb(224, 155, 45)",
  boxShadow: "none",
});

export default function EmptyGroup() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const content = false;

  return (
    <Box sx={{ flexGrow: 1 }}>
      {content ? (
        <GroupBox>
          <Box sx={{ height: "100%", padding: "37px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Box>
              <img src={empty} alt="" />
            </Box>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", marginBlockEnd: "10px" }}>
                <Typography sx={{ fontSize: "14px", cursor: "pointer", width: "301px", textAlign: "center", marginBlock: "25px" }}>
                  There are no groups available, click the button below to create one and add members.
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AddButton variant="contained" onClick={handleOpen}>
                <img className="mr-3" src={add} alt="" /> Create Group
              </AddButton>
            </Box>
          </Box>
        </GroupBox>
      ) : (
        <GroupWithcontent />
      )}

      <CreateGroupModel open={open} handleClose={handleClose} />
    </Box>
  );
}
