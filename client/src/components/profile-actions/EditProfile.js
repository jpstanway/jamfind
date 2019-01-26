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
import isEmpty from "../../validation/is-empty";

class EditProfile extends Component {
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
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    // pre-populate form if profile exists
    if (Object.keys(nextProps.profile.profile).length > 0) {
      const profile = nextProps.profile.profile;

      const instrumentsCSV = profile.instruments.join(",");

      // set fields to value or empty string
      profile.name = isEmpty(profile.name) ? "" : profile.name;
      profile.training = isEmpty(profile.training) ? "" : profile.training;
      profile.website = isEmpty(profile.website) ? "" : profile.website;
      profile.soundcloudusername = isEmpty(profile.soundcloudusername)
        ? ""
        : profile.soundcloudusername;
      profile.bio = isEmpty(profile.bio) ? "" : profile.bio;
      profile.youtube = isEmpty(profile.youtube) ? "" : profile.youtube;
      profile.facebook = isEmpty(profile.facebook) ? "" : profile.facebook;
      profile.instagram = isEmpty(profile.instagram) ? "" : profile.instagram;
      profile.twitter = isEmpty(profile.twitter) ? "" : profile.twitter;

      // set state with profile values
      this.setState({
        name: profile.name,
        instruments: instrumentsCSV,
        skill: profile.skill,
        training: profile.training,
        location: profile.location,
        website: profile.website,
        soundcloudusername: profile.soundcloudusername,
        bio: profile.bio,
        youtube: profile.youtube,
        facebook: profile.facebook,
        instagram: profile.instagram,
        twitter: profile.twitter
      });
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
    const { profile } = this.props;
    let conditionalFormText;

    if (Object.keys(profile.profile).length > 0) {
      conditionalFormText = "Edit";
    } else {
      conditionalFormText = "Create";
    }

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
          <div className="col-md-12">
            <Link to="/dashboard" className="btn btn-outline-dark">
              Go back
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>{conditionalFormText} Your Profile</h1>
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
                {conditionalFormText} Profile
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
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
)(withRouter(EditProfile));
