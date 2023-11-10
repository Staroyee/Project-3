import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function Launch() {
  const [launchData, setLaunchData] = useState([]);

  useEffect(() => {
    getLaunchData();
    console.log(launchData);
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
        <Col>
        
          <Card>
            <Card.Img></Card.Img>
            <Card.Body>
              <Card.Title></Card.Title>
              <Card.Text></Card.Text>
              <Card.Text></Card.Text>
              <Card.Text></Card.Text>
              <Row>
                <Button></Button>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Launch;
