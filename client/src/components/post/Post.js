import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentPost } from "../../actions/postActions";
import Loading from "../tools/Loading";
import PostAuth from "./PostAuth";
import PostReply from "./PostReply";
import PostReplies from "./PostReplies";

class Post extends Component {
  componentDidMount() {
    if (this.props.match.params.postid) {
      this.props.getCurrentPost(this.props.match.params.postid);
    }
  }

  render() {
    const { post, isLoading } = this.props.post;
    let postContent;

    if (post === null || isLoading) {
      postContent = <Loading />;
    } else {
      postContent = (
        <div className="post">
          <PostAuth post={post} />
          <PostReply postid={post._id} />
          <PostReplies replies={post.comments} />
        </div>
      );
    }

    return <div className="container">{postContent}</div>;
  }
}

Post.propTypes = {
  getCurrentPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getCurrentPost }
)(Post);
