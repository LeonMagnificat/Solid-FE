import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import profile01 from "../../icons/profile01.svg";

export default function TotalContributionMemberCard() {
  const colors = ["#FF8C82", "#FFC27D", "#FFF394", "#D1FF82", "#89FFDD", "#8CD5FF", "#E4C6FA", "#FE9AB8"];
  const colorsDark = ["#A10705", "#A62100", "#AD5F00", "#206B00", "#007367", "#002E99", "#452981", "#910E38"];
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
          <Typography sx={{ marginInlineStart: "10px", fontSize: "16px", fontWeight: "bold" }}>200 USD </Typography>
        </AccordionMemberBox>
      </AccordionBox>
    </div>
  );
}
