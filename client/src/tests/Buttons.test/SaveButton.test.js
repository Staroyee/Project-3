import { render } from "@testing-library/react";
import SaveButton from "../../components/Buttons/SaveButton";

// Placeholder function for test
const myFunction = () => {
  console.log("1");
};

// Initialise the test
describe("Button", () => {
  // Define the requirements of the test
  it("renders the button component", () => {
    // Render the component
    const { getByTestId } = render(
      <SaveButton onClick={() => myFunction()} value="Click me" />
    );
    // Assign the component to a variable
    const buttonValue = getByTestId("btn");
    // Check if the button component has rendered successfully
    expect(buttonValue).toBeInTheDocument();
  });
});
