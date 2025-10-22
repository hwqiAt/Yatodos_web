import React, { useState } from "react";
import Button from "../UI/Button";
import InputGroup from "../UI/InputGroup";

export default function SignupForm({
  onSubmit,
  isLoading,
  apiError,
  apiMessage,
}) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setValidationErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) newErrors.username = "Username is required";
    else if (formData.username.length < 3)
      newErrors.username = "Username must be at least 3 characters";

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors(validationErrors);
      return;
    }

    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form className="signup-form main-form" onSubmit={handleSubmit}>
      <InputGroup
        label="Username"
        id="username"
        type="text"
        value={formData.username}
        onChange={handleChange}
        message={validationErrors.username}
      />

      <InputGroup
        label="Email"
        id="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        message={validationErrors.email}
      />

      <InputGroup
        label="Password"
        id="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        message={validationErrors.password}
      />

      <InputGroup
        label="Confirm Password"
        id="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        message={validationErrors.confirmPassword}
      />

      {apiError && (
        <p
          className="error-message"
          style={{ color: "red", textAlign: "center" }}
        >
          {`${apiError} Try again.`}
        </p>
      )}
      {apiMessage && (
        <p
          className="success-message"
          style={{ color: "white", textAlign: "center" }}
        >
          {apiMessage}
        </p>
      )}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Sign Up"}
      </Button>
    </form>
  );
}
