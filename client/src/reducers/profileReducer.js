import {
  GET_CURRENT_PROFILE,
  CLEAR_CURRENT_PROFILE,
  IS_LOADING
} from "../actions/types";

const initialState = {
  profile: {},
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_PROFILE:
      return {
        ...state,
        profile: action.payload,
        isLoading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: {}
      };
    case IS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
}
