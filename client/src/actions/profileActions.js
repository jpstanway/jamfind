import axios from "axios";
import {
  GET_CURRENT_PROFILE,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from "./types";

export const getCurrentProfile = user => dispatch => {
  axios
    .get("/api/profiles", user)
    .then(profile => {
      dispatch({
        type: GET_CURRENT_PROFILE,
        payload: profile.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_CURRENT_PROFILE,
        payload: {}
      });
    });
};

export const clearCurrentProfile = () => dispatch => {
  dispatch({
    type: CLEAR_CURRENT_PROFILE
  });
};

export const createNewProfile = (profile, history) => dispatch => {
  axios
    .post("/api/profiles", profile)
    .then(res => history.push("/dashboard"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const addExperience = (exp, history) => dispatch => {
  axios
    .post("/api/profiles/experience", exp)
    .then(res => history.push("/dashboard"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const addEducation = (edu, history) => dispatch => {
  axios
    .post("/api/profiles/education", edu)
    .then(res => history.push("/dashboard"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
