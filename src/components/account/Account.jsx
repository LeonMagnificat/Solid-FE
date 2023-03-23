import { Box, Container, Grid, Fade } from "@mui/material";
import React from "react";
import SideNavigation from "../sideNav/SideNavigation.jsx";
import Group from "../Group/Group.jsx";
import { useSelector, useDispatch } from "react-redux";
import { checkLoggedIn } from "../../redux/actions/index.js";
import { useEffect } from "react";

function Account() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.UserData);
  const userID = useSelector((state) => state.user.addedUser._id);

  useEffect(() => {
    console.log("DISPATCH FIRED");
    dispatch(checkLoggedIn(userID));
  }, []);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} columns={12} sx={{ marginBlockStart: "30px" }}>
        <Grid item xs={3}>
          <Box sx={{ position: "sticky", top: "20px" }}>{user && <SideNavigation user={user} />}</Box>
        </Grid>
        <Fade in={true} timeout={1000}>
          <Grid item xs={9}>
            {<Group user={user} />}
          </Grid>
        </Fade>
      </Grid>
    </Container>
  );
}

export default Account;
