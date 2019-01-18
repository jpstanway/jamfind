import axios from "axios";
import setUserToken from "../utils/setUserToken";
import jwtDecode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// create new user
export const createAccount = (user, history) => dispatch => {
  axios
    .post("/api/users/create-account", user)
    .then(res => history.push("/login"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// login user & set authentication token
export const loginUser = user => dispatch => {
  axios
    .post("/api/users/login", user)
    .then(res => {
      // retrieve user token
      const { token } = res.data;
      // store token in localstorage
      localStorage.setItem("jwtToken", token);
      // set user token
      setUserToken(token);
      // decode token to get user info
      const userInfo = jwtDecode(token);
      // set current user
      dispatch(setCurrentUser(userInfo));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// set current user
export const setCurrentUser = userInfo => {
  return {
    type: SET_CURRENT_USER,
    payload: userInfo
  };
};
