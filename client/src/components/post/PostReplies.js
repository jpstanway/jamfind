import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { deleteReply } from "../../actions/postActions";

class PostReplies extends Component {
  onDeleteClick(replyid) {
    if (
      window.confirm("Are you sure? This reply will be deleted permanently.")
    ) {
      this.props.deleteReply(this.props.post._id, replyid);
    }
  }

  render() {
    const { auth, post, profileIds } = this.props;
    let replyFeed;

    if (post.replies.length === 0) {
      replyFeed = <h5 className="text-center text-muted">No replies yet</h5>;
    } else {
      replyFeed = post.replies.map(reply => (
        <div key={reply._id} className="row">
          <div className="col-md-10 m-auto">
            <div className="card p-2 mb-3">
              <div className="row">
                <div className="col-md-3 text-center">
                  <img
                    src={reply.avatar}
                    className="m-auto img-thumbnail"
                    alt={reply.username}
                  />
                  <p className="display-5">
                    {profileIds.indexOf(reply.userid.toString()) > -1 ? (
                      <Link to={`/profiles/user/${reply.username}`}>
                        {reply.username}
                      </Link>
                    ) : (
                      reply.username
                    )}
                  </p>
                </div>
                <div className="col-md-9">
                  <div className="row">
                    <div className="col-md-12">
                      <p>
                        <small className="float-right text-muted">
                          {reply.date < reply.edited_on ? (
                            <em>
                              Edited <Moment fromNow>{reply.edited_on}</Moment>
                            </em>
                          ) : (
                            <em>
                              Posted <Moment fromNow>{reply.date}</Moment>
                            </em>
                          )}
                        </small>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <p>{reply.text}</p>
                    </div>
                  </div>
                  <div className="row">
                    {reply.userid === auth.user.id ? (
                      <div className="col-md-12">
                        <Link
                          className="btn btn-custom-actions btn-sm mr-1"
                          to={`/posts/edit-reply/${post._id}/${reply._id}`}
                        >
                          Edit
                        </Link>
                        <button
                          onClick={this.onDeleteClick.bind(this, reply._id)}
                          type="button"
                          className="btn btn-custom-danger btn-sm"
                        >
                          <i className="fas fa-times" />
                        </button>
                      </div>
                    ) : null}
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
  deleteReply: PropTypes.func
};

export default connect(
  null,
  { deleteReply }
)(PostReplies);
