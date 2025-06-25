// src/components/PublicOnlyRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * This component is a wrapper for routes that should only be accessible
 * to logged-out users (Login, Register).
 * If the user is logged in, it redirects them to the dashboard.
 * Otherwise, it renders the child route.
 */
export default function PublicOnlyRoute() {
  const { user } = useAuth();

  if (user) {
    // User is logged in, so redirect to the dashboard.
    // The 'replace' prop is important to prevent the user from
    // clicking the back button to get to the login page.
    return <Navigate to="/dashboard" replace />;
  }

  // User is not logged in, so render the child route (e.g., the LoginPage).
  return <Outlet />;
}