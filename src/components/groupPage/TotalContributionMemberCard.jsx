import * as React from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { colors, colorsDark } from "../Group/profilesArray.js";

export default function TotalContributionMemberCard(props) {
  const randomProfile = colors[Math.floor(Math.random() * colors.length)];

  const AccordionBox = styled(Box)({
    backgroundColor: "black",
    boxShadow: "none",
    borderRadius: "15px !important",
    paddingInline: "20px",
    marginBottom: "10px",
    color: "white",
  });

  const AccordionMemberBox = styled(Box)({
    display: "flex",
    alignItems: "center !important",
    justifyContent: "space-between",
    height: "65px",
  });
  const NumberingBox = styled(Box)({
    backgroundColor: randomProfile,
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colorsDark[colors.indexOf(randomProfile)],
  });

  return (
    <div>
      <AccordionBox>
        <AccordionMemberBox expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <NumberingBox>
            <Typography sx={{ fontWeight: "bold" }}>T</Typography>
          </NumberingBox>
          <Typography sx={{ marginInlineStart: "10px" }}> Total Contribution </Typography>
          <Typography sx={{ marginInlineStart: "10px", fontSize: "16px", fontWeight: "bold" }}>
            {props.total} {props.currency}
          </Typography>
        </AccordionMemberBox>
      </AccordionBox>
    </div>
  );
}
