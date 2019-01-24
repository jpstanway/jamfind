import React, { Component } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteExperience } from "../../actions/profileActions";

class Experience extends Component {
  onDeleteClick(id) {
    this.props.deleteExperience(id);
  }

  render() {
    const expRows = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.typeofexperience}</td>
        <td>{exp.projectname}</td>
        <td>{exp.role}</td>
        <td>{exp.location}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
          {exp.current ? (
            "present"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, exp._id)}
            type="button"
            className="btn btn-danger"
          >
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
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(Experience);
