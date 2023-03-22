import { ADD_USER, GET_USER_DATA, ERROR } from "../actions/index.js";

const initialState = {
  addedUser: null,
  accessToken: localStorage.getItem("token"),
  isAuthenticated: false,
  UserData: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      localStorage.setItem("token", action.payload.accessToken);
      return {
        ...state,
        addedUser: action.payload.user,
        accessToken: action.payload.accessToken,
        isAuthenticated: true,
      };
    case GET_USER_DATA:
      return {
        ...state,
        UserData: action.payload,
      };
    case ERROR:
      return {
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
