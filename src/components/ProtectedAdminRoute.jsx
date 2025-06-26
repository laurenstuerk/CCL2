import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// The component accepts the child elements to be protected as 'children'.
const ProtectedAdminRoute = () => {
  const { user, loading } = useAuth();

  // While loading display nothing..
  if (loading) {
    return null;
  }

  // When the loading process is complete AND the user exists AND its role is 'admin'...
  if (user && user.role === "admin") {
    return <Outlet />;
  }

  // In all other cases (not logged in OR no admin role),
  // redirect the user to the home page
  return <Navigate to="/" replace />;
}

export default ProtectedAdminRoute;