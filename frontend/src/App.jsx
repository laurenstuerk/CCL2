import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import UsersPage from "./pages/UsersPage.jsx";

// import UserDetailPage from "./pages/UserDetailPage.jsx";
// import UserFormPage from "./pages/UserFormPage.jsx";

// Importing components
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

// Importing necessary pages
import LoginPage from "./pages/public/LoginPage.jsx";
import HomePage from "./pages/public/Homepage.jsx";
import Dashboard from "./pages/user/Dashboard.jsx";
import ErrorPage from "./pages/shared/ErrorPage.jsx";
import RegisterPage from "./pages/public/RegisterPage.jsx";
import ProfileRouter from "./features/profile/ProfileRouter";

// Admin imports
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";


export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* 🌐 Public routes 🔓 */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

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
      <Footer />
    </Router>
  );
}
