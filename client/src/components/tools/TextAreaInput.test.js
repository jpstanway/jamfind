import React from "react";
import { shallow } from "enzyme";
import TextAreaInput from "./TextAreaInput";

describe("<TextAreaInput />", () => {
  let mockOnChangeHandler, mockInputData;

  beforeEach(() => {
    mockOnChangeHandler = jest.fn();
    mockInputData = {
      label: "test",
      name: "test",
      placeholder: "type something",
      rows: "3",
      value: "",
      onChange: mockOnChangeHandler,
      disabled: "false",
      error: "test",
      info: "test",
    };
  });

  it("renders textarea input", () => {
    expect(shallow(<TextAreaInput {...mockInputData} />)).toMatchSnapshot();
  });

  it("can change value of textarea", () => {
    const wrapper = shallow(<TextAreaInput {...mockInputData} />);
    wrapper
      .find("textarea")
      .simulate("change", { target: { name: "test", value: "a" } });
    expect(mockOnChangeHandler.mock.calls.length).toBe(1);
  });
});
