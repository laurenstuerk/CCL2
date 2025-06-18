import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// The component accepts the child elements to be protected as 'children'.
const ProtectedAdminRoute = () => {
  const { user, loading } = useAuth();

  // 1. We don't display anything while we're loading the user state.
  // This prevents the page from flashing briefly or causing an incorrect redirect.
  if (loading) {
    return null;
  }

  // 2. When the loading process is complete AND the user exists AND its role is 'admin'...
  if (user && user.role === "admin") {
    return <Outlet />;
  }

  // 3. In all other cases (not logged in OR no admin role),
  // we redirect the user to the home page without comment.
  return <Navigate to="/" replace />;
}

export default ProtectedAdminRoute;