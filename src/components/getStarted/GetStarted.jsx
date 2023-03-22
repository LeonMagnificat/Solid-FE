import React from "react";
import { styled } from "@mui/material/styles";
import { Button, Typography, Box, Slide } from "@mui/material";
import slide01 from "../../icons/slide01.svg";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//import { getUserData } from "../../redux/actions";

export default function GetStarted() {
  const dispatch = useDispatch();
  const AddeduserId = useSelector((state) => state.user.addedUser._id);

  const MainButton = styled(Button)({
    height: "56px",
    width: "129px",
    borderRadius: "20px",
    textTransform: "capitalize",
  });
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly", height: "100vh", backgroundColor: "#A62BF2" }}>
        <Slide direction="left" in={true} timeout={900} mountOnEnter unmountOnExit>
          <Box>
            <img src={slide01} alt="" style={{ width: "900px" }} />
          </Box>
        </Slide>
        <Slide direction="left" in={true} timeout={1300} mountOnEnter unmountOnExit>
          <Box>
            <Typography sx={{ color: "#fff", fontSize: "24px" }}>Create a Solid community With Our Powerful Group-Building Solutions.</Typography>
          </Box>
        </Slide>
        <Box>
          <MainButton
            LinkComponent={NavLink}
            to="/getStarted02"
            variant="contained"
            color="white"
            size="large"
            type="submit"
            // onClick={() => {
            //   dispatch(getUserData(AddeduserId));
            // }}
          >
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
