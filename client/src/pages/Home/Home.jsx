import { Container, Row, Col } from "react-bootstrap";
import "../../assets/fonts/nasalization-rg.otf";
import "./Home.css";

// Define home page
function Home() {
  return (
    <>
      <Container className="H-Container">
        <Row>
          <Col md={12} lg={6} className="H-Column">
            <h1 className="H-Title">SKYWARD</h1>
            <h3 className="H-Info">
              Look to the sky and view the galaxy, track space launches, browse
              rocket information and more!
            </h3>
          </Col>
          <Col md={12} lg={6}></Col>
        </Row>
      </Container>
    </>
  );
}

// Export home page
export default Home;
