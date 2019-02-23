import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import { clearAlerts } from "../../actions/authActions";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";
import Loading from "../tools/Loading";
import Alert from "../tools/Alert";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      alerts: {}
    };
  }

  componentDidMount() {
    if (this.props.profile) {
      this.props.getCurrentProfile(this.props.auth.user);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.alerts) {
      this.setState({ alerts: nextProps.alerts });
    }
  }

  componentWillUnmount() {
    this.props.clearAlerts();
  }

  onDeleteClick() {
    this.props.deleteAccount();
  }

  render() {
    const { profile, auth } = this.props;
    const { alerts } = this.state;
    let profileDisplay;

    if (profile.profile === null || profile.isLoading) {
      profileDisplay = <Loading />;
    } else {
      const noProfile = (
        <div className="container">
          <div className="row text-center">
            <div className="col-md-12 ">
              <h1>Welcome {auth.user.username}</h1>
              <p className="lead">You're almost finished!</p>
              <Link
                to="/edit-profile"
                type="button"
                className="btn btn-secondary btn-lg"
              >
                Create A Profile
              </Link>
            </div>
            <div className="col-md-12 mt-3">
              <Link
                to="/change-password"
                className="btn btn-link text-custom-danger"
              >
                Change Password
              </Link>
              <button
                onClick={this.onDeleteClick.bind(this)}
                type="button"
                className="btn btn-link text-custom-danger"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      );

      const hasProfile = (
        <div className="container dashboard">
          <Alert alert={alerts.dashboard} />
          <div className="row">
            <div className="col-md-12">
              <h1>Welcome {auth.user.username}</h1>
              <p className="lead">Dashboard</p>
            </div>
          </div>
          <ProfileActions />
          <Experience experience={profile.profile.experience} />
          <Education education={profile.profile.education} />
          <div className="row mb-2">
            <div className="col-md-12">
              <Link
                to={`/profiles/user/${auth.user.username}`}
                className="btn btn-custom-outline-actions"
              >
                View Your Profile
              </Link>
              <Link
                to="/change-password"
                className="btn btn-link text-custom-danger"
              >
                Change Password
              </Link>
              <button
                onClick={this.onDeleteClick.bind(this)}
                type="button"
                className="btn btn-link text-custom-danger"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      );

      profileDisplay =
        Object.keys(this.props.profile.profile).length > 0
          ? hasProfile
          : noProfile;
    }

    return <div>{profileDisplay}</div>;
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object,
  alerts: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  alerts: state.alerts
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount, clearAlerts }
)(Dashboard);
