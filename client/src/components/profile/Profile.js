import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { getProfileByUsername } from "../../actions/profileActions";
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
    if (
      Object.keys(nextProps.profile.profile).length === 0 ||
      nextProps.profile === null
    ) {
      this.props.history.push("/not-found");
    }
  }

  render() {
    const { profile, isLoading } = this.props.profile;
    let content;

    if (Object.keys(profile).length === 0 || isLoading) {
      content = <Loading />;
    } else {
      content = (
        <div className="profile">
          <ProfileHeader profile={profile} />
          <ProfileInfo bio={profile.bio} />
          <ProfileExp experience={profile.experience} />
          <ProfileEdu education={profile.education} />
          <ProfileSoundCloud soundcloudusername={profile.soundcloudusername} />
        </div>
      );
    }

    return <div className="container">{content}</div>;
  }
}

Profile.propTypes = {
  getProfileByUsername: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByUsername }
)(withRouter(Profile));
