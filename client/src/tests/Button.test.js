import { fireEvent, render } from "@testing-library/react";
import Button from "../components/Buttons/Button";

// Initialise the test
describe("Button", () => {
  // Define the requirements of the test
  it("renders with a string value", () => {
    // Render the component and pass the prop
    const { getByTestId } = render(<Button value="Text" />);

    // Assign a variable as the textContent of the Button component
    const buttonValue = getByTestId("btn").textContent;

    // Check if the buttonValue textContent is equal to the provided string value
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
