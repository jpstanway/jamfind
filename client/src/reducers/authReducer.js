import { SET_CURRENT_USER, GET_MESSAGE } from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  user: {},
  isAuthenticated: false,
  message: null,
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !isEmpty(action.payload)
      };
    case GET_MESSAGE:
      return {
        ...state,
        message: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
}
