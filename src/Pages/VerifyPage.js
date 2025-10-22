import LoginLayout from "../Layouts/ActionLayout";
import VerifyForm from "../components/Action/VerifyForm";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { verifyResetCode } from "../services/authService";
import "../assets/actions.css";

export default function VerifyPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiMessage, setApiMessage] = useState("");

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/request-reset");
    }
  }, [email, navigate]);

  const handleVerify = async (code) => {
    setIsLoading(true);
    setApiError("");
    setApiMessage("");

    try {
      const response = await verifyResetCode(email, code);

      if (response._t === "Ok") {
        setApiMessage("Code verified! Redirecting...");
        navigate("/reset-password", {
          state: { resetToken: response.resetToken },
        });
      } else {
        setApiError(response?.msg || "Invalid or expired code.");
      }
    } catch (err) {
      setApiError(err.message || "Server error.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!email) {
    return null;
  }

  return (
    <LoginLayout title="Verify Your Code">
      <span
        style={{
          display: "block",
          textAlign: "center",
          color: "white",
          marginBottom: "15px",
        }}
      >
        OTP has been sent to {email}.
      </span>
      <VerifyForm
        onSubmit={handleVerify}
        isLoading={isLoading}
        apiError={apiError}
        apiMessage={apiMessage}
      />
    </LoginLayout>
  );
}
