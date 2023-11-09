import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

function Launch() {
  const [launchData, setLaunchData] = useState([]);

  useEffect(() => {
    getLaunchData();
    console.log(launchData)
  }, []);

  const getLaunchData = () => {
    let launchUrl = "https://lldev.thespacedevs.com/2.2.0/launch/upcoming/";
    fetch(launchUrl)
      .then((res) => res.json())
      .then((response) => {
        console.log(response.results); // Log the API response
        setLaunchData(response);
      })
      .catch((error) => {
        console.error(error); // Log any API request errors
      });
  };

  return (
    <Container>
      <Row>
        <Col>{/* Content goes here */}</Col>
      </Row>
    </Container>
  );
}

export default Launch;
