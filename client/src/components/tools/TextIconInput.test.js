import React from "react";
import { shallow } from "enzyme";
import TextIconInput from "./TextIconInput";

describe("<TextIconInput />", () => {
  let mockOnChangeHandler, mockInputData;

  beforeEach(() => {
    mockOnChangeHandler = jest.fn();
    mockInputData = {
      label: "test",
      icon: "",
      type: "text",
      name: "test",
      placeholder: "type something",
      value: "",
      onChange: mockOnChangeHandler,
      disabled: "false",
      error: "test",
      info: "test",
    };
  });

  it("renders icon input", () => {
    expect(shallow(<TextIconInput {...mockInputData} />)).toMatchSnapshot();
  });

  it("can change value of input", () => {
    const wrapper = shallow(<TextIconInput {...mockInputData} />);
    wrapper
      .find("input")
      .simulate("change", { target: { name: "test", value: "a" } });
    expect(mockOnChangeHandler.mock.calls.length).toBe(1);
  });
});
