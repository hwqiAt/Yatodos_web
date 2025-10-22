import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../UI/Button";
import InputGroup from "../UI/InputGroup";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
    setApiError("");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
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
      const res = await handleLogin(formData.email, formData.password);
      if (res.token) navigate("/todos");
      else setApiError(res.message || "Login failed");
    } catch (err) {
      setApiError("Server error, please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="login-form main-form" onSubmit={handleSubmit}>
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

      {apiError && <p className="error">{apiError}</p>}

      <div className="sub-actions">
        <Button
          type="button"
          variant="link"
          onClick={() => navigate("/request-reset")}
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

      <Button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
