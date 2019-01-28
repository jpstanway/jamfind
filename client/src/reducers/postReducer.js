import {
  GET_ALL_POSTS,
  GET_CURRENT_POST,
  ADD_NEW_POST,
  IS_LOADING
} from "../actions/types";

const initialState = {
  post: null,
  posts: null,
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        posts: action.payload,
        isLoading: false
      };
    case GET_CURRENT_POST:
      return {
        ...state,
        post: action.payload,
        isLoading: false
      };
    case ADD_NEW_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
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
