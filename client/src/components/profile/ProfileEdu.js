import React from "react";
import Moment from "react-moment";

const ProfileEdu = props => {
  const eduList = props.education.map(edu => (
    <ul key={edu._id} style={{ listStyleType: "none" }}>
      <li>
        <p>
          <strong>School: </strong>
          {edu.school}
        </p>
      </li>
      <li>
        <p>
          <strong>Degree: </strong>
          {edu.degree}
        </p>
      </li>
      <li>
        <p>
          <strong>Program: </strong>
          {edu.program}
        </p>
      </li>
      <li>
        <p>
          <strong>From: </strong>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment>
        </p>
      </li>
      <li>
        <p>
          <strong>To: </strong>
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        </p>
      </li>
      <li>
        <p>{edu.description}</p>
      </li>
    </ul>
  ));

  return (
    <div className="row mt-3">
      <div className="col-md-12">
        <h4>Education</h4>
        <div className="card">
          <div className="card-body">{eduList}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdu;
