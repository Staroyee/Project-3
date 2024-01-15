import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@apollo/client";
// Import Mutations
import { UPDATE_PROFILE } from "../../utils/mutations";
// Import Components
import FunctionButton from "../../components/Buttons/FunctionButton.jsx";

// Import Styling
import { Container, Row, Col, Form } from "react-bootstrap";
import "./UpdateProfileForm.css";

// Define UpdateProfileForm page
const UpdateProfileForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Use mutation to update a users profile details
  const [updateProfile] = useMutation(UPDATE_PROFILE);

  // Function to handle the updating of a users profile
  const handleUpdate = async () => {
    try {
      await updateProfile({
        variables: { username, email, password },
      });
    } catch (error) {
      console.error("Update failed:", error.message);
    }
  };

  // Return page data
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
                <FunctionButton
                  value="Update Details"
                  className="UPF-Button"
                  onClick={handleUpdate}
                />
              </Link>
            </Col>
          </Form>
        </Row>
      </Container>
    </>
  );
};

// Export page
export default UpdateProfileForm;
