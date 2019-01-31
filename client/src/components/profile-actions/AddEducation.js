import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import TextFieldInput from "../tools/TextFieldInput";
import TextAreaInput from "../tools/TextAreaInput";
import { addEducation } from "../../actions/profileActions";

class AddEducation extends Component {
  constructor() {
    super();
    this.state = {
      school: "",
      degree: "",
      program: "",
      from: "",
      to: "",
      current: false,
      description: "",
      disabled: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck() {
    this.setState({
      current: !this.state.current,
      disabled: !this.state.disabled
    });
  }

  onSubmit(e) {
    e.preventDefault();

    // create new education object
    const newEdu = {
      school: this.state.school,
      degree: this.state.degree,
      program: this.state.program,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addEducation(newEdu, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link to="/dashboard" className="btn btn-custom-outline-secondary">
              Go back
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>Add Education</h1>
            <p className="lead">Add your post-secondary education</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 m-auto standard-form">
            <small>* indicates a required field</small>
            <form className="mt-1" onSubmit={this.onSubmit}>
              <TextFieldInput
                type="text"
                name="school"
                placeholder="* School name"
                value={this.state.school}
                onChange={this.onChange}
                error={errors.school}
                info="What is the name of the school or institution?"
              />
              <TextFieldInput
                type="text"
                name="degree"
                placeholder="* Degree"
                value={this.state.degree}
                onChange={this.onChange}
                error={errors.degree}
                info="What type of degree is it?"
              />
              <TextFieldInput
                type="text"
                name="program"
                placeholder="* Program"
                value={this.state.program}
                onChange={this.onChange}
                error={errors.program}
                info="What is the name of the program or field of study?"
              />
              <TextFieldInput
                label="* From date"
                type="date"
                name="from"
                value={this.state.from}
                onChange={this.onChange}
                error={errors.from}
              />
              <TextFieldInput
                label="To date"
                type="date"
                name="to"
                value={this.state.to}
                onChange={this.onChange}
                disabled={this.state.disabled}
                error={errors.to}
              />
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="current"
                  checked={this.state.current}
                  onChange={this.onCheck}
                />
                <label className="form-check-label" for="current">
                  Current
                </label>
              </div>
              <TextAreaInput
                name="description"
                placeholder="Enter description"
                rows="3"
                value={this.state.description}
                onChange={this.onChange}
                error={errors.description}
                info="Tell us about your education"
              />
              <button type="submit" className="btn btn-custom-primary btn-lg">
                Add Education
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
