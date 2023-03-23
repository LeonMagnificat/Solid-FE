import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, Button, Avatar, Badge, Menu, MenuItem } from "@mui/material";
import logo from "../../icons/logo.svg";
import logout from "../../icons/logout.svg";
import home from "../../icons/homeIcon.svg";
import group from "../../icons/group2.svg";
//import profile from "../../icons/profile01.svg";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const NavBarBox = styled(Box)({
  height: "350px",
  backgroundColor: "white",
  borderRadius: "20px",
});
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 2,
    top: 25,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default function NavBar(props) {
  const user = useSelector((state) => state.user.UserData);
  console.log("user", user);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <NavBarBox>
        <Box sx={{ height: "100%", padding: "37px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Box sx={{ backgroundColor: "transparent", display: "flex", justifyContent: "space-between" }}>
            <img component={Link} to="/" src={logo} alt="" />
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ minWidth: "40px", height: "40px", borderRadius: "50%", padding: 0, backgroundColor: "#f8f8f8" }}
            >
              <img src={logout} alt="" />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </Box>
          <Box>
            <Button
              component={NavLink}
              to="/home"
              activeclassname="active"
              sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", textTransform: "capitalize", width: "200px", height: "50px" }}
            >
              <img src={home} alt="" />
              <Typography sx={{ fontSize: "16px", marginInlineStart: "10px" }}>Home</Typography>
            </Button>

            <StyledBadge badgeContent={props.user.group.length} color="secondary">
              <Button component={NavLink} to="/group" activeclassname="active" sx={{ display: "flex", justifyContent: "flex-start", textTransform: "capitalize", width: "200px", height: "50px" }}>
                <img src={group} alt="" />
                <Typography sx={{ fontSize: "16px", marginInlineStart: "10px" }}>Group</Typography>
              </Button>
            </StyledBadge>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* <img className="avatar-profile" src={profile} alt="" /> */}
            <Avatar {...stringAvatar(`${props.user.firstName} ${props.user.lastName}`)} />
            <Typography sx={{ fontSize: "16px", marginInlineStart: "10px" }}>
              <span>{props.user.firstName}</span> <span>{props.user.lastName}</span>
              <Typography sx={{ fontSize: "13px" }}>
                <span>{props.user.email}</span>
              </Typography>
            </Typography>
          </Box>
        </Box>
      </NavBarBox>
    </Box>
  );
}
