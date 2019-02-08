import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

class PostAuth extends Component {
  render() {
    const { post, auth, profileIds } = this.props;

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
                <p className="display-5">
                  {profileIds.indexOf(post.userid.toString()) > -1 ? (
                    <Link to={`/profiles/user/${post.username}`}>
                      {post.username}
                    </Link>
                  ) : (
                    post.username
                  )}
                </p>
              </div>
              <div className="col-md-9">
                <div className="row">
                  <div className="col-md-12">
                    <p>
                      <small className="float-right text-muted">
                        {post.date < post.edited_on ? (
                          <em>
                            Edited <Moment fromNow>{post.edited_on}</Moment>
                          </em>
                        ) : (
                          <em>
                            Posted <Moment fromNow>{post.date}</Moment>
                          </em>
                        )}
                      </small>
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <h5>{post.title}</h5>
                    <p>{post.text}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    {post.userid === auth.user.id ? (
                      <Link
                        className="btn btn-custom-actions btn-sm"
                        to={`/posts/edit-post/${post._id}`}
                      >
                        Edit
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostAuth;
