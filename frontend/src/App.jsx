import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import UsersPage from "./pages/UsersPage.jsx";

// import UserDetailPage from "./pages/UserDetailPage.jsx";
// import UserFormPage from "./pages/UserFormPage.jsx";

// Importing components
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Importing necessary pages
import LoginPage from "./pages/public/LoginPage.jsx";
import HomePage from "./pages/public/Homepage.jsx";
import Dashboard from "./pages/user/Dashboard.jsx";
import ErrorPage from "./pages/shared/ErrorPage.jsx";
import RegisterPage from "./pages/public/RegisterPage.jsx";
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
