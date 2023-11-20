import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_PROFILE } from "../utils/mutations";

import { Container, Row, Col, Form } from "react-bootstrap";
import "../assets/css/UpdateProfileForm.css"

const UpdateProfileForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [updateProfile] = useMutation(UPDATE_PROFILE);

  const handleUpdate = async () => {
    try {
      await updateProfile({
        variables: { username, email, password },
      });
    } catch (error) {
      console.error("Update failed:", error.message);
    }
  };

  return (
    <>
      <Container className="UPF-Container">
        <Row>
          <Col>
            <h1 className="UPF-Title">Edit Details</h1>
          </Col>
        </Row>
        <Row>
          <Form>
            <Form.Group className="UPF-FormGroup">
              <h5>Username:</h5>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="UPF-FormGroup">
              <h5>Email:</h5>
              <Form.Control
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="UPF-FormGroup">
              <h5>Password:</h5>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Col className="UPF-ButtonContainer">
              <Link to={"/profile"}>
            <button className="UPF-Button" onClick={handleUpdate}>Update Profile</button>
            </Link>
            </Col>
          </Form>
        </Row>
      </Container>
    </>
  );
};

export default UpdateProfileForm;
