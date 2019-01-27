import {
  GET_CURRENT_PROFILE,
  CLEAR_CURRENT_PROFILE,
  IS_LOADING,
  GET_ALL_PROFILES
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
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
        profile: null
      };
    case IS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case GET_ALL_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
}
