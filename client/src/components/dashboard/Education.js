import React from "react";
import moment from "moment";

const Education = props => {
  const eduRows = props.education.map(edu => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.degree}</td>
      <td>{edu.program}</td>
      <td>
        {moment(edu.from).format("MM/DD/YYYY")} -{" "}
        {edu.current ? "present" : moment(edu.to).format("MM/DD/YYYY")}
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
        <h2 className="mb-3">Education</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">School</th>
              <th scope="col">Degree</th>
              <th scope="col">Program</th>
              <th scope="col">From-To</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>{eduRows}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Education;
