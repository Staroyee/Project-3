import { useState } from "react";
import { Form, Alert } from "react-bootstrap";

import { useMutation } from "@apollo/client";
import { ADD_PROFILE } from "../../utils/mutations";

import Auth from "../../utils/auth";
import Button from "../Buttons/Button.jsx";

const SignupForm = () => {
  // Set initial form state
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser] = useMutation(ADD_PROFILE); // Use the ADD_USER mutation from GraphQL

  // Set state for displaying an alert
  const [showAlert, setShowAlert] = useState(false);
  const [validated] = useState(false); // Form validation state

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Update the userFormData state with the changed input value
    setUserFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Check if the form has everything
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (
      !userFormData.username ||
      !userFormData.email ||
      !userFormData.password
    ) {
      console.error("Null or undefined values found in form data.");
      setShowAlert(true);
      return;
    }

    try {
      // Send a request to the addUser mutation with userFormData
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      // If signup is successful, store the user's token in local storage using the Auth utility
      Auth.login(data.addProfile.token);
    } catch (err) {
      console.error(err);
      if (err.graphQLErrors) {
        console.error("GraphQL Errors:", err.graphQLErrors);
      }
      // Display an alert if signup fails
      setShowAlert(true);
    }
  };

  return (
    <>
      <svg
        height="100"
        stroke="#072448"
        strokeWidth="1.25"
        className="LS-text-line LS-SignupTitle"
        width="100%"
      >
        <text x="50%" dominantBaseline="middle" textAnchor="middle" y="50%">
          SIGNUP
        </text>
      </svg>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* Show an alert if there's an issue with the signup */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Please enter a valid Username, Email, and Password
        </Alert>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            className="formInput"
            type="text"
            placeholder="username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            className="formInput"
            type="email"
            placeholder="email"
            name="email"
            autoComplete="email"
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
            autoComplete="current-password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button value="Signup" disabled={
            !(
              userFormData.username &&
              userFormData.email &&
              userFormData.password
            )
          }
          type="submit" />
      </Form>
    </>
  );
};

export default SignupForm;
