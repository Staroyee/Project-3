import { render } from "@testing-library/react";
import DonationButton from "../../components/Buttons/DonationButton";

// Initialise the test
describe("Button", () => {
  // Define the requirements of the test
  it("renders the button component", () => {
    // Render the component
    const { getByTestId } = render(<DonationButton amount={" 5.00"} />);
    // Assign the component to a variable
    const buttonValue = getByTestId("btn");
    // Check if the button component has rendered successfully
    expect(buttonValue).toBeInTheDocument();
  });
});
