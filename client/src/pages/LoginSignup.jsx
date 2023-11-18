import { Container, Row, Col, Card } from "react-bootstrap";
import "../assets/css/LoginSignup.css";

import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

const LoginSignup = () => {
  return (
    <>
      <Container>
        <Card className="LS-Card">
          <Row>
            <Col sm={12} md={6} className="formContainer">
              <SignupForm />
            </Col>
            <Col sm={12} md={6} className="formContainer">
              <LoginForm />
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
};

export default LoginSignup;
