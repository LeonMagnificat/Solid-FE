import * as React from "react";
import { Typography, Box, Button, Grid, Snackbar, Alert, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import add from "../../icons/add.svg";
import CreateGroupModel from "../Group/CreateGroupModel.jsx";
import TheListOfMembersCard from "./TheListOfMembersCard.jsx";
import { useSelector } from "react-redux";
//import SearchIcon from "@mui/icons-material/Search";
//import ReactHtmlParser from "html-react-parser";
import parse from "html-react-parser";

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
  //const members = useSelector((state) => state.user.members);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(false);
  const [infoText, setInfoText] = useState(false);
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

  const getHighlightedText = (text, search) => {
    if (search.trim() === "") {
      return text;
    }

    const regex = new RegExp(search, "gi");
    const parts = text.split(regex);
    return parse(parts.map((part, index) => (index % 2 !== 0 ? `<mark>${search}</mark>` + part : part)).join(""));
  };

  const searchResults = groups
    .filter((group) => {
      const hasMatchingName = group.name.toLowerCase().includes(searchTerm.toLowerCase());
      const hasMatchingCurrency = group.currency.toLowerCase().includes(searchTerm.toLowerCase());
      const hasMatchingMemberName = group.members.some((member) => `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()));
      return hasMatchingName || hasMatchingCurrency || hasMatchingMemberName;
    })
    .map((group) => {
      const highlightedGroup = { ...group };
      const highlightedMembers = group.members.map((member) => {
        const fullName = `${member.firstName} ${member.lastName}`;
        const highlightedFullName = getHighlightedText(fullName, searchTerm);
        return { ...member, fullName: highlightedFullName };
      });
      highlightedGroup.members = highlightedMembers;
      highlightedGroup.name = getHighlightedText(group.name, searchTerm);
      highlightedGroup.currency = getHighlightedText(group.currency, searchTerm);
      return highlightedGroup;
    });

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
        <Box sx={{ height: "85vh", overflow: "auto", borderRadius: "20px" }}>
          <Grid container spacing={2} columns={12}>
            {searchResults.map((group) => {
              return <TheListOfMembersCard key={group._id} group={group} user={user} setGroupsFunction={props.setGroupsFunction} setMessage={setMessage} setInfoText={setInfoText} />;
            })}
          </Grid>
        </Box>

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
