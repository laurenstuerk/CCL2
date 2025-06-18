// src/components/RootRouteHandler.jsx

import React from 'react';
import { useAuth } from '../context/AuthContext';

// We need to import the two pages it can render.
// Since this component itself is not lazy-loaded, we can import them directly.
import HomePage from '../pages/public/Homepage';
import Dashboard from '../pages/user/Dashboard';

/**
 * This component acts as a switch for your root route ('/').
 * It checks the user's authentication status and renders the
 * appropriate page (Homepage for guests, Dashboard for logged-in users).
 */
export default function RootRouteHandler() {
  const { user } = useAuth();

  // If a user exists, show them the Dashboard. Otherwise, show the Homepage.
  return user ? <Dashboard /> : <HomePage />;
}