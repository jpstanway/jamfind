import React from "react";
import { shallow } from "enzyme";
import PostAuth from "./PostAuth";

it("renders post author component", () => {
  const mockPost = {
    _id: 100,
    userid: 1,
    avatar: "",
    username: "Bob",
    title: "test",
    test: "this is a test",
    date: 2020,
    edited_on: 2020,
  };
  const mockProfileIds = [];
  const mockAuth = {
    user: { id: 1 },
  };

  expect(
    shallow(
      <PostAuth post={mockPost} auth={mockAuth} profileIds={mockProfileIds} />
    )
  ).toMatchSnapshot();
});
