import * as React from "react";

import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { colors, colorsDark } from "../Group/profilesArray.js";

export default function MemberContributionCard() {
  const randomProfile = colors[Math.floor(Math.random() * colors.length)];

  const AccordionBox = styled(Box)({
    backgroundColor: "white",
    boxShadow: "none",
    borderRadius: "15px !important",
    paddingInline: "20px",
    marginBottom: "10px",
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
            <Typography sx={{ fontWeight: "bold" }}>1 </Typography>
          </NumberingBox>
          <Typography sx={{ marginInlineStart: "10px" }}> June 21st 2021 </Typography>
          <Typography sx={{ marginInlineStart: "10px", color: colorsDark[colors.indexOf(randomProfile)], fontSize: "16px", fontWeight: "bold" }}>200 USD </Typography>
        </AccordionMemberBox>
      </AccordionBox>
    </div>
  );
}
