import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Loading from "../tools/Loading";
import {
  getAllPosts,
  likePost,
  dislikePost,
  deletePost
} from "../../actions/postActions";
import classnames from "classnames";

class PostFeed extends Component {
  constructor() {
    super();
    this.state = {};
    this.findUserLike = this.findUserLike.bind(this);
  }
  componentDidMount() {
    this.props.getAllPosts();
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
      likes.filter(like => this.props.auth.user.id === like.userid).length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth } = this.props;
    let postFeed;

    if (post.posts === null || post.isLoading) {
      postFeed = <Loading />;
    } else {
      postFeed = post.posts.map(post => (
        <div key={post._id} className="card p-2">
          <div className="row">
            <div className="col-md-3 text-center">
              <img
                src={post.avatar}
                className="m-auto img-thumbnail"
                alt="..."
              />
              <h5>{post.username}</h5>
            </div>
            <div className="col-md-7">
              <div className="row">
                <div className="col-md-12">
                  <p>{post.text}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <button
                    onClick={this.onLikeClick.bind(this, post._id)}
                    className="btn btn-custom-secondary btn-sm mr-1"
                  >
                    <i
                      className={classnames("fas fa-thumbs-up mr-1", {
                        "text-info": this.findUserLike(post.likes)
                      })}
                    />
                  </button>
                  <button
                    onClick={this.onDislikeClick.bind(this, post._id)}
                    className="btn btn-custom-secondary btn-sm mr-1"
                  >
                    <i
                      className={classnames("fas fa-thumbs-down", {
                        "text-info": this.findUserLike(post.dislikes)
                      })}
                    />
                  </button>
                  <Link
                    to={`/posts/post/${post._id}`}
                    className="btn btn-custom-primary btn-sm mr-1"
                  >
                    Comment
                  </Link>
                  {post.userid === auth.user.id ? (
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
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  { getAllPosts, likePost, dislikePost, deletePost }
)(PostFeed);