import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errReducer from "./errReducer";
import alertReducer from "./alertReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  post: postReducer,
  errors: errReducer,
  alerts: alertReducer
});
