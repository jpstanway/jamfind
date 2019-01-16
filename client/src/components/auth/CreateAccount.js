import React, { Component } from "react";

class CreateAccount extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center pt-5">
            <h1>Create A New Account</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 m-auto standard-form">
            <form>
              <div className="form-group">
                <label for="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  id="username"
                  placeholder="Your desired username"
                />
              </div>
              <div className="form-group">
                <label for="email">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                />
              </div>
              <div className="form-group">
                <label for="password2">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password2"
                  id="password2"
                  placeholder="Confirm your password"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateAccount;
