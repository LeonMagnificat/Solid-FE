import * as React from "react";
import PropTypes from "prop-types";
import { Typography, Tab, Tabs } from "@mui/material";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import calendar from "../../icons/calendar.svg";
import updated from "../../icons/lastupdated.svg";
import ActiveGroupMembers from "./ActiveGroupMembers.jsx";
import AddMemberModel from "../groupPage/AddMemberModel.jsx";
import add from "../../icons/add.svg";
import emptyContact from "../../icons/nocontact.svg";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../redux/actions";
import { GroupBox, AddButton, AddContactButton } from "./groupDataStyle.jsx";

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

export default function GroupWithcontent() {
  const userGroup = useSelector((state) => state.user.UserData.group);
  const dispatch = useDispatch();
  const AddeduserId = useSelector((state) => state.user.addedUser._id);

  //const groupMembers = props.group.members;

  //const members = groupMembers.length > 0 ? true : false;

  const [value, setValue] = useState(0);

  const [groupId, setGroupId] = useState("");

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
  console.log("Group ID", groupId);

  useEffect(() => {
    dispatch(getUserData(AddeduserId));
  }, [AddeduserId]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ width: "100%" }}>
        <GroupBox>
          <Box sx={{ borderBottom: "none" }}>
            <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example">
              {userGroup &&
                userGroup.length &&
                userGroup.map((group, index) => {
                  const currentGroupId = group._id;
                  return (
                    <Tab
                      label={group.name}
                      {...a11yProps(0)}
                      key={index}
                      onClick={() => {
                        setGroupId(currentGroupId);
                      }}
                    />
                  );
                })}
            </Tabs>
          </Box>
        </GroupBox>

        {userGroup.map((group, index) => {
          return (
            <TabPanel value={value} index={index}>
              <GroupBox sx={{ padding: "30px" }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography sx={{ fontSize: "16px", marginBlockEnd: "10px" }}>Total Contributed</Typography>
                  <Typography sx={{ fontSize: "14px", marginBlockEnd: "10px", color: "grey" }}>{group.createdAt}</Typography>
                  <Typography color="primary" sx={{ fontSize: "40px", fontWeight: "bold" }}>
                    <span>{group.total}</span>
                    <span>{group.currency}</span>
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
              </GroupBox>

              {true ? (
                <>
                  <GroupBox sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "70px", paddingInline: "20px" }}>
                    <Box>
                      <Typography>Group Members</Typography>
                    </Box>
                    <AddButton
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        handleOpen();
                        setGroupId(group._id);
                      }}
                    >
                      <img className="mr-3" src={add} alt="" /> Add Member
                    </AddButton>
                  </GroupBox>

                  <GroupBox sx={{ height: "60vh", overflow: "auto" }}>
                    <Box>
                      <ActiveGroupMembers member={group.members} />
                    </Box>
                  </GroupBox>
                </>
              ) : (
                <Box>
                  <GroupBox sx={{ display: "flex", alignItems: "center", justifyContent: "center", paddingInline: "20px" }}>
                    <Box sx={{ display: " flex", flexDirection: "column", alignItems: "center", height: "250px", justifyContent: "space-around", textAlign: "center" }}>
                      <Box sx={{ width: "100px" }}>
                        <img style={{ width: "100%" }} src={emptyContact} alt="" />
                      </Box>
                      <Box sx={{ width: "350px" }}>
                        <Typography>There are no members in this group; click the button below to add members.</Typography>
                      </Box>
                      <Box>
                        <AddContactButton variant="contained" color="secondary" onClick={handleOpen}>
                          <img className="mr-3" src={add} alt="" /> Add Member
                        </AddContactButton>
                      </Box>
                    </Box>
                  </GroupBox>
                </Box>
              )}
            </TabPanel>
          );
        })}
      </Box>
      <AddMemberModel open={open} groupId={groupId} handleClose={handleClose} />;
    </Box>
  );
}
