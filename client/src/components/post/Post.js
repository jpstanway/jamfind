import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getCurrentPost } from "../../actions/postActions";
import { getAllProfiles } from "../../actions/profileActions";
import Loading from "../tools/Loading";
import PostAuth from "./PostAuth";
import PostReply from "./PostReply";
import PostReplies from "./PostReplies";

class Post extends Component {
  componentDidMount() {
    this.props.getCurrentPost(this.props.match.params.postid);
    this.props.getAllProfiles();
  }

  render() {
    const { post, isLoading } = this.props.post;
    const { auth, profile } = this.props;
    let postContent;

    if (
      post === null ||
      profile.profiles === null ||
      isLoading ||
      Object.keys(post).length === 0
    ) {
      postContent = <Loading />;
    } else {
      // store all profile ids
      const profileIds = profile.profiles.map((profile) =>
        profile.userid._id.toString()
      );

      postContent = (
        <div className="post">
          <div className="row mb-3">
            <div className="col-md-12">
              <Link
                to="/posts/all"
                className="btn btn-custom-outline-secondary btn-sm"
              >
                Go back
              </Link>
            </div>
          </div>
          <PostAuth
            post={post}
            auth={auth}
            profile={profile}
            profileIds={profileIds}
          />
          <PostReply post={post} />
          <PostReplies
            post={post}
            auth={auth}
            profile={profile}
            profileIds={profileIds}
          />
        </div>
      );
    }

    return <div className="container">{postContent}</div>;
  }
}

Post.propTypes = {
  getCurrentPost: PropTypes.func.isRequired,
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
  { getCurrentPost, getAllProfiles }
)(Post);
