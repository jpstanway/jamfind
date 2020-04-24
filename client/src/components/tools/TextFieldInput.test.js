import React from "react";
import { shallow } from "enzyme";
import TextFieldInput from "./TextFieldInput";

describe("<TextFieldInput />", () => {
  let mockOnChangeHandler, mockInputData;

  beforeEach(() => {
    mockOnChangeHandler = jest.fn();
    mockInputData = {
      label: "test",
      type: "text",
      name: "test",
      placeholder: "type something",
      value: "",
      onChange: mockOnChangeHandler,
      disabled: false,
      error: "test",
      info: "test",
    };
  });

  it("renders text input", () => {
    expect(shallow(<TextFieldInput {...mockInputData} />)).toMatchSnapshot();
  });

  it("can change value of text input", () => {
    const wrapper = shallow(<TextFieldInput {...mockInputData} />);
    wrapper
      .find("input")
      .simulate("change", { target: { name: "test", value: "a" } });
    expect(mockOnChangeHandler.mock.calls.length).toBe(1);
  });
});
