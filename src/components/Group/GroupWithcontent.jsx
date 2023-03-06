import * as React from "react";
import PropTypes from "prop-types";
import { Button, Typography, Tab, Tabs } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import calendar from "../../icons/calendar.svg";
import updated from "../../icons/lastupdated.svg";
import ActiveGroupMembers from "./ActiveGroupMembers.jsx";
import AddMemberModel from "../groupPage/AddMemberModel.jsx";
import add from "../../icons/add.svg";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const GroupBox = styled(Box)({
  backgroundColor: "white",
  borderRadius: "20px",
  marginBlockEnd: "15px",
  padding: "10px",
  boxSizing: "border-box",
});

const AddButton = styled(Button)({
  height: "50px",
  width: "150px",
  borderRadius: "35px",
  textTransform: "capitalize",
  boxShadow: "none",
});

const groupname = "Team Arsenal";

export default function GroupWithcontent() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <GroupBox>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label={groupname} {...a11yProps(0)} />
              <Tab label="Group 2" {...a11yProps(1)} />
              <Tab label="Group 3" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Box>
              <Box sx={{ display: "flex", flexDirection: "column", marginBlockEnd: "10px" }}>
                <Typography sx={{ fontSize: "16px", marginBlockEnd: "10px" }}>Total Contributed</Typography>
                <Typography sx={{ fontSize: "14px", marginBlockEnd: "10px", color: "grey" }}>Today, 27 Feb 2023</Typography>
                <Typography color="primary" sx={{ fontSize: "40px", fontWeight: "bold" }}>
                  200 USD
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box sx={{ display: "flex" }}>
                    <img style={{ width: "16px", marginInlineEnd: "10px" }} src={calendar} alt="" />
                    <Typography sx={{ fontSize: "14px" }}>Last updated, Today 23 Feb 2023</Typography>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <img style={{ width: "18px", marginInlineEnd: "10px" }} src={updated} alt="" />
                    <Typography sx={{ fontSize: "14px" }}>Updated from 50 USD</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </Box>
      </GroupBox>
      <GroupBox sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "70px", paddingInline: "20px" }}>
        <Box>
          <Typography>Group Members</Typography>
        </Box>
        <AddButton variant="contained" color="secondary" onClick={handleOpen}>
          <img className="mr-3" src={add} alt="" /> Add Member
        </AddButton>
      </GroupBox>
      <GroupBox>
        <Box>
          <ActiveGroupMembers />
          <ActiveGroupMembers />
          <ActiveGroupMembers />
          <ActiveGroupMembers />
        </Box>
      </GroupBox>
      <AddMemberModel open={open} handleClose={handleClose} />
    </Box>
  );
}
