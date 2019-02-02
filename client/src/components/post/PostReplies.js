import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteReply } from "../../actions/postActions";

class PostReplies extends Component {
  onDeleteClick(commentid) {
    if (
      window.confirm("Are you sure? This comment will be deleted permanently.")
    ) {
      this.props.deleteReply(this.props.postid, commentid);
    }
  }

  render() {
    const { replies, auth } = this.props;
    let replyFeed;

    if (replies.length === 0) {
      replyFeed = <h5 className="text-center text-muted">No replies yet</h5>;
    } else {
      replyFeed = replies.map(reply => (
        <div className="row">
          <div className="col-md-10 m-auto">
            <div className="card p-2 mb-3">
              <div className="row">
                <div className="col-md-3 text-center">
                  <img
                    src={reply.avatar}
                    className="m-auto img-thumbnail"
                    alt={reply.username}
                  />
                  <h5>{reply.username}</h5>
                </div>
                <div className="col-md-7">
                  <div className="row">
                    <div className="col-md-12">
                      <p>{reply.text}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      {reply.userid === auth.user.id ? (
                        <button
                          onClick={this.onDeleteClick.bind(this, reply._id)}
                          type="button"
                          className="btn btn-custom-danger btn-sm"
                        >
                          <i className="fas fa-times" />
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ));
    }

    return <div className="replies">{replyFeed}</div>;
  }
}

PostReplies.propTypes = {
  deleteComment: PropTypes.func,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteReply }
)(PostReplies);
