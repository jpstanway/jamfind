import React from "react";
import Moment from "react-moment";
import isEmpty from "../../validation/is-empty";

const ProfileExp = props => {
  const expList = props.experience.map(exp => (
    <div className="col-md-6">
      <ul key={exp._id} style={{ listStyleType: "none" }}>
        <li>
          <p>
            <strong>Type: </strong>
            {exp.typeofexperience}
          </p>
        </li>
        <li>
          <p>
            <strong>Role: </strong>
            {exp.role}
          </p>
        </li>
        {isEmpty(exp.projectname) ? null : (
          <li>
            <p>
              <strong>Name: </strong>
              {exp.projectname}
            </p>
          </li>
        )}
        {isEmpty(exp.location) ? null : (
          <li>
            <p>
              <strong>Location: </strong>
              {exp.location}
            </p>
          </li>
        )}
        <li>
          <p>
            <strong>From: </strong>
            <Moment format="YYYY/MM/DD">{exp.from}</Moment>
          </p>
        </li>
        <li>
          <p>
            <strong>To: </strong>
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          </p>
        </li>
        {isEmpty(exp.description) ? null : (
          <li>
            <p>{exp.description}</p>
          </li>
        )}
      </ul>
    </div>
  ));

  return (
    <div className="row mt-3">
      <div className="col-md-12">
        <h4>Experience</h4>
        <div className="card">
          <div className="card-body">
            <div className="row">
              {isEmpty(expList) ? "No experience added" : expList}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileExp;
