import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Loading from "../tools/Loading";
import {
  getAllPosts,
  likePost,
  dislikePost,
  deletePost,
} from "../../actions/postActions";
import { getAllProfiles } from "../../actions/profileActions";
import classnames from "classnames";

class PostFeed extends Component {
  constructor() {
    super();
    this.state = {};
    this.findUserLike = this.findUserLike.bind(this);
  }
  componentDidMount() {
    this.props.getAllPosts();
    this.props.getAllProfiles();
  }

  onDeleteClick(id) {
    if (
      window.confirm("Are you sure? This post will be deleted permanently.")
    ) {
      this.props.deletePost(id);
    }
  }

  onLikeClick(id) {
    this.props.likePost(id);
  }

  onDislikeClick(id) {
    this.props.dislikePost(id);
  }

  findUserLike(likes) {
    if (
      likes.filter((like) => this.props.auth.user.id === like.userid).length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth, profile } = this.props;
    let postFeed;

    if (post.posts === null || profile.profiles === null || post.isLoading) {
      postFeed = <Loading />;
    } else {
      // collect all user ids from profiles
      const profileIds = profile.profiles.map((profile) =>
        profile.userid._id.toString()
      );

      postFeed = post.posts.map((post) => (
        <div key={post._id} className="card p-2 mb-3">
          <div className="row pl-3">
            <div className="col-xs-3 text-center">
              <img
                src={post.avatar}
                className="img-thumbnail img-fluid profile-avatar"
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
            <div className="col-md-7">
              <div className="row">
                <div className="col-md-12">
                  <h6>{post.title}</h6>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  {auth.isAuthenticated ? (
                    <span className="d-inline-flex flex-column text-center">
                      <button
                        onClick={this.onLikeClick.bind(this, post._id)}
                        className="btn btn-custom-secondary btn-sm mr-1"
                      >
                        <i
                          className={classnames("fas fa-thumbs-up mr-1", {
                            "text-custom-actions": this.findUserLike(
                              post.likes
                            ),
                          })}
                        />
                      </button>
                      <small>{post.likes.length}</small>
                    </span>
                  ) : null}
                  {auth.isAuthenticated ? (
                    <span className="d-inline-flex flex-column text-center">
                      <button
                        onClick={this.onDislikeClick.bind(this, post._id)}
                        className="btn btn-custom-secondary btn-sm mr-1"
                      >
                        <i
                          className={classnames("fas fa-thumbs-down", {
                            "text-custom-actions": this.findUserLike(
                              post.dislikes
                            ),
                          })}
                        />
                      </button>
                      <small>{post.dislikes.length}</small>
                    </span>
                  ) : null}

                  <Link
                    to={`/posts/post/${post._id}`}
                    className="btn btn-custom-primary btn-sm mr-1"
                  >
                    View
                  </Link>
                  {post.userid === auth.user.id || auth.user.admin ? (
                    <button
                      onClick={this.onDeleteClick.bind(this, post._id)}
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
      ));

      if (postFeed.length === 0) {
        postFeed = (
          <h3 className="text-muted text-center">There are no current posts</h3>
        );
      }
    }

    return (
      <div className="row">
        <div className="col-md-10 m-auto">{postFeed}</div>
      </div>
    );
  }
}

PostFeed.propTypes = {
  deletePost: PropTypes.func.isRequired,
  getAllPosts: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  dislikePost: PropTypes.func.isRequired,
  getAllProfiles: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
  profile: state.profile,
});

export default connect(
  mapStateToProps,
  { getAllPosts, likePost, dislikePost, deletePost, getAllProfiles }
)(PostFeed);
