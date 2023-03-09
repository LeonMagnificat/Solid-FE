import { ADD_USER, GET_USER_DATA } from "../actions/index.js";

const initialState = {
  addedUser: {},
  UserData: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        addedUser: action.payload,
      };
    case GET_USER_DATA:
      return {
        ...state,
        UserData: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
