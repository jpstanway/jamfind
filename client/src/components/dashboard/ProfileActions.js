import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="btn-group btn-group-sm" role="group">
          <Link to="/edit-profile" className="btn btn-custom-outline-actions">
            Edit Profile
          </Link>
          <Link to="/add-experience" className="btn btn-custom-outline-actions">
            Add Experience
          </Link>
          <Link to="/add-education" className="btn btn-custom-outline-actions">
            Add Education
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileActions;
