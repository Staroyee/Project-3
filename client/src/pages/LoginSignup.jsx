import { Container, Row, Col } from "react-bootstrap";
import "../assets/css/LoginSignup.css";

import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm'

const LoginSignup = () => {

  return (
    <>
    <Container>
      <Row>
        <Col className="formContainer">
        <SignupForm />
        </Col>
        <Col className="formContainer">
        <LoginForm />
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default LoginSignup;
