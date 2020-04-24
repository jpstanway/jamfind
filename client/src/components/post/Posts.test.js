import React from "react";
import { shallow } from "enzyme";
import Posts from "./Posts";

it("renders posts container", () => {
  expect(shallow(<Posts />)).toMatchSnapshot();
});
