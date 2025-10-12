import LoginLayout from "../Layouts/ActionLayout";
import RequestForm from "../components/UserActions/RequestForm";
import { useNavigate } from "react-router-dom";
import "../assets/actions.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/reset");
  };

  return (
    <LoginLayout title="Request Password Reset">
      <RequestForm onSubmit={handleLogin} />
    </LoginLayout>
  );
}
