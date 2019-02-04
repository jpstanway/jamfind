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
    this.setState({
      title: "",
      text: ""
    });
  }

  render() {
    return (
      <div className="row mb-3">
        <div className="col-md-10 m-auto">
          <div className="card">
            <div className="card-header">Create A Post</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <TextFieldInput
                  type="text"
                  name="title"
                  placeholder="Enter a title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={this.state.errors.title}
                />
                <TextAreaInput
                  name="text"
                  placeholder="Your message..."
                  rows="3"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={this.state.errors.text}
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
        </div>
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
