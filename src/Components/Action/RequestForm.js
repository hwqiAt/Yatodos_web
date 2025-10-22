import React, { useState } from "react";
import Button from "../UI/Button";
import InputGroup from "../UI/InputGroup";

export default function ForgotPasswordForm({
  onSubmit,
  isLoading,
  apiError,
  apiMessage,
}) {
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (validationError) setValidationError("");
  };

  const validate = () => {
    if (!email) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Invalid email format";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorMsg = validate();

    if (errorMsg) {
      setValidationError(errorMsg);
      return;
    }

    if (onSubmit) {
      onSubmit(email);
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
        message={validationError || apiError}
      />

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Sending..." : "Send OTP"}
      </Button>
    </form>
  );
}
