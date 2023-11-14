import { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { Row, Col } from "react-bootstrap";
import "../assets/css/Countdown.css";

const CountdownTimer = ({ targetDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  function calculateTimeRemaining() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isPastTargetDate = targetDate < new Date().getTime();

  if (isPastTargetDate) {
    // If the target date is past, you can choose to render nothing or a message
    return null;
  }

  return (
    <>
      <Row>
        <Col>
          <h2>T-</h2>
        </Col>
        <Col>
          <h2>{timeRemaining.days}</h2>
          <p>Days</p>
        </Col>
        <Col><h2>:</h2></Col>
        <Col>
          <h2>{timeRemaining.hours}</h2>
          <p>Hours</p>
        </Col>
        <Col><h2>:</h2></Col>
        <Col>
          <h2>{timeRemaining.minutes}</h2>
          <p>Mins</p>
        </Col>
        <Col><h2>:</h2></Col>
        <Col>
          <h2>{timeRemaining.seconds}</h2>
          <p>Secs</p>
        </Col>
      </Row>
    </>
  );
};

CountdownTimer.propTypes = {
    targetDate: PropTypes.string,
}

export default CountdownTimer;
