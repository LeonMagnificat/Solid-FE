export const ADD_USER = "ADD_USER";
export const GET_USER_DATA = "GET_USER_DATA";

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
      } else {
        console.log("response", response);
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
