import React from "react";
import { shallow } from "enzyme";
import ProfileEdu from "./ProfileEdu";

it("renders component", () => {
  const mockEducation = [
    {
      _id: 1,
      school: "Harvard",
      degree: "Music",
      program: "Music",
      from: "2014",
      to: "2018",
      description: "Passed with 4.0 gpa",
    },
  ];
  expect(shallow(<ProfileEdu education={mockEducation} />)).toMatchSnapshot();
});
