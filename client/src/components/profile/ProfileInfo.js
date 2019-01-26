import React from "react";
import isEmpty from "../../validation/is-empty";

const ProfileInfo = props => {
  return (
    <div className="row mt-3">
      <div className="col-md-12">
        <h4>Bio</h4>
        <div className="card">
          <div className="card-body">
            <blockquote className="blockquote mb-0">
              <p>
                {isEmpty(props.bio)
                  ? "User has not entered a bio yet."
                  : props.bio}
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
