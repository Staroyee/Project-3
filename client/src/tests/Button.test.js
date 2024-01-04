import { fireEvent, render } from "@testing-library/react";
import Button from "../components/Buttons/Button";

describe("Button", () => {
  it("renders with a string value", () => {
    const { getByTestId } = render(<Button value="Text" />);
    const buttonValue = getByTestId("btn").textContent;
    expect(buttonValue).toEqual("Text");
  });

  it("applies hover effect", () => {
    const { getByTestId } = render(<Button value="Click me" />);
    const button = getByTestId("btn");

    fireEvent.mouseEnter(button);
    expect(button).toHaveStyle("transform: scale(1.1)");

    fireEvent.mouseLeave(button);
    expect(button).toHaveStyle("transform: scale(1)");
  });
});