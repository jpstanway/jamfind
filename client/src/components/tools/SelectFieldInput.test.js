import React from "react";
import { shallow } from "enzyme";
import SelectFieldInput from "./SelectFieldInput";

describe("<SelectFieldInput />", () => {
  let mockOnChangeHandler, mockOptions, mockInputData;

  beforeEach(() => {
    mockOnChangeHandler = jest.fn();
    mockOptions = [
      { label: "option 1", value: "1" },
      { label: "option 2", value: "2" },
      { label: "option 3", value: "3" },
    ];
    mockInputData = {
      label: "test",
      name: "test",
      options: mockOptions,
      value: "",
      onChange: mockOnChangeHandler,
      error: "test",
      info: "test",
    };
  });

  it("renders select input", () => {
    expect(shallow(<SelectFieldInput {...mockInputData} />)).toMatchSnapshot();
  });

  it("can change value of input", () => {
    const wrapper = shallow(<SelectFieldInput {...mockInputData} />);
    wrapper
      .find("select")
      .simulate("change", { target: { name: "test", value: "2" } });
    expect(mockOnChangeHandler.mock.calls.length).toBe(1);
  });
});
