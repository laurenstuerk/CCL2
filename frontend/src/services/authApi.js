import axios from "axios";
import { toast } from "sonner";
import { getAccessToken } from "../lib/authTokenStore";

// const BASE_URL = "http://localhost:3000/api";
const BASE_URL = "https://cc241049-10707.node.fhstp.cc";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Important: send cookies with every request
});

api.interceptors.request.use(
  (config) => {
    // Get the token from your IN-MEMORY store
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Refresh user session using refresh token cookie
export async function refreshSession() {
  try {
    const res = await api.post("/auth/refresh");
    return res.data;
  } catch (err) {
    toast.error("Session refresh failed");
    throw err;
  }
}


export const logoutUser = async () => {
  try {
    // Its only job is to tell the backend to expire the session.
    await api.post("/auth/logout");
    // We can add a success toast here for immediate feedback.
    toast.success("You have been logged out.");
  } catch (err) {
    // If the backend call fails, show an error.
    toast.error("Logout failed. Please try again.");
    // Re-throw the error in case other logic needs to catch it.
    throw err;
  }
};

// Login user with email and password
export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    toast.success("Login successful!");
    return response.data;
  } catch (err) {
    toast.error(err.response?.data?.message || "Login failed");
    throw err;
  }
};

// Register a new user
export const register = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    toast.success("Registration successful!");
    return response.data;
  } catch (err) {
    toast.error(err.response?.data?.message || "Registration failed");
    throw err;
  }
};

export const googleLogin = async (idToken) => {
  try {
    const response = await api.post("/auth/google", { token: idToken });

    toast.success("Logged in with Google!");
    return response.data;
  } catch (err) {
    toast.error(err.response?.data?.message || "Google login failed");
    throw err;
  }
};

export const setupMfa = async () => {
  try {
    const response = await api.post("/auth/mfa/setup");
    toast.success("QR Code ready. Please scan it with your authenticator app.");
    return response.data; // This will return { qrCodeUrl: "..." }
  } catch (err) {
    toast.error(err.response?.data?.message || "MFA setup failed.");
    throw err;
  }
};

export const verifyMfa = async (token) => {
  try {
    const response = await api.post("/auth/mfa/verify", { token });
    toast.success("MFA has been enabled successfully!");
    return response.data;
  } catch (err) {
    toast.error(err.response?.data?.message || "MFA verification failed.");
    throw err;
  }
};

export const loginVerifyMfa = async ({ userId, token }) => {
  try {
    const response = await api.post("/auth/mfa/login-verify", { userId, token });
    toast.success("Login successful!");
    return response.data;
  } catch (err) {
    toast.error(err.response?.data?.message || "Login verification failed.");
    throw err;
  }
};

export const disableMfa = async (password) => {
  // The password is sent in the body
  const response = await api.post("/auth/mfa/disable", { password });
  return response.data;
};