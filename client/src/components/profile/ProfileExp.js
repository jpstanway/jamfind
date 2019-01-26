import React from "react";
import Moment from "react-moment";

const ProfileExp = props => {
  const expList = props.experience.map(exp => (
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
      <li>
        <p>
          <strong>Name: </strong>
          {exp.projectname}
        </p>
      </li>
      <li>
        <p>
          <strong>Location: </strong>
          {exp.location}
        </p>
      </li>
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
      <li>
        <p>{exp.description}</p>
      </li>
    </ul>
  ));

  return (
    <div className="row mt-3">
      <div className="col-md-12">
        <h4>Experience</h4>
        <div className="card">
          <div className="card-body">{expList}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileExp;
