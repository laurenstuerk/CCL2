import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // display nothing
  // This prevents an unwanted, temporary redirect to the login page.
  if (loading) {
    return null;
  }

  // If the check is complete AND a user exists, allow access.
  // <Outlet /> renders the respective child route (e.g., the Dashboard component).
  if (user) {
    return <Outlet />;
  }

  // When the check is complete and NO user is present, redirect to the login page.
  // Save the original location to redirect the user back there after logging in.
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
