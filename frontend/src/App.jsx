import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/Homepage.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import UserDetailPage from "./pages/UserDetailPage.jsx";
import UserFormPage from "./pages/UserFormPage.jsx";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfileRouter from "./features/profile/ProfileRouter";

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
          path="/:username"
          element={
            <ProtectedRoute>
              <ProfileRouter />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}
