import * as React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import update from "../../icons/update.svg";
import deleteIcon from "../../icons/delete.svg";
import MemberContributionCard from "../groupPage/MemberContributionCard.jsx";
import TotalContributionMemberCard from "../groupPage/TotalContributionMemberCard.jsx";
import UpdateContributionModel from "../groupPage/UpdateContributionModel.jsx";
import DeleteUserModel from "../groupPage/DeleteUserModel.jsx";
import { useState } from "react";
import { profiles } from "../Group/profilesArray.js";

export default function GroupMemberCard(props) {
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
            <Typography sx={{ marginBlockStart: "8px", marginInlineStart: "10px" }}>
              {" "}
              <span>{props.member.firstName} </span> <span>{props.member.lastName}</span>{" "}
            </Typography>
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
