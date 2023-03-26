import * as React from "react";
import PropTypes from "prop-types";
import { Typography, Tab, Tabs, Button, AccordionSummary, AccordionDetails, styled, Box, Grid, TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import calendar from "../../icons/calendar.svg";
import ActiveGroupMembers from "./ActiveGroupMembers.jsx";
import AddMemberModel from "../groupPage/AddMemberModel.jsx";
import AddTaskModel from "./AddTaskModel.jsx";
import add from "../../icons/add.svg";
import emptyContact from "../../icons/nocontact.svg";
import { useDispatch } from "react-redux";
import { GroupBox, AddButton, AddContactButton, AccordionBox } from "./groupDataStyle.jsx";
import { colorsMix } from "./profilesArray.js";
import addTask from "../../icons/addTask.svg";
import deleteTask from "../../icons/deleteTask.svg";
import { editTask, deleteTaskAction } from "../../redux/actions/index.js";

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

export default function GroupWithcontent(props) {
  const dispatch = useDispatch();
  const userGroup = props.user.group;
  const [value, setValue] = useState(0);
  const [groupId, setGroupId] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [editing, setEditing] = useState(null);
  const [title, setTitle] = useState("");

  const [tasks, setTasks] = useState(userGroup.map((group) => group.tasks));

  const content = userGroup.length > 0 ? true : false;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleUpdateTask = async (taskId, data) => {
    const response = await dispatch(editTask(taskId, data));
    if (response.status) {
      setEditing(null);
      console.log("handleEditTask", editing, title);
      setTasks(response.data.group.map((group) => group.tasks));
    }
  };
  const handleDeleteTask = async (taskId) => {
    const response = await dispatch(deleteTaskAction(taskId));
    if (response.status) {
      console.log("======================", response.data.group);
      setTasks(response.data.group.map((group) => group.tasks));
      setEditing(null);
      console.log("handleDeleteTask", taskId, title);
    }
  };

  const TaskElement = styled(AccordionDetails)({
    cursor: "pointer",
    borderRadius: "8px",
    transition: "all 0.7s",
    backgroundColor: "#f9f9f9",
    paddingBlock: "5px",
    paddingInlineStart: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    //marginBlockEnd: "5px",
    height: "30px",

    "&:hover": {
      transition: "all 0.3s",
      backgroundColor: "#ffff",
    },
  });

  return (
    <>
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
            const dateTimeString = group.createdAt;
            const dateTimeStringUpdate = group.updatedAt;
            const dateTime = new Date(dateTimeString);
            const dateTimeUpdate = new Date(dateTimeStringUpdate);
            const options = { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric" };

            const formattedDateTime = dateTime.toLocaleString("en-US", options);
            const formattedDateTimeUpdate = dateTimeUpdate.toLocaleString("en-US", options);
            return (
              <TabPanel value={value} index={index}>
                <GroupBox sx={{ padding: "30px" }}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography sx={{ fontSize: "16px", marginBlockEnd: "10px" }}>Total Contributed</Typography>
                    <Typography sx={{ fontSize: "14px", marginBlockEnd: "10px", color: "grey" }}>{formattedDateTime}</Typography>
                    <div>
                      <AccordionBox>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" sx={{ height: "20px", padding: "0px" }}>
                          <Typography
                            color="primary"
                            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", fontSize: "40px", fontWeight: "bold", marginBlock: "0px" }}
                          >
                            <Box>
                              <span>{group.total}</span>
                              <span>{group.currency}</span>
                            </Box>
                            <Button
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "50%",
                                minWidth: "50px",
                                height: "50px",
                                backgroundColor: "#f4f4f4",
                                marginInlineEnd: "23px",
                              }}
                              onClick={() => {
                                handleOpen2();
                                setGroupId(group._id);
                              }}
                            >
                              <img src={addTask} alt="calendar" style={{ width: "20px", height: "20px" }} />
                            </Button>
                          </Typography>
                        </AccordionSummary>

                        <Grid container spacing={1}>
                          {tasks.map((taskGroups, index) => {
                            return taskGroups.map((task, index) => {
                              if (task.group === group._id) {
                                return (
                                  <Grid item xs={12} md={6} xl={4} key={task._id}>
                                    <TaskElement
                                      sx={{ "&:hover > div": { visibility: "visible", opacity: 1 } }}
                                      onDoubleClick={(e) => {
                                        setEditing(task._id);
                                      }}
                                    >
                                      <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Box
                                          sx={{
                                            backgroundColor: colorsMix[index % colorsMix.length],
                                            width: "10px",
                                            height: "10px",
                                            borderRadius: "5px",
                                            marginInlineEnd: "8px",
                                          }}
                                        ></Box>
                                        {editing === task._id ? (
                                          <form onSubmit={() => handleUpdateTask(task._id, title)}>
                                            <TextField
                                              className="inputRounded"
                                              variant="outlined"
                                              defaultValue={task.title}
                                              type="text"
                                              sx={{ backgroundColor: "#fff" }}
                                              onBlur={(e) => {
                                                setEditing(null);
                                              }}
                                              size="small"
                                              onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                  e.preventDefault();
                                                  setTitle(e.target.value);
                                                  handleUpdateTask(task._id, e.target.value);
                                                  setEditing(null);
                                                }
                                              }}
                                            />
                                          </form>
                                        ) : (
                                          <Typography
                                            onClick={() => {
                                              setEditing(task._id);
                                              setTitle(task.title);
                                            }}
                                            onBlur={() => {
                                              setEditing(null);
                                            }}
                                            sx={{
                                              marginInlineEnd: "8px",
                                              width: "150px",
                                              whiteSpace: "nowrap",
                                              overflow: "hidden",
                                              textOverflow: "ellipsis",
                                            }}
                                          >
                                            {task.title}
                                          </Typography>
                                        )}
                                      </Box>

                                      <Box
                                        sx={{
                                          visibility: "hidden",
                                          alignItems: "center",
                                          transition: "opacity .6s ease-in-out",
                                          opacity: editing === task._id ? 1 : 0,
                                        }}
                                      >
                                        <Button
                                          color="delete"
                                          sx={{
                                            minWidth: "15px",
                                            padding: "7px 7px",
                                            borderRadius: "50%",
                                          }}
                                          onClick={() => {
                                            handleDeleteTask(task._id);
                                          }}
                                        >
                                          <img src={deleteTask} alt="" />
                                        </Button>
                                      </Box>
                                    </TaskElement>
                                  </Grid>
                                );
                              } else {
                                return null;
                              }
                            });
                          })}
                        </Grid>
                      </AccordionBox>
                    </div>
                    <Box sx={{ display: "flex", justifyContent: "space-between", marginBlockStart: "15px" }}>
                      <Box sx={{ display: "flex" }}>
                        <img style={{ width: "16px", marginInlineEnd: "10px" }} src={calendar} alt="" />
                        <Typography sx={{ fontSize: "14px" }}>
                          Last updated, <span>{formattedDateTimeUpdate}</span>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </GroupBox>

                {content ? (
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
                    <GroupBox sx={{ maxHeight: "60vh", overflow: "auto" }}>
                      <ActiveGroupMembers member={group.members} user={props.user} group={group} />
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
        <AddTaskModel open={open2} handleClose={handleClose2} groupId={groupId} />

        <AddMemberModel open={open} groupId={groupId} handleClose={handleClose} />
      </Box>
    </>
  );
}
