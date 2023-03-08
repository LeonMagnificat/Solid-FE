export const ADD_USER = "ADD_USER";

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
        console.log("data", data);
        dispatch({
          type: ADD_USER,
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
