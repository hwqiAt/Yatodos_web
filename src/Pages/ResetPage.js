import LoginLayout from "../Layouts/ActionLayout";
import ResetForm from "../Components/Action/ResetForm";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { resetPassword } from "../services/authService";
import "../assets/actions.css";

export default function ResetPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const resetToken = location.state?.resetToken;

  useEffect(() => {
    if (!resetToken) {
      navigate("/request-reset");
    }
  }, [resetToken, navigate]);

  const handleReset = async (password) => {
    setIsLoading(true);
    setApiError(null);

    try {
      await resetPassword(resetToken, password);

      navigate("/");
    } catch (err) {
      setApiError(err.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!resetToken) {
    return null;
  }

  return (
    <LoginLayout title="Set New Password">
      <ResetForm
        onSubmit={handleReset}
        isLoading={isLoading}
        apiError={apiError}
      />
    </LoginLayout>
  );
}
