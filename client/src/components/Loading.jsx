// Import styling
import { Container, Row, Col } from "react-bootstrap";
import { Triangle } from "react-loader-spinner";

// Define Loading Component
function Loading() {
  return (
    <>
      <Container>
        <Row>
          <Col className="L-LoadingContainer">
            <Triangle color="#00BFFF" height={80} width={80} />
            <p>Loading...</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

// Export component
export default Loading;
