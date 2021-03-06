import React, { Component } from "react";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

class ProfileHeader extends Component {
  onPrivateMessageClick(username) {
    this.props.prepopulateUser(username);
  }

  render() {
    const { profile, auth } = this.props;

    const current = profile.experience.filter(exp => exp.current);

    const instrumentList = profile.instruments.map(instrument => (
      <li key={instrument} className="list-group-item">
        <span>
          <i className="fas fa-arrow-right" />
        </span>{" "}
        {instrument}
      </li>
    ));

    const privateMessage =
      profile.userid.username === auth.user.username ||
      !auth.isAuthenticated ? null : (
        <div className="col-md-12 text-center">
          <Link
            to="/inbox"
            onClick={this.onPrivateMessageClick.bind(
              this,
              profile.userid.username
            )}
            className="btn btn-link text-custom-actions"
          >
            <i className="far fa-comments" /> Send a message to{" "}
            {profile.userid.username}
          </Link>
        </div>
      );

    return (
      <div className="p-header">
        <div className="row mt-3">
          <div className="col-md-6 bg-custom-dark p-5">
            <div className="card custom-card m-auto bg-custom-dark">
              <img
                src={profile.userid.avatar}
                className="card-img-top img-thumbnail profile-avatar"
                alt={profile.userid.username}
              />
              <div className="card-body text-light text-center">
                <h5 className="card-title">
                  {profile.name || profile.username}
                </h5>
                {isEmpty(current) ? null : (
                  <p className="card-text">
                    {current.role} for{" "}
                    {current.projectname || current.typeofexperience}
                  </p>
                )}
                <p className="card-text">{}</p>
                <small>{profile.location}</small>
                <ul className="nav profile-social-links">
                  {isEmpty(profile.social && profile.social.youtube) ? null : (
                    <li className="nav-item">
                      <a className="nav-link" href={profile.social.youtube}>
                        <span className="social-link-bg">
                          <i className="fab fa-youtube fa-2x" />
                        </span>
                      </a>
                    </li>
                  )}
                  {isEmpty(profile.social && profile.social.facebook) ? null : (
                    <li className="nav-item">
                      <a className="nav-link" href={profile.social.facebook}>
                        <span className="social-link-bg">
                          <i className="fab fa-facebook fa-2x" />
                        </span>
                      </a>
                    </li>
                  )}
                  {isEmpty(profile.social && profile.social.twitter) ? null : (
                    <li className="nav-item">
                      <a className="nav-link" href={profile.social.twitter}>
                        <span className="social-link-bg">
                          <i className="fab fa-twitter-square fa-2x" />
                        </span>
                      </a>
                    </li>
                  )}
                  {isEmpty(
                    profile.social && profile.social.instagram
                  ) ? null : (
                    <li className="nav-item">
                      <a className="nav-link" href={profile.social.instagram}>
                        <span className="social-link-bg">
                          <i className="fab fa-instagram fa-2x" />
                        </span>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6 bg-custom-dark p-5">
            <div className="card custom-card m-auto bg-custom-dark">
              <h4 className="text-light text-center">Instruments & Skills</h4>
              <ul className="list-group text-dark">{instrumentList}</ul>
            </div>
          </div>
        </div>
        <div className="row mt-2">{privateMessage}</div>
      </div>
    );
  }
}

export default ProfileHeader;
