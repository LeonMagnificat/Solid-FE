export const ADD_USER = "ADD_USER";
export const GET_USER_DATA = "GET_USER_DATA";
export const ERROR = "ERROR";

export const addUser = (newUser, groupId) => {
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

        const { _id } = data.user;
        const { accessToken } = data;
        console.log("data", data);
        dispatch({
          type: ADD_USER,
          payload: { _id, accessToken },
        });
        dispatch(getUserData(_id));

        window.location.href = "/getStarted";
      } else {
        const data = await response.json();
        console.log("response", response, data.message);
        dispatch({
          type: ERROR,
          payload: data.message,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};
export const addNewUser = (newUser) => {
  return async (dispatch, getState) => {
    const method = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    };
    try {
      const response = await fetch(`http://localhost:3002/user/register`, method);
      if (response.ok) {
        const data = await response.json();

        const { _id } = data.user;
        const { accessToken } = data;
        console.log("data", data);
        dispatch({
          type: ADD_USER,
          payload: { _id, accessToken },
        });

        window.location.href = "/getStarted";
        dispatch(getUserData(_id));
      } else {
        const data = await response.json();
        console.log("response", response, data.message);
        dispatch({
          type: ERROR,
          payload: data.message,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const getUserData = (userId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`http://localhost:3002/user/${userId}`);
      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: GET_USER_DATA,
          payload: data,
        });
      } else {
        console.log("response", response);
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
        const { _id } = data.user;
        const { accessToken } = data;
        dispatch({
          type: ADD_USER,
          payload: { _id, accessToken },
        });
        window.location.href = "/home";
        dispatch(getUserData(_id));
      } else {
        const data = await response.json();
        console.log("response", response, data.message);
        dispatch({
          type: ERROR,
          payload: data.message,
        });
        window.location.href = "/home";
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
        const { _id } = data.user;
        const { accessToken } = data;
        dispatch({
          type: ADD_USER,
          payload: { _id, accessToken },
        });
        window.location.href = "/home";
        dispatch(getUserData(_id));
      } else {
        const data = await response.json();
        console.log("response", response, data.message);
        dispatch({
          type: ERROR,
          payload: data.message,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const createGroup = (group, userId) => {
  return async (dispatch, getState) => {
    const method = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(group),
    };
    try {
      const response = await fetch(`http://localhost:3002/group/newGroup/${userId}`, method);
      if (response.ok) {
        const data = await response.json();
        dispatch(getUserData(userId));
        console.log("data", data);
      } else {
        const data = await response.json();
        console.log("response", response, data.message);
        dispatch({
          type: ERROR,
          payload: data.message,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const addUserToGroup = (email, groupId) => {
  return async (dispatch, getState) => {
    const method = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    };
    try {
      const response = await fetch(`http://localhost:3002/group/inviteGroup/${groupId}`, method);
      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
      } else {
        const data = await response.json();
        console.log("response", response, data.message);
        dispatch({
          type: ERROR,
          payload: data.message,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};
