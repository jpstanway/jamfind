import React from "react";
import isEmpty from "../../validation/is-empty";

const ProfileSoundCloud = props => {
  return (
    <div className="row mb-5">
      <div className="col-md-12">
        <h4>John On SoundCloud</h4>
        <p>
          {isEmpty(props.soundcloudusername)
            ? "User hasn't given their SoundCloud info yet."
            : props.soundcloudusername}
        </p>
      </div>
    </div>
  );
};

export default ProfileSoundCloud;
