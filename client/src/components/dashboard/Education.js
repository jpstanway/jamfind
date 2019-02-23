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
    let eduRows = (
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
          <tbody>
            {this.props.education.map(edu => (
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
            ))}
          </tbody>
        </table>
      </div>
    );

    if (this.props.education.length === 0) {
      eduRows = (
        <div className="col-md-12">
          <p className="text-muted">No education listed</p>
        </div>
      );
    }

    return <div className="row mt-5 mb-5">{eduRows}</div>;
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
