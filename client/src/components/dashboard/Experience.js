import React from "react";

const Experience = () => {
  return (
    <div className="row mt-5 mb-5">
      <div className="col-md-12">
        <h2 className="mb-3">Experience</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Type</th>
              <th scope="col">Role</th>
              <th scope="col">Location</th>
              <th scope="col">From-To</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Band</td>
              <td>Bass player</td>
              <td>Vancouver</td>
              <td>02-03-2008-04-04-2012</td>
              <td>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Experience;
