import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/tools/PrivateRoute";
import jwtDecode from "jwt-decode";
import setUserToken from "./utils/setUserToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import "./App.css";

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import CreateAccount from "./components/auth/CreateAccount";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";

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
    // TODO: clear current profile
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
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
