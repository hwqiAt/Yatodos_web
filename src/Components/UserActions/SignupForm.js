import React, { useState } from "react";
import Button from "../UI/Button";
import InputGroup from "../UI/InputGroup";
import { useAuth } from "../../context/AuthContext";

export default function SignupForm() {
  const { handleSignup } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
    setMessage("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const res = await handleSignup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (res?._t === "Ok") {
        setMessage("Account created successfully! You can now log in.");
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setErrors({ general: res?.message || "Signup failed." });
      }
    } catch (err) {
      setErrors({ general: "Server error. Please try again later." });
    } finally {
      setLoading(false);
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
        message={errors.username}
      />

      <InputGroup
        label="Email"
        id="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        message={errors.email}
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

      {errors.general && <p className="error-message">{errors.general}</p>}
      {message && <p className="success-message">{message}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Sign Up"}
      </Button>
    </form>
  );
}
