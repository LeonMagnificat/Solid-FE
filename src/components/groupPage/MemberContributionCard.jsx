import * as React from "react";

import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Tooltip, Fade } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { colors, colorsDark } from "../Group/profilesArray.js";

export default function MemberContributionCard(props) {
  const randomProfile = colors[Math.floor(Math.random() * colors.length)];
  const dateTimeString = props.contribution.createdAt;
  const dateTime = new Date(dateTimeString);
  const options = { weekday: "short", day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "numeric" };

  const formattedDateTime = dateTime.toLocaleString("en-US", options);

  const formattedAmount = props.contribution.amount.toFixed(2);

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
    minWidth: "40px",
    minHeight: "40px",
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
            <Typography sx={{ fontWeight: "bold" }}>{props.index + 1} </Typography>
          </NumberingBox>
          <Tooltip title={formattedDateTime} placement="top" TransitionComponent={Fade} TransitionProps={{ timeout: 700 }} arrow>
            <Typography sx={{ marginInlineStart: "10px", fontSize: "13px", width: "8em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}> {formattedDateTime} </Typography>
          </Tooltip>
          <Tooltip title={formattedAmount} placement="top" TransitionComponent={Fade} TransitionProps={{ timeout: 700 }} arrow>
            <Typography
              sx={{
                marginInlineStart: "10px",
                color: colorsDark[colors.indexOf(randomProfile)],
                fontSize: "16px",
                fontWeight: "bold",
                width: "8em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                textAlign: "end",
              }}
            >
              {formattedAmount} {props.currency}
            </Typography>
          </Tooltip>
        </AccordionMemberBox>
      </AccordionBox>
    </div>
  );
}
