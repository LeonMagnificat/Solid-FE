import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import MemberContributionCard from "../groupPage/MemberContributionCard.jsx";
import TotalContributionMemberCard from "../groupPage/TotalContributionMemberCard.jsx";
import { profiles } from "./profilesArray";
import { useSelector } from "react-redux";

export default function ActiveGroupMembers(props) {
  const randomProfile = profiles[Math.floor(Math.random() * profiles.length)];
  const AddeduserId = useSelector((state) => state.user.addedUser._id);

  //const myProfile = AddeduserId === props.member._id ? true : false;

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
  const MyAccordionBox = styled(Accordion)({
    backgroundColor: "#FFF3DF",
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

  console.log(props.member);

  return (
    <div sx={{ marginBlockEnd: "30px" }}>
      {props.member.map((member, index) => {
        return (
          <AccordionBox>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Box sx={{ display: "flex", marginInlineEnd: "55px" }}>
                <img className="avatar-profile" src={profiles[index]} alt="" />

                <Typography sx={{ marginBlockStart: "8px", marginInlineStart: "10px" }}>
                  <span>{member.firstName}</span> <span>{member.lastName}</span>{" "}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionContent>
              <MemberContributionCard />
              <TotalContributionMemberCard />
            </AccordionContent>
          </AccordionBox>
        );
      })}
    </div>
  );
}
