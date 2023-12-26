// Import necessary dependencies and components
import { useState } from "react";
import { Form, Alert } from "react-bootstrap";

import Auth from "../utils/auth"; // Import the authentication utility
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations"; // Import the login mutation

const LoginForm = () => {
  // Initialize state variables
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated] = useState(false); // Form validation state
  const [showAlert, setShowAlert] = useState(false); // Display login error alert state
  const [login] = useMutation(LOGIN_USER); // Use the LOGIN_USER mutation from GraphQL

  // Handle input field changes and update the userFormData state
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // Handle form submission when the user clicks the "Submit" button
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Check if the form is valid according to React-Bootstrap's validation rules
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      // Send a request to the login mutation with userFormData
      const { data } = await login({
        variables: { ...userFormData },
      });

      // If login is successful, store the user's token in local storage using the Auth utility
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      // Display an alert if login fails
      setShowAlert(true);
    }

    // Clear the form data after submission
    setUserFormData({
      username: "", // This line appears to be clearing a non-existent 'username' field
      email: "",
      password: "",
    });
  };

  return (
    <>
      <h1 className="LS-LoginTitle">Login</h1>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Incorrect Email or Password!
        </Alert>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            className="formInput"
            type="text"
            placeholder="email"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            className="formInput"
            type="password"
            placeholder="password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>

        <button
          className="LS-Button"
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
        >
          Login
        </button>
      </Form>
    </>
  );
};

export default LoginForm;
