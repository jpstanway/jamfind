import React, { Component } from "react";

class PostReplies extends Component {
  render() {
    const { replies } = this.props;
    let replyFeed;

    if (replies.length === 0) {
      replyFeed = <h5 className="text-center text-muted">No replies yet</h5>;
    } else {
      replyFeed = replies.map(reply => (
        <div className="row">
          <div className="col-md-10 m-auto">
            <div className="card p-2">
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
                  <p>{reply.text}</p>
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

export default PostReplies;
