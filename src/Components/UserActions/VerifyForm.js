import React, { useState } from "react";
import Button from "../UI/Button";
import InputGroup from "../UI/InputGroup";

export default function VerifyForm({
  onSubmit,
  isLoading,
  apiError,
  apiMessage,
}) {
  const [code, setCode] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    if (!/^\d*$/.test(value) || value.length > 6) return;

    setCode(value);
    if (validationError) setValidationError("");
  };

  const validate = () => {
    if (!code) return "Verification code is required";
    if (code.length < 6) return "Code must be 6 digits";
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
      onSubmit(code);
    }
  };

  return (
    <form className="main-form" onSubmit={handleSubmit}>
      <InputGroup
        label="Verification Code"
        id="code"
        type="text"
        value={code}
        onChange={handleChange}
        message={validationError || apiError}
        placeholder="Enter the 6-digit code"
        maxLength={6}
        autoComplete="one-time-code"
      />

      <Button type="submit" disabled={isLoading}>
        {isLoading ? `${apiMessage}` : "Verify Code"}
      </Button>
    </form>
  );
}
