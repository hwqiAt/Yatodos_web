import React, { useState } from "react";
import Button from "../UI/Button";
import InputGroup from "../UI/InputGroup";

export default function ResetPasswordForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.password) newErrors.password = "Password is required";
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
      setErrors(validationErrors);
      return;
    }

    if (onSubmit) onSubmit(formData.password);
  };

  return (
    <form className="reset-password-form main-form" onSubmit={handleSubmit}>
      <InputGroup
        label="New Password"
        id="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        message={errors.password}
      />

      <InputGroup
        label="Confirm New Password"
        id="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        message={errors.confirmPassword}
      />

      <Button type="submit">Reset Password</Button>
    </form>
  );
}
