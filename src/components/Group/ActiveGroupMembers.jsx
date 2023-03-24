import React, { useState } from "react";
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
  const contributions = useSelector((state) => state.contribution.contributionMember);
  const randomProfile = profiles[Math.floor(Math.random() * profiles.length)];
  const AddeduserId = useSelector((state) => state.user.addedUser._id);
  //const [myProfile, setMyprofile] = useState(false);

  props.member.map((member) => {
    if (member._id === AddeduserId) {
      const index = props.member.indexOf(member);
      if (index !== -1) {
        props.member.splice(index, 1);
        props.member.unshift(member);
      }
      return member;
    }
  });

  let myProfile;

  props.member.map((member) => {
    if (member._id === AddeduserId) {
      myProfile = true;
      return myProfile;
    }
  });

  console.log("myProfilewwwwwwwwwww", myProfile);

  const AccordionBox = styled(Accordion)({
    backgroundColor: myProfile ? "#fbfbfb" : "#FFF3DF",
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

  return (
    <div sx={{ marginBlockEnd: "30px" }}>
      {props.member.map((member, index) => {
        console.log("0000000000000000000>>>", member);
        return (
          <>
            <AccordionBox>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Box sx={{ display: "flex", marginInlineEnd: "55px" }}>
                  <img className="avatar-profile" src={profiles[index]} alt="" />

                  <Typography sx={{ marginBlockStart: "8px", marginInlineStart: "10px" }}>
                    <span>{member.firstName}</span> <span>{member.lastName}</span>
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionContent>
                {member.contributions &&
                  member.contributions.map((contribution, index) => {
                    return <MemberContributionCard contribution={contribution} index={index} key={contribution._id} />;
                  })}

                <TotalContributionMemberCard total={member.total} />
              </AccordionContent>
            </AccordionBox>
          </>
        );
      })}
    </div>
  );
}
