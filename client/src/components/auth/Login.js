import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { loginUser } from "../../actions/authActions";
import TextFieldInput from "../tools/TextFieldInput";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userInfo = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userInfo, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center pt-5">
            <h1>Login</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 m-auto standard-form">
            <form noValidate onSubmit={this.onSubmit}>
              <TextFieldInput
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                label="E-mail"
                placeholder="Enter your email"
                error={errors.email}
              />
              <TextFieldInput
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
                label="Password"
                placeholder="Enter your password"
                error={errors.password}
              />
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
