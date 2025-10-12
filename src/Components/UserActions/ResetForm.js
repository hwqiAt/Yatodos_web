import React, { useState } from "react";
import Button from "../UI/Button";
import InputGroup from "../UI/InputGroup";

export default function ResetPasswordForm({ onSubmit }) {
  const [formData, setFormData] = useState({
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

    if (onSubmit) {
      try {
        setLoading(true);
        const res = await onSubmit(formData.password);

        if (res?.success) {
          setMessage("Password has been successfully reset!");
          setFormData({ password: "", confirmPassword: "" });
        } else {
          setErrors({ general: res?.message || "Failed to reset password." });
        }
      } catch (err) {
        setErrors({ general: "Server error. Please try again later." });
      } finally {
        setLoading(false);
      }
    }
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

      {errors.general && <p className="error-message">{errors.general}</p>}
      {message && <p className="success-message">{message}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  );
}
