import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import InputGroup from "../UI/InputGroup";

export default function LoginForm({ onSubmit }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Clear lỗi khi user nhập lại
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username) newErrors.username = "Username is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.username))
      newErrors.username = "Invalid email format";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

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
    <form className="login-form main-form" onSubmit={handleSubmit}>
      <InputGroup
        label="Email"
        id="username"
        type="email"
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

      <div className="sub-actions">
        <Button
          type="button"
          variant="link"
          onClick={() => navigate("/request")}
        >
          Forgot Password
        </Button>
        <Button
          type="button"
          variant="link"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </Button>
      </div>

      <Button type="submit">Login</Button>
    </form>
  );
}
