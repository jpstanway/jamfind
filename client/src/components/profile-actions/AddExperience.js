import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import TextFieldInput from "../tools/TextFieldInput";
import TextAreaInput from "../tools/TextAreaInput";
import { addExperience } from "../../actions/profileActions";

class AddExperience extends Component {
  constructor() {
    super();
    this.state = {
      typeofexperience: "",
      role: "",
      projectname: "",
      location: "",
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

    // create new experience object
    const newExp = {
      typeofexperience: this.state.typeofexperience,
      role: this.state.role,
      projectname: this.state.projectname,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addExperience(newExp, this.props.history);
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
            <h1>Add Experience</h1>
            <p className="lead">
              Add any band or project experience that you want to share
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 m-auto standard-form">
            <small>* indicates a required field</small>
            <form className="mt-1" onSubmit={this.onSubmit}>
              <TextFieldInput
                type="text"
                name="typeofexperience"
                placeholder="* Type of experience"
                value={this.state.typeofexperience}
                onChange={this.onChange}
                error={errors.typeofexperience}
                info="What type of experience is this? (ex. band, recording session, music you've created, etc)"
              />
              <TextFieldInput
                type="text"
                name="role"
                placeholder="* Role"
                value={this.state.role}
                onChange={this.onChange}
                error={errors.role}
                info="What was your role in the band or project?"
              />
              <TextFieldInput
                type="text"
                name="projectname"
                placeholder="Band name/project title"
                value={this.state.projectname}
                onChange={this.onChange}
                error={errors.projectname}
                info="Share the name of the band or project you worked on"
              />
              <TextFieldInput
                type="text"
                name="location"
                placeholder="Location"
                value={this.state.location}
                onChange={this.onChange}
                error={errors.location}
                info="Where did you get this experience?"
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
                <label className="form-check-label" htmlFor="current">
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
                info="Tell us about the band/project"
              />
              <button type="submit" className="btn btn-custom-primary btn-lg">
                Add Experience
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(AddExperience));
