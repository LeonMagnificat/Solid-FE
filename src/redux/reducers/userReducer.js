const initialState = {
  addedUser: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    group: [],
    contributions: [],
    id: "",
  },
  accessToken: "",
  isAuthenticated: "",

  UserData: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    group: [],
    contributions: [],
    id: "",
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      localStorage.setItem("token", action.payload.accessToken);
      return {
        ...state,
        addedUser: action.payload.user,
        accessToken: action.payload.accessToken,
        isAuthenticated: true,
      };
    case "GET_USER_DATA":
      return {
        ...state,
        UserData: action.payload,
      };

    case "DE_AUTHENTICATION":
      return {
        isAuthenticated: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
