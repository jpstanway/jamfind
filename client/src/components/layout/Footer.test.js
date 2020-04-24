import React from "react";
import { shallow } from "enzyme";
import Footer from "./Footer";

it("renders footer component", () => {
  expect(shallow(<Footer />)).toMatchSnapshot();
});
