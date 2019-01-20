import axios from "axios";
import { GET_CURRENT_PROFILE } from "./types";

export const getCurrentProfile = user => dispatch => {
  axios.get("/api/profiles", user).then(profile => {
    dispatch({
      type: GET_CURRENT_PROFILE,
      payload: profile.response.data
    });
  });
};
