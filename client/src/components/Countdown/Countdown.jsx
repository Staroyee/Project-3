import { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
// Import Styling
import { Row, Col } from "react-bootstrap";
import "./Countdown.css";

// Define CountdownTimer component
const CountdownTimer = ({ targetDate }) => {
  // Use state to set the time remaining on a launch, pass the calculateTimeRemaining function.
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  // Calculate the time remaining from the current time and the time of launch
  function calculateTimeRemaining() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    // Return data in this format
    return { days, hours, minutes, seconds };
  }

  // Use Effect to set the interval for the setTimeRemaining function so that it runs every second creating a countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Assign time to is past target date
  const isPastTargetDate = targetDate < new Date().getTime();

  // If the target date is past, render nothing
  if (isPastTargetDate) {
    return null;
  }

  // Else return component data
  return (
    <>
      <Row>
        <Col>
          <h2 className="C-H2">T-</h2>
        </Col>
        <Col>
          <h2 className="C-H2">{timeRemaining.days}</h2>
          <p className="C-P">Days</p>
        </Col>
        <Col>
          <h2 className="C-H2">:</h2>
        </Col>
        <Col>
          <h2 className="C-H2">{timeRemaining.hours}</h2>
          <p className="C-P">Hours</p>
        </Col>
        <Col>
          <h2 className="C-H2">:</h2>
        </Col>
        <Col>
          <h2 className="C-H2">{timeRemaining.minutes}</h2>
          <p className="C-P">Mins</p>
        </Col>
        <Col>
          <h2 className="C-H2">:</h2>
        </Col>
        <Col>
          <h2 className="C-H2">{timeRemaining.seconds}</h2>
          <p className="C-P">Secs</p>
        </Col>
      </Row>
    </>
  );
};

// Define props
CountdownTimer.propTypes = {
  targetDate: PropTypes.number,
};

// Export component
export default CountdownTimer;
