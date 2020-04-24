import React from "react";
import { shallow } from "enzyme";
import ProfileSoundCloud from "./ProfileSoundCloud";

it("renders soundcloud component of profile", () => {
  const mockProfile = {
    userid: { username: "Bob" },
    soundcloudusername: "Bob",
  };

  expect(
    shallow(<ProfileSoundCloud profile={mockProfile} />)
  ).toMatchSnapshot();
});
