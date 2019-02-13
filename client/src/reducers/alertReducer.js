import { GET_ALERTS, CLEAR_ALERTS } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALERTS:
      return action.payload;
    case CLEAR_ALERTS:
      return {};
    default:
      return state;
  }
}
