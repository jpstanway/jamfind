import axios from "axios";

// function for setting Authorization headers
const setUserToken = token => {
  if (token) {
    // authenticate every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // delete Authorization header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setUserToken;
