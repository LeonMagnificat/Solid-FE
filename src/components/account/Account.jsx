import { Box, Container, Grid, Fade } from "@mui/material";
import React from "react";
import SideNavigation from "../sideNav/SideNavigation.jsx";
import Group from "../Group/Group.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../redux/actions";
import { useEffect } from "react";

function Account() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.addedUser.user);
  const userID = user ? user._id : localStorage.getItem("userID");

  console.log(`user`, userID);

  useEffect(() => {
    dispatch(getUserData(userID));
  }, []);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} columns={12} sx={{ marginBlockStart: "30px" }}>
        <Grid item xs={3}>
          <Box sx={{ position: "sticky", top: "20px" }}>
            <SideNavigation />
          </Box>
        </Grid>
        <Fade in={true} timeout={1000}>
          <Grid item xs={9}>
            <Group />
          </Grid>
        </Fade>
      </Grid>
    </Container>
  );
}

export default Account;
