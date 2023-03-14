import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, Button } from "@mui/material";
import empty from "../../icons/empty01.svg";
import add from "../../icons/add.svg";
import CreateGroupModel from "./CreateGroupModel.jsx";
import { useState } from "react";
import GroupWithcontent from "./GroupWithcontent.jsx";
import { useSelector } from "react-redux";
import { GroupBox2, AddButton2 } from "./groupDataStyle.jsx";

export default function Group() {
  const [open, setOpen] = useState(false);
  const userGroup = useSelector((state) => state.user.UserData.group);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let content = userGroup.length > 0 ? true : false;

  return (
    <Box sx={{ flexGrow: 1 }}>
      {!content ? (
        <GroupBox2>
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
              <AddButton2 variant="contained" onClick={handleOpen}>
                <img className="mr-3" src={add} alt="" /> Create Group
              </AddButton2>
            </Box>
          </Box>
        </GroupBox2>
      ) : (
        <GroupWithcontent />
      )}

      <CreateGroupModel open={open} handleClose={handleClose} />
    </Box>
  );
}
