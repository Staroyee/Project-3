import { Container, Row, Col } from "react-bootstrap";
import "../../assets/fonts/nasalization-rg.otf";
import "./Home.css";

// Define home page
function Home() {
  return (
    <>
      <Container className="H-Container">
        <Row>
          <Col md={12} className="H-Column">
          <svg height="100" stroke="#072448" strokeWidth="1.5" className="text-line" width="100%"><text x="50%" dominantBaseline="middle" textAnchor="middle" y="50%">SKYWARD</text><h1 className="H-Title">SKYWARD</h1></svg>
            
            <h3 className="H-Info">
              Look to the sky and view the galaxy, track space launches, browse
              rocket information and more!
            </h3>
          </Col>
          <Col md={12}></Col>
        </Row>
      </Container>
    </>
  );
}

// Export home page
export default Home;
