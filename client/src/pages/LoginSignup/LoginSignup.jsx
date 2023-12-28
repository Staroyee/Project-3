import { Container, Row, Col, Card } from "react-bootstrap";
import "./LoginSignup.css";

// Import components
import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import SignupForm from "../../components/SignupForm/SignupForm.jsx";

// Define LoginSignup page
const LoginSignup = () => {
  return (
    <>
      <Container>
        <Card className="LS-Card">
          <Row>
            <Col sm={12} md={6} className="formContainer">
              {/* Signup component */}
              <SignupForm />
            </Col>
            <Col sm={12} md={6} className="formContainer">
              {/* Login component */}
              <LoginForm />
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
};

// Export page
export default LoginSignup;
