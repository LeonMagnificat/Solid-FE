import { Box, Container, Grid, Fade } from "@mui/material";
import React from "react";
import SideNavigation from "../sideNav/SideNavigation.jsx";
import Groupcards from "./Groupcards.jsx";

function GroupPage() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} columns={12} sx={{ marginBlockStart: "30px" }}>
        <Grid item xs={3}>
          <Box>
            <SideNavigation />
          </Box>
        </Grid>
        <Fade in={true} timeout={1000}>
          <Grid item xs={9} sx={{ transition: "opacity 3s ease-in-out" }}>
            <Box>
              <Groupcards />
            </Box>
          </Grid>
        </Fade>
      </Grid>
    </Container>
  );
}

export default GroupPage;
