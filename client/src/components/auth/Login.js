import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center pt-5">
            <h1>Login</h1>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 m-auto standard-form">
            <form>
              <div class="form-group">
                <label for="email">Email Address</label>
                <input
                  type="email"
                  class="form-control"
                  name="email"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter your email"
                />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                />
              </div>
              <button type="submit" class="btn btn-primary">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
