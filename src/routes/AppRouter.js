import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import SignupPage from "../Pages/SignupPage";
import RequestPage from "../Pages/RequestPage";
import VerifyPage from "../Pages/VerifyPage"; // (Đã thêm trang verify còn thiếu)
import ResetPage from "../Pages/ResetPage";
import TodoPage from "../Pages/TodoPage";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
}

function PublicRoute({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/todos" replace /> : children;
}

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        }
      />
      <Route
        path="/request-reset"
        element={
          <PublicRoute>
            <RequestPage />
          </PublicRoute>
        }
      />
      <Route
        path="/verify-code"
        element={
          <PublicRoute>
            <VerifyPage />
          </PublicRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <PublicRoute>
            <ResetPage />
          </PublicRoute>
        }
      />
      <Route
        path="/todos"
        element={
          <PrivateRoute>
            <TodoPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
