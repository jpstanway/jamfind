import React from "react";
import { shallow } from "enzyme";
import ProfileExp from "./ProfileExp";

it("renders component", () => {
  const mockExperience = [
    {
      _id: 1,
      typeofexperience: "band",
      role: "drummer",
      projectname: "Slayer tribute",
      location: "Canada",
      from: 2002,
      to: 2003,
      description: "best slayer tribute band ever",
    },
  ];
  expect(shallow(<ProfileExp experience={mockExperience} />)).toMatchSnapshot();
});
