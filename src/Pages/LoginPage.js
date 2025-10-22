import LoginLayout from "../Layouts/ActionLayout";
import LoginForm from "../Components/Action/LoginForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../assets/actions.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = ({ username, password }) => {
    login(username, password);
    navigate("/todos");
  };

  return (
    <LoginLayout title="Login Account">
      <LoginForm onSubmit={handleLogin} />
    </LoginLayout>
  );
}
