import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { getProfileByUsername } from "../../actions/profileActions";
import { prepopulateUser } from "../../actions/inboxActions";
import ProfileHeader from "./ProfileHeader";
import ProfileInfo from "./ProfileInfo";
import ProfileExp from "./ProfileExp";
import ProfileEdu from "./ProfileEdu";
import ProfileSoundCloud from "./ProfileSoundCloud";
import Loading from "../tools/Loading";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.username) {
      this.props.getProfileByUsername(this.props.match.params.username);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.isLoading) {
      this.props.history.push("/not-found");
    }
  }

  render() {
    const { profile, isLoading } = this.props.profile;
    const { auth, prepopulateUser } = this.props;
    let content;

    if (profile === null || isLoading) {
      content = <Loading />;
    } else {
      content = (
        <div className="profile">
          <div className="row">
            <div className="col-md-12">
              <Link
                to="/profiles/all"
                className="btn btn-custom-outline-secondary btn-sm"
              >
                Go back
              </Link>
            </div>
          </div>
          <ProfileHeader
            profile={profile}
            auth={auth}
            prepopulateUser={prepopulateUser}
          />
          <ProfileInfo bio={profile.bio} />
          <ProfileExp experience={profile.experience} />
          <ProfileEdu education={profile.education} />
          <hr className="mt-5 mb-5" />
          <ProfileSoundCloud profile={profile} />
        </div>
      );
    }

    return <div className="container">{content}</div>;
  }
}

Profile.propTypes = {
  getProfileByUsername: PropTypes.func.isRequired,
  prepopulateUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByUsername, prepopulateUser }
)(withRouter(Profile));
