import React from "react";
import { shallow } from "enzyme";
import NotFound from "./NotFound";

it("renders 404 error component", () => {
  expect(shallow(<NotFound />)).toMatchSnapshot();
});
