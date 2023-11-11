import { Container, Row, Col } from "react-bootstrap";

import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm'

const styles = {
  loginStyle: {
    color: "white",
    textAlign: "left",
  },
  signupStyle: {
    color: 'white',
    textAlign: 'left',
  }
};

const LoginSignup = () => {

  return (
    <>
    <Container>
      <Row>
        <Col style={styles.signupStyle}>
        <SignupForm />
        </Col>
        <Col style={styles.loginStyle}>
        <LoginForm />
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default LoginSignup;
