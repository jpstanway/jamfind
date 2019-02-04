import axios from "axios";
import {
  GET_CURRENT_POST,
  GET_ALL_POSTS,
  GET_ERRORS,
  CLEAR_ERRORS,
  IS_LOADING,
  ADD_NEW_POST
} from "./types";

export const createNewPost = postData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/posts", postData)
    .then(post => {
      dispatch({
        type: ADD_NEW_POST,
        payload: post.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const addNewReply = (text, postid) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/replies/${postid}`, text)
    .then(post => {
      dispatch({
        type: GET_CURRENT_POST,
        payload: post.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getCurrentPost = postid => dispatch => {
  dispatch(postLoading());
  axios
    .get(`/api/posts/${postid}`)
    .then(post => {
      dispatch({
        type: GET_CURRENT_POST,
        payload: post.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_CURRENT_POST,
        payload: {}
      });
    });
};

export const getAllPosts = () => dispatch => {
  dispatch(postLoading());
  axios
    .get("/api/posts")
    .then(posts => {
      dispatch({
        type: GET_ALL_POSTS,
        payload: posts.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ALL_POSTS,
        payload: null
      });
    });
};

export const postLoading = () => dispatch => {
  dispatch({
    type: IS_LOADING
  });
};

export const likePost = postid => dispatch => {
  axios
    .post(`/api/posts/likes/${postid}`)
    .then(res => dispatch(getAllPosts()))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const dislikePost = postid => dispatch => {
  axios
    .post(`/api/posts/dislikes/${postid}`)
    .then(res => dispatch(getAllPosts()))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deletePost = postid => dispatch => {
  axios
    .delete(`/api/posts/${postid}`)
    .then(res => dispatch(getAllPosts()))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteReply = (postid, replyid) => dispatch => {
  axios
    .delete(`/api/posts/replies/${postid}/${replyid}`)
    .then(res => dispatch(getCurrentPost(postid)))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const clearErrors = () => dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  });
};
