import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, Button } from "@mui/material";
import logo from "../../icons/logo.svg";
import home from "../../icons/homeIcon.svg";
import group from "../../icons/group2.svg";
import profile from "../../icons/profile01.svg";
import { NavLink, Link } from "react-router-dom";

const NavBarBox = styled(Box)({
  height: "350px",
  backgroundColor: "white",
  borderRadius: "20px",
});

export default function BasicGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <NavBarBox>
        <Box sx={{ height: "100%", padding: "37px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Box component={Link} to="/" sx={{ backgroundColor: "white" }}>
            <img src={logo} alt="" />
          </Box>
          <Box>
            <Button
              component={NavLink}
              to="/home"
              activeClassName="active"
              sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", textTransform: "capitalize", width: "200px", height: "50px" }}
            >
              <img src={home} alt="" />
              <Typography sx={{ fontSize: "16px", marginInlineStart: "10px" }}>Home</Typography>
            </Button>

            <Button component={NavLink} to="/group" activeClassName="active" sx={{ display: "flex", justifyContent: "flex-start", textTransform: "capitalize", width: "200px", height: "50px" }}>
              <img src={group} alt="" />
              <Typography sx={{ fontSize: "16px", marginInlineStart: "10px" }}>Group</Typography>
            </Button>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img className="avatar-profile" src={profile} alt="" />
            <Typography sx={{ fontSize: "16px", marginInlineStart: "10px" }}>User Name</Typography>
          </Box>
        </Box>
      </NavBarBox>
    </Box>
  );
}
