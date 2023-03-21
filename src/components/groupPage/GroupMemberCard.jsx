import * as React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Box, Tooltip, Fade } from "@mui/material";
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
      backgroundColor: "#fbf0ff",
      transition: ".5s",
    },
    "&:hover .cards-icons": {
      display: "flex",
      transition: "all .5s ease",
      opacity: 1,
      transition: "all 3s ease",
    },
    "&:hover .cards-infos ": {
      display: "none",
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img className="avatar-profile" src={randomProfile} alt="" />
            <Tooltip title={props.member.firstName + " " + props.member.lastName} arrow TransitionComponent={Fade} TransitionProps={{ timeout: 700 }}>
              <Typography sx={{ marginInlineStart: "10px", width: "130px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} noWrap>
                <span>{props.member.firstName} </span> <span>{props.member.lastName}</span>
              </Typography>
            </Tooltip>
          </Box>
          <Box className="cards-icons" sx={{ display: "none", opacity: 0, transition: "opacity .5s ease" }}>
            <Tooltip arrow title="Update member's contribution">
              <TopButton variant="outlined" color="orange" onClick={handleOpen}>
                <img src={update} alt="" />
              </TopButton>
            </Tooltip>
            <Tooltip arrow title="Delete member">
              <TopButton variant="outlined" color="delete" onClick={handleOpenDelete}>
                <img src={deleteIcon} alt="" />
              </TopButton>
            </Tooltip>
          </Box>
          <Box className="cards-infos" sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: ".8em", color: "#9a9a9a" }}>
              Total : <span>300USD</span>{" "}
            </Typography>
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
