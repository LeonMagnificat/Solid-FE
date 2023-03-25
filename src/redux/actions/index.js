export const ADD_USER = "ADD_USER";
export const GET_USER_DATA = "GET_USER_DATA";
export const ERROR = "ERROR";
export const ADD_USER_CONTRIBUTION = "ADD_USER_CONTRIBUTION";
const apiURL = "http://localhost:3002";
console.log("apiURL", apiURL);

export const RegisterUser = (newUser) => {
  return async (dispatch, getState) => {
    const method = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    };
    try {
      const response = await fetch(apiURL + "/user/register", method);
      if (response.ok) {
        const data = await response.json();

        console.log("data", data);
        dispatch({
          type: ADD_USER,
          payload: data,
        });

        const userData = {
          data: data,
          status: true,
        };

        return userData;
      } else {
        const data = await response.json();
        console.log("response", response, data.message);

        const errorData = {
          message: data.message,
          status: false,
        };
        return errorData;
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const RegisterByInvitation = (newUser, groupId) => {
  return async (dispatch, getState) => {
    const method = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    };
    try {
      const response = await fetch(`http://localhost:3002/user/register/${groupId}`, method);
      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        dispatch({
          type: ADD_USER,
          payload: data,
        });
        const userData = {
          data: data,
          status: true,
        };

        return userData;
      } else {
        const data = await response.json();
        console.log("response", response, data.message);
        const errorData = {
          message: data.message,
          status: false,
        };
        return errorData;
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};
export const loginUser = (user) => {
  return async (dispatch, getState) => {
    const method = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    try {
      const response = await fetch(`http://localhost:3002/user/login`, method);
      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        const token = data.accessToken;
        localStorage.setItem("token", token);
        dispatch({
          type: ADD_USER,
          payload: data,
        });
        const userData = {
          data: data,
          status: true,
        };
        return userData;
      } else {
        const data = await response.json();
        console.log("response", response, data.message);
        const errorData = {
          message: data.message,
        };
        return errorData;
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const loginInvitedUser = (user, groupId) => {
  return async (dispatch, getState) => {
    const method = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    try {
      const response = await fetch(`http://localhost:3002/user/login/${groupId}`, method);
      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        dispatch({
          type: ADD_USER,
          payload: data,
        });
        const userData = {
          data: data,
          status: true,
        };
        return userData;
      } else {
        const data = await response.json();
        console.log("response", response, data.message);
        const errorData = {
          message: data.message,
        };
        return errorData;
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const checkLoggedIn = (userId) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token does not exist, user is not logged in");
      return;
    }

    // Verify token with server
    try {
      const response = await fetch(`http://localhost:3002/user/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Token is valid, dispatch action to log user in
        const user = await response.json();
        console.log("userqwqweweweasasadwdw", user.contributions);
        dispatch({
          type: GET_USER_DATA,
          payload: user,
        });
      } else {
        // Token is invalid, remove it from storage
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.log("Error verifying token:", error);
    }
  };
};

// export const getUserData = (userId) => {
//   return async (dispatch, getState) => {
//     try {
//       const response = await fetch(`http://localhost:3002/user/${userId}`);
//       if (response.ok) {
//         const data = await response.json();
//         dispatch({
//           type: GET_USER_DATA,
//           payload: data,
//         });
//       } else {
//         console.log("response", response);
//       }
//     } catch (error) {
//       console.log("error", error);
//     }
//   };
// };

export const createGroup = (group, userId) => {
  return async (dispatch, getState) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token does not exist, user is not logged in");
      return;
    }
    const method = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(group),
    };
    try {
      const response = await fetch(`http://localhost:3002/group/newGroup/${userId}`, method);
      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        dispatch({
          type: GET_USER_DATA,
          payload: data,
        });
        const groupData = {
          data: data,
          status: true,
        };
        return groupData;
      } else {
        const data = await response.json();
        console.log("response", response, data.message);
        const errorData = {
          message: data.message,
        };
        return errorData;
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const editGroup = (group, groupId) => {
  return async (dispatch, getState) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token does not exist, user is not logged in");
      return;
    }
    const method = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(group),
    };
    try {
      const response = await fetch(`http://localhost:3002/group/${groupId}`, method);
      if (response.ok) {
        const data = await response.json();
        console.log("edited group", data);
        dispatch({
          type: GET_USER_DATA,
          payload: data,
        });
        const groupData = {
          data: data,
          status: true,
        };
        return groupData;
      } else {
        const data = await response.json();
        console.log("response", response, data.message);
        const errorData = {
          message: data.message,
        };
        return errorData;
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const deleteGroup = (groupId) => {
  return async (dispatch, getState) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token does not exist, user is not logged in");
      return;
    }
    const method = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(`http://localhost:3002/group/${groupId}`, method);
      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        dispatch({
          type: GET_USER_DATA,
          payload: data.user,
        });
        const groupData = {
          data: data,
          status: true,
        };
        return groupData;
      } else {
        const data = await response.json();
        console.log("response", response, data.message);
        const errorData = {
          message: data.message,
        };
        return errorData;
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const deleteUserInGroup = (groupId, userId) => {
  return async (dispatch, getState) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token does not exist, user is not logged in");
      return;
    }
    const method = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(`http://localhost:3002/user/deleteMember/${groupId}/${userId}`, method);
      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        dispatch({
          type: GET_USER_DATA,
          payload: data.currentUser,
        });
        const groupData = {
          data: data,
          status: true,
        };
        return groupData;
      } else {
        const data = await response.json();
        console.log("response", response, data.message);
        const errorData = {
          message: data.message,
        };
        return errorData;
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const addUserToGroup = (email, groupId) => {
  return async (dispatch, getState) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token does not exist, user is not logged in");
      return;
    }
    const method = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email: email }),
    };
    try {
      const response = await fetch(`http://localhost:3002/group/inviteGroup/${groupId}`, method);
      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        const responseData = {
          data: data,
          status: true,
        };
        return responseData;
      } else {
        const data = await response.json();
        console.log("response", response, data.message);
        return data.message;
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};

//--------------------------Contribution--------------------------

export const addContribution = (groupId, userId, data) => {
  return async (dispatch, getState) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token does not exist, user is not logged in");
      return;
    }
    const method = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount: data }),
    };
    try {
      const response = await fetch(`http://localhost:3002/contribution/${groupId}/${userId}`, method);
      if (response.ok) {
        const data = await response.json();
        console.log("datapopopopop", data);
        // dispatch({
        //   type: ADD_USER_CONTRIBUTION,
        //   payload: data.contributions,
        // });
        dispatch({
          type: GET_USER_DATA,
          payload: data,
        });
        const responseData = {
          data: data,
          status: true,
        };
        return responseData;
      } else {
        const data = await response.json();
        console.log("response", response, data.message);
        return data.message;
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};

//-------Add Tasks------------

export const addNewTask = (groupId, data) => {
  return async (dispatch, getState) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token does not exist, user is not logged in");
      return;
    }
    const method = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: data }),
    };
    try {
      const response = await fetch(`http://localhost:3002/task/${groupId}`, method);
      if (response.ok) {
        const data = await response.json();
        console.log("datapopopopop", data);
        // dispatch({
        //   type: ADD_USER_CONTRIBUTION,
        //   payload: data.contributions,
        // });
        dispatch({
          type: GET_USER_DATA,
          payload: data,
        });
        const responseData = {
          data: data,
          status: true,
        };
        return responseData;
      } else {
        const data = await response.json();
        console.log("response", response, data.message);
        return data.message;
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const editTask = (taskId, data) => {
  return async (dispatch, getState) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token does not exist, user is not logged in");
      return;
    }
    const method = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: data }),
    };
    try {
      const response = await fetch(`http://localhost:3002/task/${taskId}`, method);
      if (response.ok) {
        const data = await response.json();
        console.log("datapopopopop", data);
        // dispatch({
        //   type: ADD_USER_CONTRIBUTION,
        //   payload: data.contributions,
        // });
        dispatch({
          type: GET_USER_DATA,
          payload: data,
        });
        const responseData = {
          data: data,
          status: true,
        };
        return responseData;
      } else {
        const data = await response.json();
        console.log("response", response, data.message);
        return data.message;
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const deleteTaskAction = (taskId) => {
  return async (dispatch, getState) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token does not exist, user is not logged in");
      return;
    }
    const method = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(`http://localhost:3002/task/${taskId}`, method);
      if (response.ok) {
        const data = await response.json();
        console.log("datapopopopop", data);

        dispatch({
          type: GET_USER_DATA,
          payload: data,
        });
        const responseData = {
          data: data,
          status: true,
        };
        return responseData;
      } else {
        const data = await response.json();
        console.log("response", response, data.message);
        return data.message;
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};
