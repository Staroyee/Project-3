import { render } from "@testing-library/react";
import Button from "../components/Buttons/Button";
import InfoIcon from "@mui/icons-material/Info";

describe(Button, () => {
  it("renders with a string value", () => {
    const { getByTestId } = render(<Button value="Text" />);
    const buttonValue = getByTestId("btn").textContent;
    expect(buttonValue).toEqual("Text");
  });

  it("renders a button with an object value (InfoIcon)", () => {
    const { getByTestId } = render(<Button value={<InfoIcon />} />);
    const infoIcon = getByTestId("btn").querySelector("svg"); // Adjust this selector based on the structure of your InfoIcon
    expect(infoIcon).toBeInTheDocument();
  });
});
