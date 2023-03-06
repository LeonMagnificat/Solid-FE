import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import profile01 from "../../icons/profile01.svg";
import profile02 from "../../icons/profile02.svg";
import profile03 from "../../icons/profile03.svg";
import profile04 from "../../icons/profile04.svg";
import profile05 from "../../icons/profile05.svg";
import profile06 from "../../icons/profile06.svg";
import profile07 from "../../icons/profile07.svg";
import profile08 from "../../icons/profile08.svg";
import profile09 from "../../icons/profile09.svg";
import profile10 from "../../icons/profile10.svg";
import profile11 from "../../icons/profile11.svg";
import profile12 from "../../icons/profile12.svg";
import profile13 from "../../icons/profile13.svg";
import profile14 from "../../icons/profile14.svg";
import profile15 from "../../icons/profile15.svg";
import profile16 from "../../icons/profile16.svg";
import update from "../../icons/update.svg";
import deleteIcon from "../../icons/delete.svg";
import MemberContributionCard from "../groupPage/MemberContributionCard.jsx";
import TotalContributionMemberCard from "../groupPage/TotalContributionMemberCard.jsx";

import UpdateContributionModel from "../groupPage/UpdateContributionModel.jsx";
import DeleteUserModel from "../groupPage/DeleteUserModel.jsx";
import { useState } from "react";

export default function GroupMemberCard() {
  const profiles = [profile01, profile02, profile03, profile04, profile05, profile06, profile07, profile08, profile09, profile10, profile11, profile12, profile13, profile14, profile15, profile16];
  const randomProfile = profiles[Math.floor(Math.random() * profiles.length)];

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [deletemodel, setDeletemodel] = useState(false);
  const handleOpenDelete = () => {
    setDeletemodel(true);
  };
  const handleCloseDelete = () => {
    setDeletemodel(false);
  };

  const AccordionBox = styled(Accordion)({
    backgroundColor: "#fbfbfb",
    boxShadow: "none",
    borderRadius: "15px !important",
    marginBlockEnd: "10px",
    justifyContent: "space-between",
    transition: ".5s",
    "&:hover": {
      boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
      backgroundColor: "#f5e6ff",
      transition: ".5s",
    },
  });
  const AccordionContent = styled(AccordionDetails)({
    maxHeight: "400px",
    overflow: "scroll",
  });

  const TopButton = styled(Button)({
    height: "35px",
    width: "35px",
    borderRadius: "50px",
    textTransform: "capitalize",
    boxShadow: "none",
    minWidth: "0",
    marginRight: "10px",
  });

  return (
    <div>
      <AccordionBox sx={{ justifyContent: "space-between" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Box sx={{ display: "flex", marginInlineEnd: "55px" }}>
            <img className="avatar-profile" src={randomProfile} alt="" />
            <Typography sx={{ marginBlockStart: "8px", marginInlineStart: "10px" }}>Member Name </Typography>
          </Box>
          <Box>
            <TopButton variant="outlined" color="orange" onClick={handleOpen}>
              <img src={update} alt="" />
            </TopButton>
            <TopButton variant="outlined" color="delete" onClick={handleOpenDelete}>
              <img src={deleteIcon} alt="" />
            </TopButton>
          </Box>
        </AccordionSummary>
        <AccordionContent>
          <MemberContributionCard />
          <TotalContributionMemberCard />
        </AccordionContent>
      </AccordionBox>
      <UpdateContributionModel open={open} handleClose={handleClose} />
      <DeleteUserModel open={deletemodel} handleClose={handleCloseDelete} />
    </div>
  );
}
