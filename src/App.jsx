import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

// Importing components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import StaticPageLayout from "./components/StaticPageLayout";
import PublicOnlyRoute from "./components/PublicOnlyRoute";
import RootRouteHandler from "./components/RootRouteHandler";

const PageLoader = () => (
  <div className="min-h-screen w-full bg-black flex items-center justify-center">
    <p className="text-white animate-pulse">Loading...</p>
  </div>
);

// Public Pages
const HomePage = lazy(() => import("./pages/public/Homepage.jsx"));
const LoginPage = lazy(() => import("./pages/public/LoginPage.jsx"));
const RegisterPage = lazy(() => import("./pages/public/RegisterPage.jsx"));

// User & Game Pages
const Dashboard = lazy(() => import("./pages/user/Dashboard.jsx"));
const LeaderboardPage = lazy(() => import("./pages/user/LeaderboardPage.jsx"));
const GameDetailPage = lazy(() => import("./pages/games/GameDetailPage.jsx"));
const MarbleRace = lazy(() => import("./games/MarbleRace/index.jsx"));

const ScoketDrive = lazy(() => import("./games/socket-drive/src/index.jsx"));
const ProfileRouter = lazy(() => import("./features/profile/ProfileRouter"));

// Admin Pages
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.jsx"));
const AdminUser = lazy(() => import("./pages/admin/AdminUser.jsx"));
const GameHistory = lazy(() => import("./pages/admin/GameHistory.jsx"));

// Static Content Pages
const AboutUsPage = lazy(() => import("./pages/public/static/AboutUsPage.jsx"));
const CareersPage = lazy(() => import("./pages/public/static/CareersPage.jsx"));
const BlogPage = lazy(() => import("./pages/public/static/BlogPage.jsx"));
const ContactPage = lazy(() => import("./pages/public/static/ContactPage.jsx"));
const CommunityGuidelinesPage = lazy(() => import("./pages/public/static/CommunityGuidelinesPage.jsx"));
const CreateGamePage = lazy(() => import("./pages/public/static/CreateGamePage.jsx"));
const HelpCenterPage = lazy(() => import("./pages/public/static/HelpCenterPage.jsx"));
const PrivacyPolicyPage = lazy(() => import("./pages/public/static/PrivacyPolicyPage.jsx"));
const TermsOfServicePage = lazy(() => import("./pages/public/static/TermsOfServicePage.jsx"));
const TournamentsPage = lazy(() => import("./pages/public/static/TournamentsPage.jsx"));

// Shared Pages
const ErrorPage = lazy(() => import("./pages/shared/ErrorPage.jsx"));

export default function App() {
  return (
    <Router>
      <Navbar />
      <Toaster position="bottom-right" theme="dark" duration={4000} />
      <ErrorBoundary>
        {/* A single Suspense wrapper for all lazy-loaded routes */}
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* 🌐 Public routes */}
             <Route path="/" element={<RootRouteHandler />} />
            <Route path="/home" element={<HomePage />} />

            <Route element={<PublicOnlyRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            <Route path="/games/:slug" element={<GameDetailPage />} />

            {/* 🔒 Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/:username" element={<ProfileRouter />} />
              <Route path="/games/marble-rush-3d/play" element={<MarbleRace />} />
              <Route path="/games/socket-drive/play" element={<ScoketDrive />} />
            </Route>

            {/* 🔐 Admin-only route */}
            <Route element={<ProtectedAdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUser />} />
              <Route path="/admin/gamesHistory" element={<GameHistory />} />
            </Route>

            {/* 📄 Static Pages Layout Route */}
            <Route element={<StaticPageLayout />}>
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/community-guidelines" element={<CommunityGuidelinesPage />} />
              <Route path="/create-game" element={<CreateGamePage />} />
              <Route path="/help-center" element={<HelpCenterPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />
              <Route path="/tournaments" element={<TournamentsPage />} />
            </Route>

            {/* 💥 Catch-all 404 Not Found Route */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      <Footer />
    </Router>
  );
}
