import React from "react";
import { shallow } from "enzyme";
import Alert from "./Alert";

it("renders alert component", () => {
  expect(shallow(<Alert />)).toMatchSnapshot();
});
