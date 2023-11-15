import { Container, Row, Col } from "react-bootstrap";
import "../assets/css/Home.css";

function Home() {
  return (
    <>
      <Container className="homeContainer">
        <Row>
          <Col xs={6} className="homeColumn">
            <h1 className="title">SKYWARD</h1>
            <h3 className="info">Look to the sky and view the galaxy, track space launches, browse rocket information and more!</h3>
          </Col>
          <Col xs={6}></Col>
        </Row>
      </Container>
    </>
  )
}

export default Home;

