import React, { useState } from "react";
import LoginLayout from "../Layouts/ActionLayout";
import RequestForm from "../components/Action/RequestForm";
import { useNavigate } from "react-router-dom";
import { requestPasswordReset } from "../services/authService";
import "../assets/actions.css";

export default function RequestPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiMessage, setApiMessage] = useState("");

  const handleRequestSubmit = async (email) => {
    setIsLoading(true);
    setApiError("");
    setApiMessage("");

    try {
      const response = await requestPasswordReset(email);

      if (response._t === "Ok") {
        setApiMessage(
          "otp is sent to your email. Redirecting to verify page..."
        );

        navigate("/verify-code", { state: { email: email } });
      } else {
        setApiError(response?.msg || "Failed to send OTP. Please try again.");
      }
      return response;
    } catch (err) {
      setApiError(err.message || "Server error. Please try again later.");
      return { _t: "Err", msg: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginLayout title="Request Password Reset">
      <RequestForm
        onSubmit={handleRequestSubmit}
        isLoading={isLoading}
        apiError={apiError}
        apiMessage={apiMessage}
      />
    </LoginLayout>
  );
}
