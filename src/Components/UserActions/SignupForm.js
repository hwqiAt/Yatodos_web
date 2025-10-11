import React, { useState } from "react";
import Button from "../UI/Button";
import InputGroup from "../UI/InputGroup";

export default function SignupForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    mail: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.mail) newErrors.mail = "Email is required";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (onSubmit) onSubmit(formData);
  };

  return (
    <form className="signup-form main-form" onSubmit={handleSubmit}>
      <InputGroup
        label="Username"
        id="username"
        type="text"
        value={formData.username}
        onChange={handleChange}
        message={errors.username}
      />

      <InputGroup
        label="Password"
        id="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        message={errors.password}
      />

      <InputGroup
        label="Confirm Password"
        id="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        message={errors.confirmPassword}
      />

      <InputGroup
        label="Email"
        id="mail"
        type="email"
        value={formData.mail}
        onChange={handleChange}
        message={errors.mail}
      />

      <Button type="submit">Sign Up</Button>
    </form>
  );
}
