import React from "react";
import { shallow } from "enzyme";
import ConversationFeed from "./ConversationFeed";

it("renders inbox conversation feed", () => {
  const mockInbox = {
    conversations: {
      conversations: [
        {
          _id: 1,
          date: 2020,
          messages: [
            {
              username: "Bob",
              message: "hello",
            },
          ],
        },
      ],
    },
    isLoading: false,
  };
  expect(shallow(<ConversationFeed inbox={mockInbox} />)).toMatchSnapshot();
});
