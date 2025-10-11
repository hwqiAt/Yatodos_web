import LoginLayout from "../Layouts/ActionLayout";
import SignupForm from "../Components/UserActions/SignupForm";
import { useNavigate } from "react-router-dom";
import "../assets/actions.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <LoginLayout title="Sign Up">
      <SignupForm onSubmit={handleLogin} />
    </LoginLayout>
  );
}
