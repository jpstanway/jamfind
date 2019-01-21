import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import TextFieldInput from "../tools/TextFieldInput";
import TextAreaInput from "../tools/TextAreaInput";
import SelectFieldInput from "../tools/SelectFieldInput";
import TextIconInput from "../tools/TextIconInput";
import {
  getCurrentProfile,
  createNewProfile
} from "../../actions/profileActions";

class CreateProfile extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      instruments: "",
      skill: "",
      training: "",
      location: "",
      website: "",
      soundcloudusername: "",
      bio: "",
      youtube: "",
      facebook: "",
      instagram: "",
      twitter: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.profile) {
      this.props.getCurrentProfile(this.props.auth.user);
    }

    // TODO: kick user to edit-profile if profile already created
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newProfile = {
      name: this.state.name,
      instruments: this.state.instruments,
      skill: this.state.skill,
      training: this.state.training,
      location: this.state.location,
      website: this.state.website,
      soundcloudusername: this.state.soundcloudusername,
      bio: this.state.bio,
      youtube: this.state.youtube,
      facebook: this.state.facebook,
      instagram: this.state.instagram,
      twitter: this.state.twitter
    };

    this.props.createNewProfile(newProfile, this.props.history);
  }

  render() {
    const { errors } = this.state;

    const instrumentsInfo = (
      <span>
        <strong>Start with your primary instrument or skill</strong> and
        separate any additional skills using commas (ex. Vocals,Harmonica,Pro
        Tools)
      </span>
    );

    const skillOptions = [
      { label: "* -- Select your skill level --", value: 0 },
      { label: "Beginner", value: "Beginner" },
      { label: "Intermediate", value: "Intermediate" },
      { label: "Expert", value: "Expert" },
      { label: "Professional", value: "Professional" }
    ];

    const trainingOptions = [
      { label: "-- Select your training background --", value: 0 },
      { label: "Formal training", value: "Formal" },
      { label: "Self-taught", value: "Self-taught" },
      { label: "Post-secondary music education", value: "Post-secondary" },
      { label: "Other", value: "Other" }
    ];

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>Create Your Profile</h1>
            <p className="lead">Let's get some details</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 m-auto standard-form">
            <small>* indicates a required field</small>
            <form className="mt-1">
              <TextFieldInput
                type="text"
                name="name"
                placeholder="Your name"
                value={this.state.name}
                onChange={this.onChange}
                error={errors.name}
                info="Enter your full name for other users to see"
              />
              <TextFieldInput
                type="text"
                name="instruments"
                placeholder="* Instruments and skills"
                value={this.state.instruments}
                onChange={this.onChange}
                error={errors.instruments}
                info={instrumentsInfo}
              />
              <SelectFieldInput
                name="skill"
                options={skillOptions}
                value={this.state.skill}
                onChange={this.onChange}
                error={errors.skill}
                info="What would you say your skill level is at this point in your music career? This will help you find the right musicians!"
              />
              <SelectFieldInput
                name="training"
                options={trainingOptions}
                value={this.state.training}
                onChange={this.onChange}
                error={errors.training}
                info="Share with us how you learned to play"
              />
              <TextFieldInput
                type="text"
                name="location"
                placeholder="* Location"
                value={this.state.location}
                onChange={this.onChange}
                error={errors.location}
                info="Enter your Country, City & State/Province (ex. New York, NY, USA)"
              />
              <TextFieldInput
                type="text"
                name="website"
                placeholder="Website url"
                value={this.state.website}
                onChange={this.onChange}
                error={errors.website}
                info="If you have a website you can share it here"
              />
              <TextFieldInput
                type="text"
                name="soundcloudusername"
                placeholder="SoundCloud username"
                value={this.state.soundcloudusername}
                onChange={this.onChange}
                error={errors.soundcloudusername}
                info="Have a SoundCloud account? If you'd like to share your work, include your username"
              />
              <TextAreaInput
                name="bio"
                placeholder="Enter your bio"
                rows="3"
                value={this.state.bio}
                onChange={this.onChange}
                error={errors.bio}
                info="Tell us a bit about yourself"
              />
              <h5>Your Social Media Links</h5>
              <TextIconInput
                icon="fab fa-youtube"
                type="text"
                name="youtube"
                id="youtube"
                placeholder="YouTube"
                value={this.state.youtube}
                onChange={this.onChange}
                error={errors.youtube}
              />
              <TextIconInput
                icon="fab fa-facebook"
                type="text"
                name="facebook"
                id="facebook"
                placeholder="Facebook"
                value={this.state.facebook}
                onChange={this.onChange}
                error={errors.facebook}
              />
              <TextIconInput
                icon="fab fa-instagram"
                type="text"
                name="instagram"
                id="instagram"
                placeholder="Instagram"
                value={this.state.instagram}
                onChange={this.onChange}
                error={errors.instagram}
              />
              <TextIconInput
                icon="fab fa-twitter"
                type="text"
                name="twitter"
                id="twitter"
                placeholder="Twitter"
                value={this.state.twitter}
                onChange={this.onChange}
                error={errors.twitter}
              />
              <Link
                to="/dashboard"
                type="submit"
                className="btn btn-primary btn-lg"
                onClick={this.onSubmit}
              >
                Create Profile
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  createNewProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, createNewProfile }
)(withRouter(CreateProfile));
