import { Box, Container, Grid } from "@mui/material";
import React from "react";
import SideNavigation from "../sideNav/SideNavigation.jsx";
import Group from "../Group/Group.jsx";

function Account() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} columns={12} sx={{ marginBlockStart: "30px" }}>
        <Grid item xs={3}>
          <Box>
            <SideNavigation />
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box>
            <Group />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Account;
