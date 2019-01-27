import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getAllProfiles } from "../../actions/profileActions";
import Loading from "../tools/Loading";

class Profiles extends Component {
  componentDidMount() {
    this.props.getAllProfiles();
  }

  render() {
    const { profiles, isLoading } = this.props.profile;
    let profileFeed;

    if (profiles === null || isLoading) {
      profileFeed = <Loading />;
    } else {
      profileFeed = profiles.map(profile => (
        <div className="row mb-5">
          <div className="col-md-8 m-auto">
            <div className="card p-2">
              <div className="row">
                <div className="col-md-4">
                  <img
                    src={profile.userid.avatar}
                    className="card-img-top img-thumbnail"
                    alt="..."
                  />
                </div>
                <div className="col-md-4">
                  <div className="card-body text-center">
                    <h5 className="card-title">
                      {profile.name || profile.username}
                    </h5>
                    <p className="card-text">{profile.instruments[0]}</p>
                    <small>{profile.location}</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <ul className="list-group list-group-flush mb-1">
                    {profile.instruments.map(instrument => (
                      <li className="list-group-item">
                        <span>
                          <i className="fas fa-arrow-right" />{" "}
                        </span>
                        {instrument}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/profiles/user/${profile.userid.username}`}
                    className="btn btn-primary float-right m-1"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ));
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1 className="pt-5">Musician Profiles</h1>
            <p className="lead">
              Browse and connect with musicians from your area or around the
              world
            </p>
          </div>
        </div>
        {profileFeed}
      </div>
    );
  }
}

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getAllProfiles }
)(Profiles);
