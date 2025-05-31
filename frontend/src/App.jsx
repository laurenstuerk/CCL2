import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { loadTheme } from "./utils/themes.js";

// Importing components
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import { Toaster, toast } from "sonner";

// Importing necessary pages
import LoginPage from "./pages/public/LoginPage.jsx";
import HomePage from "./pages/public/Homepage.jsx";
import Dashboard from "./pages/user/Dashboard.jsx";
import ErrorPage from "./pages/shared/ErrorPage.jsx";
import RegisterPage from "./pages/public/RegisterPage.jsx";
import ProfileRouter from "./features/profile/ProfileRouter";
import MarbleRace from "./games/MarbelRace/index.jsx";

// Admin imports
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";

export default function App() {
  useEffect(() => {
    loadTheme();
  }, []);

  return (
    <Router>
      <Navbar />
      <Toaster position="bottom-right" duration={4000} />
      <Routes>
        {/* 🌐 Public routes 🔓 */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/marble-race" element={<MarbleRace />} />

        {/* 🔒 Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/:username"
          element={
            <ProtectedRoute>
              <ProfileRouter />
            </ProtectedRoute>
          }
        />

        {/* 🔐 Admin-only route */}

        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}
