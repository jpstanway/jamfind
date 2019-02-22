import axios from "axios";
import {
  GET_INBOX,
  GET_CONVERSATION,
  GET_ERRORS,
  CLEAR_ERRORS,
  IS_LOADING
} from "./types";

export const getUserInbox = () => dispatch => {
  dispatch(inboxLoading());
  axios
    .get("/api/inboxes")
    .then(inbox => {
      dispatch({
        type: GET_INBOX,
        payload: inbox.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_INBOX,
        payload: null
      });
    });
};

export const sendPrivateMessage = messageData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/inboxes/conversations", messageData)
    .then(inbox => {
      dispatch({
        type: GET_INBOX,
        payload: inbox.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const inboxLoading = () => dispatch => {
  dispatch({
    type: IS_LOADING
  });
};

export const clearErrors = () => dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  });
};
