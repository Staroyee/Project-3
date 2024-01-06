import { render } from "@testing-library/react";
import Button from "../components/Buttons/Button";

// Initialise the test
describe("Button", () => {
  // Define the requirements of the test
  it("renders the button component", () => {
    // Render the component
    const { getByTestId } = render(<Button value="Click me" />);
    // Assign the component to a variable
    const buttonValue = getByTestId("btn");
    // Check if the button component has rendered successfully
    expect(buttonValue).toBeInTheDocument();
  });

  // Define the requirements of the test
  it("renders with a string value", () => {
    // Render the component and pass the prop
    const { getByTestId } = render(<Button value="Text" />);

    // Assign a variable as the textContent of the Button component
    const buttonValue = getByTestId("btn").textContent;

    // Check if the buttonValue textContent is equal to the provided string value
    expect(buttonValue).toEqual("Text");
  });
});
