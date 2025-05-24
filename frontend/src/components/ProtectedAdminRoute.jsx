import { Navigate } from "react-router-dom";
import { getUserRoleFromStorage } from "../utils/auth";

export default function ProtectedAdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = getUserRoleFromStorage();
  console.log("ProtectedAdminRoute: ", role);

  if (!token || role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
