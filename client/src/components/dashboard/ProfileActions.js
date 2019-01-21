import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="btn-group btn-group-sm" role="group">
          <Link to="/edit-profile" type="button" className="btn btn-secondary">
            Edit Profile
          </Link>
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
