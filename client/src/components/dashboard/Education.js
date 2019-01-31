import React, { Component } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteEducation } from "../../actions/profileActions";

class Education extends Component {
  onDeleteClick(id) {
    this.props.deleteEducation(id);
  }

  render() {
    const eduRows = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>{edu.program}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
          {edu.current ? (
            "present"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, edu._id)}
            type="button"
            className="btn btn-custom-danger"
          >
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
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
