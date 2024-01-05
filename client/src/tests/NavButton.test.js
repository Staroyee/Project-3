import { render } from "@testing-library/react";
import NavButton from "../components/Buttons/NavButton";

// Initialise the test
describe("NavButton", () => {
    // Define the requirements of the test
  it("takes in a style prop and renders the applied style", () => {
    // Assign a background to the styleProp variable
    const styleProp = { background: "rgb(255, 215, 0)" };

    // Render the component and pass the prop
    const { getByTestId } = render(<NavButton style={styleProp} />);

    // Get the button element by data-testid
    const navButton = getByTestId("btn");

    // Get the computed styles of the button
    const computedStyles = window.getComputedStyle(navButton);

    // Check if the background color matches the style prop
    expect(computedStyles.backgroundColor).toBe(styleProp.background);
  });
});
