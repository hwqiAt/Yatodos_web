import React, { useState } from "react";
import Button from "../UI/Button";
import InputGroup from "../UI/InputGroup";

export default function ForgotPasswordForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError("");
    if (message) setMessage("");
  };

  const validate = () => {
    if (!email) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Invalid email format";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMsg = validate();

    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    if (onSubmit) {
      try {
        setLoading(true);
        const res = await onSubmit(email);

        // if API sends a success message
        if (res?.success) {
          setMessage("Reset link has been sent to your email.");
          setEmail("");
        } else {
          setError(res?.message || "Failed to send reset link.");
        }
      } catch (err) {
        setError("Server error. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form className="main-form" onSubmit={handleSubmit}>
      <InputGroup
        label="Email"
        id="email"
        type="email"
        value={email}
        onChange={handleChange}
        message={error}
      />

      {message && <p className="success-message">{message}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Reset Link"}
      </Button>
    </form>
  );
}
