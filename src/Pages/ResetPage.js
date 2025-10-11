import LoginLayout from "../Layouts/ActionLayout";
import ResetForm from "../Components/UserActions/ResetForm";
import { useNavigate } from "react-router-dom";
import "../assets/actions.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <LoginLayout title="Reset Password">
      <ResetForm onSubmit={handleLogin} />
    </LoginLayout>
  );
}
