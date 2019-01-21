import { GET_CURRENT_PROFILE, CLEAR_CURRENT_PROFILE } from "../actions/types";

const initialState = {
  profile: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: {}
      };
    default:
      return state;
  }
}
