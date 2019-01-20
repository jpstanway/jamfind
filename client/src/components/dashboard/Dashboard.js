import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profileActions";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";

class Dashboard extends Component {
  render() {
    const username = this.props.auth.user.username;

    return (
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h1 class="pt-5">Welcome {username}</h1>
            <p class="lead">Dashboard</p>
          </div>
        </div>
        <ProfileActions />
        <Experience />
        <Education />
        <div class="row mb-2">
          <div class="col-md-12">
            <button type="button" class="btn btn-link text-danger">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    );
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
