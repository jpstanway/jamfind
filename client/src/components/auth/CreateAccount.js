import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { createAccount } from "../../actions/authActions";
import TextFieldInput from "../tools/TextFieldInput";

class CreateAccount extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.createAccount(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center pt-5">
            <h1>Create A New Account</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 m-auto standard-form">
            <form noValidate onSubmit={this.onSubmit}>
              <TextFieldInput
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.onChange}
                label="Username"
                placeholder="Enter a username"
                error={errors.username}
              />
              <TextFieldInput
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                label="E-mail"
                placeholder="Enter your e-mail"
                error={errors.email}
              />
              <TextFieldInput
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
                label="Password"
                placeholder="Enter a password"
                error={errors.password}
              />
              <TextFieldInput
                type="password"
                name="password2"
                value={this.state.password2}
                onChange={this.onChange}
                label="Confirm Password"
                placeholder="Confirm your password"
                error={errors.password2}
              />
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

CreateAccount.propTypes = {
  createAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createAccount }
)(withRouter(CreateAccount));
