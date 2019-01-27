import axios from "axios";
import { GET_CURRENT_POST, GET_ALL_POSTS, GET_ERRORS } from "./types";

export const createNewPost = (text, history) => dispatch => {
  axios
    .post("/api/posts", text)
    .then(post => history.push(`/posts/post/${post._id}`))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
