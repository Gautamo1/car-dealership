import { Navigate } from "react-router-dom";
import { getToken, isAdmin } from "../utils/auth";

export default function AdminRoute({ children }) {
  const token = getToken();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (!isAdmin()) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}