import React from "react";
import { styled } from "@mui/material/styles";
import { Button, Typography, Box, Slide } from "@mui/material";
import slide02 from "../../icons/slide02.svg";
import { NavLink } from "react-router-dom";

export default function getStarted02() {
  const MainButton = styled(Button)({
    height: "56px",
    width: "129px",
    borderRadius: "20px",
    textTransform: "capitalize",
  });
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly", height: "100vh", backgroundColor: "#008A93" }}>
        <Slide direction="left" in={true} timeout={900} mountOnEnter unmountOnExit>
          <Box>
            <img src={slide02} alt="" style={{ width: "900px" }} />
          </Box>
        </Slide>
        <Slide direction="left" in={true} timeout={1300} mountOnEnter unmountOnExit>
          <Box>
            <Typography sx={{ color: "#fff", fontSize: "24px" }}>Easily bring your friends on board with just one click using our hassle-free invitation feature.</Typography>
          </Box>
        </Slide>
        <Box>
          <MainButton LinkComponent={NavLink} to="/getStarted03" variant="contained" color="white" size="large" type="submit">
            Next
          </MainButton>
          <MainButton LinkComponent={NavLink} to="/home" size="large" color="white" type="submit">
            Skip
          </MainButton>
        </Box>
      </Box>
    </>
  );
}
