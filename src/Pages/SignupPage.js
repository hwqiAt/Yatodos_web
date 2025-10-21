import LoginLayout from "../Layouts/ActionLayout";
import SignupForm from "../components/UserActions/SignupForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../assets/actions.css";

export default function SignupPage() {
  const navigate = useNavigate();
  const { handleSignup } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiMessage, setApiMessage] = useState("");

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setApiError("");
    setApiMessage("");

    try {
      const res = await handleSignup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (res?._t === "Ok") {
        setApiMessage("Signup successful! Redirecting to login page...");

        setTimeout(() => {
          navigate("/");
        }, 5000);
      } else {
        setApiError(res?.message || "Signup failed.");
      }
    } catch (err) {
      setApiError(err.message || "Server error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginLayout title="Sign Up">
      <SignupForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        apiError={apiError}
        apiMessage={apiMessage}
      />
    </LoginLayout>
  );
}
