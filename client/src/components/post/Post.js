import React, { Component } from "react";
import PostAuth from "./PostAuth";
import PostReply from "./PostReply";
import PostReplies from "./PostReplies";

class Post extends Component {
  render() {
    return (
      <div className="container">
        <PostAuth />
        <PostReply />
        <PostReplies />
      </div>
    );
  }
}

export default Post;
