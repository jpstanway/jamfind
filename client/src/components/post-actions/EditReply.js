import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import TextAreaInput from "../tools/TextAreaInput";
import Loading from "../tools/Loading";
import { getCurrentPost, editReply } from "../../actions/postActions";

class EditReply extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentPost(this.props.match.params.postid);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    // prepopulate textarea with current reply text
    if (nextProps.post.post !== null && this.state.text === "") {
      const reply = nextProps.post.post.replies.filter(
        reply => reply._id === this.props.match.params.replyid
      );
      this.setState({ text: reply[0].text });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { post, history } = this.props;

    const newReply = {
      text: this.state.text
    };

    this.props.editReply(
      newReply,
      post.post._id,
      this.props.match.params.replyid,
      history
    );
  }

  render() {
    const { post, isLoading } = this.props.post;
    let editReplyContent;

    if (post === null || isLoading) {
      editReplyContent = <Loading />;
    } else {
      editReplyContent = (
        <div className="edit-reply">
          <div className="row">
            <div className="col-md-12">
              <Link
                to={`/posts/post/${post._id}`}
                className="btn btn-custom-outline-secondary btn-sm mb-3"
              >
                Go back
              </Link>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-10 m-auto">
              <div className="card">
                <div className="card-header">Edit Your Post</div>
                <div className="card-body">
                  <form onSubmit={this.onSubmit}>
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
                      Submit Changes
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <div className="container">{editReplyContent}</div>;
  }
}

EditReply.propTypes = {
  editReply: PropTypes.func.isRequired,
  getCurrentPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCurrentPost, editReply }
)(withRouter(EditReply));
