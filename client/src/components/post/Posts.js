import React, { Component } from "react";
import PostCreate from "./PostCreate";
import PostFeed from "./PostFeed";

class Posts extends Component {
  render() {
    return (
      <div className="container">
        <PostCreate />
        <PostFeed />
      </div>
    );
  }
}

export default Posts;
