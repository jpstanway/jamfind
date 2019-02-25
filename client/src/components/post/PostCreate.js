import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createNewPost } from "../../actions/postActions";
import TextFieldInput from "../tools/TextFieldInput";
import TextAreaInput from "../tools/TextAreaInput";

class PostCreate extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      text: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
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

  onSubmit(e) {
    e.preventDefault();

    const newPost = {
      title: this.state.title,
      text: this.state.text
    };

    this.props.createNewPost(newPost);
  }

  render() {
    const { title, text, errors } = this.state;
    const { isAuthenticated } = this.props.auth;
    let authActions;

    if (isAuthenticated) {
      authActions = (
        <div className="card">
          <div className="card-header">Create A Post</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <TextFieldInput
                type="text"
                name="title"
                placeholder="Enter a title"
                value={title}
                onChange={this.onChange}
                error={errors.title}
              />
              <TextAreaInput
                name="text"
                placeholder="Your message..."
                rows="3"
                value={text}
                onChange={this.onChange}
                error={errors.text}
              />
              <button
                type="submit"
                className="btn btn-custom-primary float-right"
              >
                Create Post
              </button>
            </form>
          </div>
        </div>
      );
    } else {
      authActions = (
        <p className="text-muted text-center">You must be logged in to post</p>
      );
    }

    return (
      <div className="row mb-3">
        <div className="col-md-10 m-auto">{authActions}</div>
      </div>
    );
  }
}

PostCreate.propTypes = {
  createNewPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createNewPost }
)(PostCreate);
