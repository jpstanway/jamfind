import React from "react";
import moment from "moment";

const Experience = props => {
  const expRows = props.experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.typeofexperience}</td>
      <td>{exp.projectname}</td>
      <td>{exp.role}</td>
      <td>{exp.location}</td>
      <td>
        {moment(exp.from).format("MM/DD/YYYY")} -{" "}
        {exp.current ? "present" : moment(exp.to).format("MM/DD/YYYY")}
      </td>
      <td>
        <button type="button" className="btn btn-danger">
          <i className="fas fa-times" />
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="row mt-5 mb-5">
      <div className="col-md-12">
        <h2 className="mb-3">Experience</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Type</th>
              <th scope="col">Project Name</th>
              <th scope="col">Role</th>
              <th scope="col">Location</th>
              <th scope="col">From-To</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>{expRows}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Experience;
