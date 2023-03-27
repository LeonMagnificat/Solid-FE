import React from "react";
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
  //const randomProfile = profiles[Math.floor(Math.random() * profiles.length)];
  //const [myProfile, setMyprofile] = useState(false);

  const AddeduserId = useSelector((state) => state.user.addedUser._id);

  props.member.map((member) => {
    if (member._id === AddeduserId) {
      const index = props.member.indexOf(member);
      if (index !== -1) {
        props.member.splice(index, 1);
        props.member.unshift(member);
      }
      return member;
    }
    return member;
  });

  const filteredContribution = props.user.contributions.filter((contribution) => contribution.group === props.group._id);
  //const filteredContribution = props.user.contributions.filter((contribution) => props.group.members.filter((member) => contribution.group === props.group._id && contribution.user === member._id));

  //const memberTotal = filteredContribution.reduce((acc, curr) => acc + curr.amount, 0);

  let myProfile;

  props.member.map((member) => {
    if (member._id === AddeduserId) {
      myProfile = true;
      return myProfile;
    }
    return myProfile;
  });
  console.log("MY PROFILE", myProfile);

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
      {props.member.map((member, index) => {
        const filteredContr = member.contributions.filter((contribution) => contribution.group === props.group._id);
        const totalUser = filteredContr.reduce((acc, curr) => acc + curr.amount, 0);
        console.log("--=-=-=-=-=--", filteredContr, totalUser);

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
