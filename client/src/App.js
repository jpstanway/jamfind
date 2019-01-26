import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/tools/PrivateRoute";
import jwtDecode from "jwt-decode";
import setUserToken from "./utils/setUserToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import "./App.css";

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import CreateAccount from "./components/auth/CreateAccount";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import EditProfile from "./components/profile-actions/EditProfile";
import AddExperience from "./components/profile-actions/AddExperience";
import AddEducation from "./components/profile-actions/AddEducation";
import Profile from "./components/profile/Profile";
import NotFound from "./components/tools/NotFound";

// ** keep user logged in **
// check for jwt token
if (localStorage.jwtToken) {
  // set authentication header
  setUserToken(localStorage.jwtToken);
  // decode token for user info and expiry
  const userInfo = jwtDecode(localStorage.jwtToken);
  // re-set user authentication
  store.dispatch(setCurrentUser(userInfo));

  // check for expired token
  const currentTime = Date.now() / 1000;
  if (userInfo.exp < currentTime) {
    // log user out
    store.dispatch(logoutUser());
    // clear current profile
    store.dispatch(clearCurrentProfile());
    // redirect to login page
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/create-account" component={CreateAccount} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profiles/:username" component={Profile} />
            <Route exact path="/not-found" component={NotFound} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
