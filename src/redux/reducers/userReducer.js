import { ADD_USER, GET_USER_DATA, ERROR } from "../actions/index.js";

const initialState = {
  addedUser: {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    group: [],
    contributions: [],
  },
  errorMessage: {
    message: "",
    status: null,
  },
  UserData: {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    group: [],
    contributions: [],
  },
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
    case ERROR:
      return {
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
