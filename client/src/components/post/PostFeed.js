import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Loading from "../tools/Loading";
import { getAllPosts } from "../../actions/postActions";

class PostFeed extends Component {
  componentDidMount() {
    this.props.getAllPosts();
  }

  render() {
    const { post } = this.props;
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
                  <button className="btn btn-secondary btn-sm mr-1">
                    <i className="fas fa-thumbs-up mr-1" />
                  </button>
                  <button className="btn btn-secondary btn-sm mr-1">
                    <i className="fas fa-thumbs-down" />
                  </button>
                  <Link
                    to={`/posts/post/${post._id}`}
                    className="btn btn-primary btn-sm"
                  >
                    Comment
                  </Link>
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
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getAllPosts }
)(PostFeed);
