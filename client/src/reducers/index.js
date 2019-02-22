import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errReducer from "./errReducer";
import alertReducer from "./alertReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";
import inboxReducer from "./inboxReducer";

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  post: postReducer,
  inbox: inboxReducer,
  errors: errReducer,
  alerts: alertReducer
});
