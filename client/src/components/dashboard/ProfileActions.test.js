import React from "react";
import { shallow } from "enzyme";
import ProfileActions from "./ProfileActions";

it("renders component", () => {
  expect(shallow(<ProfileActions />)).toMatchSnapshot();
});
