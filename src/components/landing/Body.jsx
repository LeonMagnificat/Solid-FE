import React from "react";
import { Box, Container, Grid, Typography, Button, Fade } from "@mui/material";
import { styled } from "@mui/material/styles";
import home from "../../icons/home.svg";
import Register from "../register/Register.jsx";
import { useState } from "react";

function Body() {
  const [openreg, setOpenreg] = useState(false);
  const handleOpen2 = () => {
    setOpenreg(true);
  };
  const handleClose2 = () => {
    setOpenreg(false);
  };

  const BackgroundBox = styled(Box)({
    marginTop: "10vh",
    height: "90vh",
    backgroundColor: "#F4F7FD",
    display: "flex",
    alignItems: "center",
  });

  const HomeTitle = styled(Typography)({
    fontSize: "74px",
    fontWeight: "bold",
    width: "558px",
    lineHeight: "90px",
    marginTop: "15vh",

    "@media (max-width: 900px)": {
      fontSize: "50px",
      lineHeight: "70px",
      //margin: "0 auto",
      marginTop: "40vh",
    },
    "@media (max-width: 700px)": {
      marginTop: "10vh",
    },
    "@media (max-width: 400px)": {
      marginTop: "30vh",
    },
  });

  const HomeButton = styled(Button)({
    height: "68px",
    width: "169px",
    borderRadius: "15px",
    boxShadow: "none",
    textTransform: "capitalize",
    marginRight: "24px",
    background: "linear-gradient(153deg, rgba(224,155,45,1) 0%, rgba(167,43,242,1) 34%, rgba(0,138,147,1) 67%, rgba(76,138,255,1) 100%)",
  });

  return (
    <BackgroundBox>
      <Container maxWidth="lg">
        <Fade in={true} timeout={1500}>
          <Grid container spacing={2} columns={12}>
            <Grid item xs={12} md={6} sx={{ position: "relative", top: "20%" }}>
              <HomeTitle sx={{ zIndex: 1 }}>Elevate Your Group Planning Experience.</HomeTitle>
              <Typography
                sx={{
                  width: "468px",
                  marginBlock: "62px",
                  "@media (max-width: 600px)": {
                    width: "100%",
                    marginBlock: "32px",
                  },
                }}
              >
                "The strength of the team is each individual member. The strength of each member is the team." - Phil Jackson
              </Typography>

              <HomeButton variant="contained" onClick={handleOpen2}>
                Get Started
              </HomeButton>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                "@media (max-width: 600px)": {},
              }}
            >
              <img src={home} alt="" className="home-image" />
            </Grid>
          </Grid>
        </Fade>
      </Container>
      <Register open={openreg} handleClose={handleClose2} />
    </BackgroundBox>
  );
}

export default Body;
