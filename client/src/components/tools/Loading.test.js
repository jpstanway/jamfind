import React from "react";
import { shallow } from "enzyme";
import Loading from "./Loading";

it("renders loading component", () => {
  expect(shallow(<Loading />)).toMatchSnapshot();
});
