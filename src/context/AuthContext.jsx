//src/context/AuthContext.jsx

import React, { createContext, useState, useEffect, useContext } from "react";
// import api from "../lib/axios";
import { setAccessToken, clearAccessToken } from "../lib/authTokenStore";
import { toast } from "sonner";
import * as api from "../services/authApi";

// AuthContext provides authentication state and methods to the rest of the application.
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log("Auth context initialized with user:", user);
  const [loading, setLoading] = useState(true);

  // On mount, try to refresh token (if cookie exists)
  useEffect(() => {
    async function initializeAuth() {
      try {
      const data = await api.refreshSession();
        setUser(data.user);
        setAccessToken(data.accessToken);
      } catch {
        setUser(null);
        clearAccessToken();
      } finally {
        setLoading(false);
      }
    }
    initializeAuth();
  }, []);

  // Listen for auth failure events to handle token refresh errors
  useEffect(() => {
    const handleAuthFailure = () => {
      // If the auth fails, clear user state and access token
      setUser(null);
      clearAccessToken();
    };

    window.addEventListener("auth-failure", handleAuthFailure);

    // Cleanup when the component unmounts
    return () => {
      window.removeEventListener("auth-failure", handleAuthFailure);
    };
  }, []);

  const login = async (email, password) => {
    try {
      console.log("Auth context Login called with:", email, password);
      const data = await api.login(email, password); // Use the function from authApi.js
      // Check for direct login success
      console.log("Auth context Login data:", data);
      if (data.accessToken) {
        setUser(data.user);
        setAccessToken(data.accessToken);
        toast.success("Login successful!");
      }
      console.log("Auth context Login result:", data);
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      throw error; // Re-throw error for the component to catch
    }
  };

  const finalizeMfaLogin = async ({ userId, token }) => {
    try {
      const data = await api.loginVerifyMfa({ userId, token });
      // This is where we complete the login
      setUser(data.user);
      setAccessToken(data.accessToken);
      toast.success("Login successful!");
      return data; // Return data on success
    } catch (error) {
      toast.error(error.response?.data?.message || "MFA Login failed");
      throw error; // Re-throw error
    }
  };

  const loginWithGoogle = async (googleToken) => {
    try {
      // Send the Google ID token to your backend.
      // Your backend expects it in the body under the field "token".
      const data = await api.googleLogin(googleToken);

      // Save the user and the access token you get back from the backend
      setUser(data.user);
      setAccessToken(data.accessToken);
      toast.success("Logged in with Google!");
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Google Login failed",
      };
    }
  };

const logout = async () => {
  try {
    toast.info("Logging out...");
    await api.logoutUser();
  } catch (error) {
  } finally {
    // ALWAYS clear the frontend state, regardless of API success or failure.
    // This ensures the user is logged out of the UI.
    setUser(null);
    clearAccessToken();
  }
};

  return <AuthContext.Provider value={{ user, login, logout, loading, setUser, loginWithGoogle, finalizeMfaLogin }}>{children}</AuthContext.Provider>;
};

// Custom hook for easy access to auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
