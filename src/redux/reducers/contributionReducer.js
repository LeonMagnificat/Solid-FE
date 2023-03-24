import { ADD_USER_CONTRIBUTION } from "../actions/index.js";

const initialState = {
  contribution: [],
};

const contributionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_CONTRIBUTION:
      localStorage.setItem("token", action.payload.accessToken);
      return {
        ...state,
        contributionMember: action.payload,
      };

    default:
      return state;
  }
};

export default contributionReducer;
