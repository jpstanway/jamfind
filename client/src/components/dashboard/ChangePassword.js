import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import TextFieldInput from "../tools/TextFieldInput";
import { changePassword } from "../../actions/authActions";

class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      newPassword: "",
      newPassword2: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

    const passwordData = {
      password: this.state.password,
      newPassword: this.state.newPassword,
      newPassword2: this.state.newPassword2
    };

    this.props.changePassword(passwordData, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link
              to="/dashboard"
              className="btn btn-custom-outline-secondary btn-sm"
            >
              Go back
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center pt-5">
            <h1>Change Password</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 m-auto standard-form">
            <form noValidate onSubmit={this.onSubmit}>
              <TextFieldInput
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
                label="Current password"
                placeholder="Enter your current password"
                error={errors.password}
              />
              <hr className="mt-4 mb-3" />
              <TextFieldInput
                type="password"
                name="newPassword"
                value={this.state.newPassword}
                onChange={this.onChange}
                label="New password"
                placeholder="Enter your new password"
                error={errors.newPassword}
              />
              <TextFieldInput
                type="password"
                name="newPassword2"
                value={this.state.newPassword2}
                onChange={this.onChange}
                label="Confirm new password"
                placeholder="Please confirm your new password"
                error={errors.newPassword2}
              />
              <button type="submit" className="btn btn-custom-primary">
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ChangePassword.propTypes = {
  changePassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { changePassword }
)(withRouter(ChangePassword));
