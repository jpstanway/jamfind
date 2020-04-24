import React from "react";
import { shallow } from "enzyme";
import Landing from "./Landing";

it("renders landing page", () => {
  expect(shallow(<Landing />)).toMatchSnapshot();
});
