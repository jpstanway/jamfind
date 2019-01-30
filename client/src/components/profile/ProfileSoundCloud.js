import React from "react";
import isEmpty from "../../validation/is-empty";

const ProfileSoundCloud = props => {
  return (
    <div className="row mb-5">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <i className="fab fa-soundcloud fa-2x" />{" "}
            {props.profile.userid.username} on SoundCloud
          </div>
          <div className="card-body">
            {isEmpty(props.profile.soundcloudusername) ? null : (
              <p>
                <strong>Username: </strong>
                {props.profile.soundcloudusername}
              </p>
            )}
            <p className="text-muted">SoundCloud integration coming soon.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSoundCloud;
