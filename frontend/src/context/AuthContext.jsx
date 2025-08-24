//src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { setAccessToken, clearAccessToken } from "../lib/authTokenStore";
import { toast } from "sonner";
import * as api from "../services/authApi";

// AuthContext provides authentication state and methods to the rest of the application.
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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
      const data = await api.login(email, password); // Use the function from authApi.js
      // Check for direct login success
      if (data.accessToken) {
        setUser(data.user);
        setAccessToken(data.accessToken);
        toast.success("Login successful!");
      }
      return data; // Return data for further processing
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
      // Send the Google ID token to the backend.
      // The backend expects it in the body under the field "token".
      const data = await api.googleLogin(googleToken);

      // Save the user and the access token it gets back from the backend
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
    // Clear the frontend state, regardless of API success or failure.
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
