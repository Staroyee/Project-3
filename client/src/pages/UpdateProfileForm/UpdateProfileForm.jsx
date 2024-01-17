import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@apollo/client";
// Import Mutations
import { UPDATE_PROFILE } from "../../utils/mutations";
// Import Components
import FunctionButton from "../../components/Buttons/FunctionButton.jsx";
// Import Styling
import { Container, Row, Col, Form } from "react-bootstrap";
import "./UpdateProfileForm.css";
import BackButton from "../../components/Buttons/BackButton.jsx";

// Define UpdateProfileForm page
const UpdateProfileForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Use mutation to update a user's profile details
  const [updateProfile] = useMutation(UPDATE_PROFILE);

  // Function to handle the updating of a user's profile
  const handleUpdate = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate fields
    if (!username || !email || !password) {
      setErrorMessage("* All fields are required");
      return;
    }

    // Validate email using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("* Invalid email format");
      return;
    }

    // Validate password length
    if (password.length < 7) {
      setErrorMessage("* Password must be at least 7 characters long");
      return;
    }

    // Clear any previous error messages
    setErrorMessage("");

    // Proceed with the update
    try {
      updateProfile({
        variables: { username, email, password },
      });
      // Optionally, you can navigate after the update is successful
      navigate("/profile");
    } catch (error) {
      console.error("Update failed:", error.message);
      setErrorMessage("* Update failed. Please try again.");
    }
  };

  const navigate = useNavigate();

  // Return page data
  return (
    <>
      <Container className="UPF-Container">
        <Row>
          <Col>
            <BackButton onClick={() => navigate(-1)} />
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
            {errorMessage && (
              <Row className="UPF-ErrorMessage">
                <Col>
                  <p>{errorMessage}</p>
                </Col>
              </Row>
            )}
          </Form>
        </Row>
      </Container>
    </>
  );
};

// Export page
export default UpdateProfileForm;
