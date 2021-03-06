import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/tools/PrivateRoute";
import jwtDecode from "jwt-decode";
import setUserToken from "./utils/setUserToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import "./App.scss";

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
import ChangePassword from "./components/dashboard/ChangePassword";
import Profile from "./components/profile/Profile";
import Profiles from "./components/profile/Profiles";
import Post from "./components/post/Post";
import Posts from "./components/post/Posts";
import EditPost from "./components/post-actions/EditPost";
import EditReply from "./components/post-actions/EditReply";
import Inbox from "./components/inbox/Inbox";
import Conversation from "./components/inbox/Conversation";
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
    // clear current profile
    store.dispatch(clearCurrentProfile());
    // log user out
    store.dispatch(logoutUser());
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
            <Route exact path="/profiles/user/:username" component={Profile} />
            <Route exact path="/profiles/all" component={Profiles} />
            <Route exact path="/posts/post/:postid" component={Post} />
            <Route exact path="/posts/all" component={Posts} />
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
            <Switch>
              <PrivateRoute
                exact
                path="/change-password"
                component={ChangePassword}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/posts/edit-post/:postid"
                component={EditPost}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/posts/edit-reply/:postid/:replyid"
                component={EditReply}
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/inbox" component={Inbox} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/inbox/:conversationid"
                component={Conversation}
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
