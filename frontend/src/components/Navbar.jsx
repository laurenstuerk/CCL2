import { useState, useEffect, use } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, ChevronDown } from "lucide-react";
// import logo from "../assets/logo.png";
import logo from "../assets/logo1.png";
import { useAuth } from "../context/AuthContext.jsx";
import { useScrollDirection } from "../hooks/useScrollDirection";
import { getUsernameFromToken } from "../utils/auth";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isGamesOpen, setIsGamesOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const scrollDirection = useScrollDirection();
  const username = getUsernameFromToken();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setIsGamesOpen(false);
  }, [location]);

  const publicLinks = [
    { name: "About", to: "/#about" },
    { name: "Highlights", to: "/#highlights" },
    { name: "Features", to: "/#features" },
    { name: "Sections", to: "/#sections" },
  ];

  const loggedInLinks = [
    { name: "Dashboard", to: "/dashboard" },
    { name: "Leaderboard", to: "/leaderboard" },
  ];

  const gameLinks = [
    { name: "Lobby", to: "/games/lobby" },
    { name: "Mini Game 1", to: "/games/mini-game-1" },
    { name: "Mini Game 2", to: "/games/mini-game-2" },
  ];

  const navLinks = isLoggedIn ? loggedInLinks : publicLinks;

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-neutral-950/80 backdrop-blur-sm border-b border-neutral-800 text-neutral-100 z-50 transition-transform duration-300 ${
        scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Site Title - Left Side */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-neutral-400 rounded-lg p-1"
              aria-label="Go to homepage"
            >
              <img
                src={logo}
                alt="CCL#2 Logo"
                className="w-10 h-10 transition-transform duration-300 hover:rotate-12"
              />
              <span className="text-xl font-medium text-neutral-100">
                CCL#2
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className={`text-base font-medium transition-colors duration-200
                                        ${
                                          location.pathname === link.to
                                            ? "text-neutral-100"
                                            : "text-neutral-400 hover:text-neutral-100"
                                        }`}
                  aria-current={
                    location.pathname === link.to ? "page" : undefined
                  }
                >
                  {link.name}
                </Link>
              ))}

              {/* Games Dropdown - Only for logged in users */}
              {isLoggedIn && (
                <div className="relative">
                  <button
                    onClick={() => setIsGamesOpen(!isGamesOpen)}
                    className="flex items-center gap-1 text-base font-medium text-neutral-400 hover:text-neutral-100 transition-colors duration-200"
                    aria-expanded={isGamesOpen}
                    aria-controls="games-menu"
                  >
                    Games
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${isGamesOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isGamesOpen && (
                    <div
                      id="games-menu"
                      className="absolute top-full left-0 mt-2 w-48 bg-neutral-900 rounded-lg shadow-lg py-2"
                      role="menu"
                    >
                      {gameLinks.map((link) => (
                        <Link
                          key={link.name}
                          to={link.to}
                          className="block px-4 py-2 text-base text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors duration-200"
                          role="menuitem"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Auth Buttons - Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              username ? (
                <Link
                  to={`/${username}`}
                  className="flex items-center gap-2 text-base font-medium text-neutral-100 hover:text-neutral-300 transition-colors duration-200"
                  aria-label="View your profile"
                >
                  <User size={20} />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-base font-medium text-neutral-100 hover:text-neutral-300 transition-colors duration-200"
                  aria-label="Please log in again"
                >
                  <User size={20} />
                  <span className="hidden sm:inline">Session Expired</span>
                </Link>
              )
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-base font-medium text-neutral-100 hover:text-neutral-300 transition-colors duration-200"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="text-base font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-100 px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            <span className="sr-only">Toggle menu</span>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden ${isOpen ? "block" : "hidden"}`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="mobile-menu-button"
      >
        <div className="px-4 pt-2 pb-3 space-y-1 border-t border-neutral-800">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200
                                ${
                                  location.pathname === link.to
                                    ? "text-neutral-100 bg-neutral-800"
                                    : "text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800"
                                }`}
              role="menuitem"
              aria-current={location.pathname === link.to ? "page" : undefined}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Games Menu - Only for logged in users */}
          {isLoggedIn && (
            <>
              <div className="px-3 py-2 text-base font-medium text-neutral-400">
                Games
              </div>
              {gameLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className="block px-6 py-2 text-base font-medium text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors duration-200"
                  role="menuitem"
                >
                  {link.name}
                </Link>
              ))}
            </>
          )}

          {isLoggedIn ? (
            username ? (
              <Link
                to={`/${username}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors duration-200"
                role="menuitem"
              >
                <User size={20} />
                <span>Profile</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors duration-200"
                role="menuitem"
              >
                <User size={20} />
                <span>Session Expired</span>
              </Link>
            )
          ) : (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-lg text-base font-medium text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors duration-200"
                role="menuitem"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 rounded-lg text-base font-medium text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors duration-200"
                role="menuitem"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
