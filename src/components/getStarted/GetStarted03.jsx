import React from "react";

import { Typography, Box, Slide } from "@mui/material";
import slide03 from "../../icons/slide03.svg";
import { NavLink } from "react-router-dom";
//import { useDispatch, useSelector } from "react-redux";
//import { getUserData } from "../../redux/actions";
import { MainButton } from "./getStartedStyle.jsx";

const GetStarted03 = () => {
  // const dispatch = useDispatch();
  // const AddeduserId = useSelector((state) => state.user.addedUser._id);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly", height: "100vh", backgroundColor: "#F09400" }}>
        <Slide direction="left" in={true} timeout={900} mountOnEnter unmountOnExit>
          <Box>
            <img src={slide03} alt="" style={{ width: "900px" }} />
          </Box>
        </Slide>
        <Slide direction="left" in={true} timeout={1300} mountOnEnter unmountOnExit>
          <Box>
            <Typography sx={{ color: "#fff", fontSize: "24px" }}> "Effortlessly monitor the growth of your group's budget with our intuitive tracking system</Typography>
          </Box>
        </Slide>
        <Box>
          <MainButton LinkComponent={NavLink} to="/home" variant="contained" color="white" size="large" type="submit">
            Next
          </MainButton>
          <MainButton
            LinkComponent={NavLink}
            to="/home"
            size="large"
            color="white"
            type="submit"
            // onClick={() => {
            //   dispatch(getUserData(AddeduserId));
            // }}
          >
            Skip
          </MainButton>
        </Box>
      </Box>
    </>
  );
};

export default GetStarted03;
