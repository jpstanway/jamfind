import React from "react";

const ProfileActions = () => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="btn-group btn-group-sm" role="group">
          <button type="button" className="btn btn-outline-secondary">
            Edit Profile
          </button>
          <button type="button" className="btn btn-outline-secondary">
            Add Experience
          </button>
          <button type="button" className="btn btn-outline-secondary">
            Add Education
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileActions;
