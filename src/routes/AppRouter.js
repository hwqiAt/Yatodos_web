import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import SignupPage from "../Pages/SignupPage";
import RequestPage from "../Pages/RequestPage";
import ResetPage from "../Pages/ResetPage";
import TodoPage from "../Pages/TodoPage";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/request" element={<RequestPage />} />
      <Route path="/reset" element={<ResetPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/todos"
        element={
          <PrivateRoute>
            <TodoPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
