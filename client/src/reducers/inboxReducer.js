import { GET_INBOX, GET_CONVERSATION } from "../actions/types";

const initialState = {
  conversation: null,
  conversations: null,
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_INBOX:
      return {
        ...state,
        conversations: action.payload,
        isLoading: false
      };
    case GET_CONVERSATION:
      return {
        ...state,
        conversation: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
}
