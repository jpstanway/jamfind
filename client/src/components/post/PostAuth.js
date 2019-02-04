import React, { Component } from "react";

class PostAuth extends Component {
  render() {
    const { post } = this.props;

    return (
      <div className="row">
        <div className="col-md-10 m-auto">
          <div className="card p-2">
            <div className="row">
              <div className="col-md-3 text-center">
                <img
                  src={post.avatar}
                  className="m-auto img-thumbnail"
                  alt={post.username}
                />
                <h5>{post.username}</h5>
              </div>
              <div className="col-md-7">
                <h5>{post.title}</h5>
                <p>{post.text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostAuth;
