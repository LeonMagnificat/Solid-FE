import * as React from "react";
import { Typography, Box, Button, Grid, Snackbar, Alert, InputBase, TextField } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { useState } from "react";
import add from "../../icons/add.svg";
import CreateGroupModel from "../Group/CreateGroupModel.jsx";
import TheListOfMembersCard from "./TheListOfMembersCard.jsx";
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";

const GroupBox = styled(Box)({
  height: "70px",
  backgroundColor: "white",
  borderRadius: "20px",
  marginBlockEnd: "15px",
  paddingInline: "30px",
  boxSizing: "border-box",
  width: "100%",
  display: "flex",
  alignItems: "center",
});

const AddButton = styled(Button)({
  height: "50px",
  width: "150px",
  borderRadius: "35px",
  textTransform: "capitalize",
  background: "rgb(224, 155, 45)",
  boxShadow: "none",
});

export default function GroupPageCards(props) {
  const user = useSelector((state) => state.user.UserData);
  const groups = useSelector((state) => state.user.groups);
  const members = useSelector((state) => state.user.members);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(false);
  const [infoText, setInfoText] = useState(false);
  const [color, setColor] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  //const [searchResults, setSearchResults] = useState([]);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setMessage(false);
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const searchResults = groups.filter((group) => {
    group.members.map((member) => {
      return member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || member.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return group.name.toLowerCase().includes(searchTerm.toLowerCase()) || group.currency.toLowerCase().includes(searchTerm.toLowerCase());
  });

  console.log("searchResults", searchResults);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <GroupBox>
          <Box sx={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
            <Box>
              <Typography>All Groups ({groups && groups.length})</Typography>
            </Box>
            <Box>
              <TextField
                variant="standard"
                placeholder="Search…"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
              {/* {searchResults.length > 0 &&
                searchResults.map((results) => {
                  return <div>{results.name}</div>;
                })} */}
            </Box>
            <Box>
              <AddButton variant="contained" onClick={handleOpen}>
                <img className="mr-3" src={add} alt="" /> Create Group
              </AddButton>
            </Box>
          </Box>
        </GroupBox>

        <Grid container spacing={2} columns={12}>
          {searchResults.map((group) => {
            return <TheListOfMembersCard key={group._id} group={group} user={user} setGroupsFunction={props.setGroupsFunction} setMessage={setMessage} setInfoText={setInfoText} />;
          })}
        </Grid>

        <CreateGroupModel open={open} handleClose={handleClose} user={user} setMessage={setMessage} setInfoText={setInfoText} />
      </Box>
      <Snackbar open={message} autoHideDuration={7000} onClose={handleCloseSnack}>
        <Alert severity="info" onClose={handleCloseSnack} sx={{ width: "100%" }}>
          {infoText}
        </Alert>
      </Snackbar>
    </>
  );
}
