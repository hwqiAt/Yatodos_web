import React, { useState } from "react";
import Button from "../UI/Button";
import InputGroup from "../UI/InputGroup";

export default function ForgotPasswordForm({ onSubmit }) {
  const [mail, setMail] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setMail(e.target.value);
    if (error) setError("");
  };

  const validate = () => {
    if (!mail) return "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail))
      return "Invalid email format";

    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorMsg = validate();

    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    if (onSubmit) onSubmit(mail);
  };

  return (
    <form className="main-form" onSubmit={handleSubmit}>
      <InputGroup
        label="Email"
        id="mail"
        type="email"
        value={mail}
        onChange={handleChange}
        message={error}
      />

      <Button type="submit">Send Reset Link</Button>
    </form>
  );
}
