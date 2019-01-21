import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profileActions";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";

class Dashboard extends Component {
  componentDidMount() {
    if (this.props.profile) {
      this.props.getCurrentProfile(this.props.auth.user);
    }
  }

  render() {
    const { profile, auth } = this.props;

    const noProfile = (
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
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
        </div>
      </div>
    );

    const hasProfile = (
      <div className="container">
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
            <button type="button" className="btn btn-link text-danger">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    );

    const profileDisplay =
      Object.keys(this.props.profile.profile).length > 0
        ? hasProfile
        : noProfile;

    return <div>{profileDisplay}</div>;
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
