import { render } from "@testing-library/react";
import DateParser from "../components/DateParser/DateParser";

describe("Countdown", () => {
  it("renders the countdown component", () => {
    const { getByTestId } = render(
      <DateParser targetDate={"2026-01-09T06:51:00Z"} />
    );
    const dateParserComponent = getByTestId("dateParser");
    expect(dateParserComponent).toBeInTheDocument();
  });
});
