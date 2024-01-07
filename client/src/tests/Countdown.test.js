import { render } from "@testing-library/react";
import CountdownTimer from "../components/Countdown/Countdown";

describe("Countdown", () => {
  it("renders the countdown component", () => {
    const { getByTestId } = render(
      <CountdownTimer targetDate={new Date().getTime() + 10000} />
    );
    const countdownComponent = getByTestId("countdown");
    expect(countdownComponent).toBeInTheDocument();
  });
});
