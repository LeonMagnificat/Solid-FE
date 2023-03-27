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
  const user = useSelector((state) => state.user.UserData);

  const AddeduserId = user._id;
  const updatedMembersArray = props.group.members;

  const updatedMembers = updatedMembersArray.reduce((acc, member) => {
    if (member._id === AddeduserId) {
      acc.unshift(member); // add the matching member to the start of the array
    } else {
      acc.push(member); // add other members to the end of the array
    }
    return acc;
  }, []);

  const AccordionBox = styled(Accordion)({
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
      {updatedMembers.map((member, index) => {
        const filteredContr = member.contributions.filter((contribution) => contribution.group === props.group._id);
        const totalUser = filteredContr.reduce((acc, curr) => acc + curr.amount, 0);

        return (
          <>
            <AccordionBox sx={{ backgroundColor: member._id === AddeduserId ? "#FFF3DF" : "#fbfbfb" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Box sx={{ display: "flex", marginInlineEnd: "55px" }}>
                  <img className="avatar-profile" src={profiles[index]} alt="" />

                  <Typography sx={{ marginBlockStart: "8px", marginInlineStart: "10px", textTransform: "capitalize" }}>
                    {member._id === AddeduserId ? (
                      "You"
                    ) : (
                      <span>
                        {member.firstName} {member.lastName}{" "}
                      </span>
                    )}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionContent>
                {filteredContr &&
                  filteredContr.map((contribution, index) => {
                    if (contribution.user === member._id) {
                      return <MemberContributionCard contribution={contribution} index={index} key={contribution._id} />;
                    } else {
                      return null;
                    }
                  })}

                <TotalContributionMemberCard total={totalUser} currency={props.group.currency} />
              </AccordionContent>
            </AccordionBox>
          </>
        );
      })}
    </div>
  );
}
