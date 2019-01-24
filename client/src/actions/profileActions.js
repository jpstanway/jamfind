import axios from "axios";
import {
  GET_CURRENT_PROFILE,
  CLEAR_CURRENT_PROFILE,
  IS_LOADING,
  GET_ERRORS,
  SET_CURRENT_USER
} from "./types";

export const getCurrentProfile = user => dispatch => {
  dispatch(profileLoading());
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

export const profileLoading = () => dispatch => {
  dispatch({
    type: IS_LOADING
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

export const deleteExperience = id => dispatch => {
  axios
    .delete(`/api/profiles/experience/${id}`)
    .then(profile => {
      dispatch({
        type: GET_CURRENT_PROFILE,
        payload: profile.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteEducation = id => dispatch => {
  axios
    .delete(`/api/profiles/education/${id}`)
    .then(profile => {
      dispatch({
        type: GET_CURRENT_PROFILE,
        payload: profile.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone.")) {
    axios
      .delete("/api/profiles")
      .then(res => {
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        });
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  }
};
