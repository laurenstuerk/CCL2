import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useScrollDirection } from "../hooks/useScrollDirection";
import { useQuery } from "@tanstack/react-query";
import { getGameNavList } from "../services/gameApi";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useAuth();
  const isLoggedIn = !!user;
  const username = user?.username;
  const role = user?.role;
  const location = useLocation();
  const scrollDirection = useScrollDirection();

  const { data: gameLinks, isLoading: isLoadingGameLinks } = useQuery({
    queryKey: ["gameNavLinks"],
    queryFn: getGameNavList,
    // Only run this query if the user is logged in, since the menu is only visible then.
    enabled: isLoggedIn,
    // Cache the data for 5 minutes to avoid re-fetching on every page navigation.
    staleTime: 1000 * 60 * 5,
  });

  // Close the mobile menu when the location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const loggedInLinks = [
    { name: "Dashboard", to: "/dashboard" },
    { name: "Leaderboard", to: "/leaderboard" },
  ];

  const adminLinks = [
    { name: "Admin Dashboard", to: "/admin" },
    { name: "User Management", to: "/admin/users" },
    { name: "Game Management", to: "/admin/gamesHistory" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full bg-neutral-950/80 backdrop-blur-sm border-b border-neutral-800 text-white z-50 transition-transform duration-300 ${scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"}`} role="navigation" aria-label="Main navigation">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 rounded-lg p-1" aria-label="Go to homepage">
              <img src={"/ripgroundLogo.png"} alt="RIPGROUND Logo" className="w-10 h-10 transition-transform duration-300 hover:rotate-60 hover:scale-100" />
              <span className="text-xl font-medium text-white hover:text-neutral-300 transition-colors duration-200">RIPGROUND</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center gap-8">
              {user &&
                loggedInLinks.map((link) => (
                  <Link key={link.name} to={link.to} className={`text-base font-medium transition-colors duration-200 ${location.pathname === link.to ? "text-white border-b-2 border-white" : "text-neutral-400 hover:text-neutral-100"}`}>
                    {link.name}
                  </Link>
                ))}

              {/* Games Dropdown */}
              {isLoggedIn && (
                <div className="relative group">
                  <a className="cursor-pointer flex items-center gap-1 text-base font-medium text-neutral-400 group-hover:text-neutral-100">
                    Games <ChevronDown size={16} className="transition-transform duration-200 group-hover:rotate-180" />
                  </a>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-neutral-900 rounded-lg shadow-lg py-2 opacity-0 scale-95 invisible group-hover:visible group-hover:opacity-100 group-hover:scale-100 transition-all duration-200">
                    {isLoadingGameLinks ? (
                      <span className="block px-4 py-2 text-base text-neutral-500">Loading...</span>
                    ) : (
                      gameLinks?.map((link) => (
                        <Link key={link.slug} to={link.play_url || `/games/${link.slug}`} className="block px-4 py-2 text-base text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100">
                          {link.title}
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Admin Dropdown */}
              {isLoggedIn && role === "admin" && (
                <div className="relative group">
                  <a className="cursor-pointer flex items-center gap-1 text-base font-medium text-neutral-400 group-hover:text-neutral-100">
                    Admin <ChevronDown size={16} className="transition-transform duration-200 group-hover:rotate-180" />
                  </a>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-neutral-900 rounded-lg shadow-lg py-2 opacity-0 scale-95 invisible group-hover:visible group-hover:opacity-100 group-hover:scale-100 transition-all duration-200">
                    {adminLinks.map((link) => (
                      <Link key={link.name} to={link.to} className="block px-4 py-2 text-base text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100">
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {loading ? (
              <div className="h-8 w-32 bg-neutral-800 animate-pulse rounded-lg"></div>
            ) : isLoggedIn && username ? (
              <Link to={`/${username}`} className="flex items-center gap-2 text-base font-medium text-neutral-100 hover:text-neutral-300">
                <User size={20} />
                <span className="hidden sm:inline">{username}</span>
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-base font-medium text-neutral-100 hover:text-neutral-300">
                  Log in
                </Link>
                <Link to="/register" className="text-base font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-100 px-4 py-2 rounded-lg">
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400" aria-expanded={isOpen} aria-controls="mobile-menu" aria-label="Toggle menu">
            <span className="sr-only">Toggle menu</span>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div id="mobile-menu" className={`md:hidden ${isOpen ? "block" : "hidden"}`} role="menu" aria-orientation="vertical" aria-labelledby="mobile-menu-button">
        <div className="px-4 pt-2 pb-3 space-y-1 border-t border-neutral-800">
          {loggedInLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200
                                ${location.pathname === link.to ? "text-neutral-100 bg-neutral-800" : "text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800"}`}
              role="menuitem"
              aria-current={location.pathname === link.to ? "page" : undefined}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Games Menu - Only for logged in users */}
          {isLoggedIn && (
            <>
              <div className="px-3 py-2 text-base font-medium text-neutral-400">Games</div>
              {isLoadingGameLinks ? (
                <span className="block px-6 py-2 text-base font-medium text-neutral-500">Loading...</span>
              ) : (
                gameLinks?.map((link) => (
                  <Link key={link.slug} to={link.play_url || `/games/${link.slug}`} className="block px-6 py-2 text-base font-medium text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800">
                    {link.title}
                  </Link>
                ))
              )}

              {role === "admin" && (
                <>
                  <div className="px-3 py-2 text-base font-medium text-neutral-400">Admin</div>
                  {adminLinks.map((link) => (
                    <Link key={link.name} to={link.to} className="block px-6 py-2 text-base font-medium text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors duration-200" role="menuitem">
                      {link.name}
                    </Link>
                  ))}
                </>
              )}
            </>
          )}

          {isLoggedIn ? (
            username ? (
              <Link to={`/${username}`} className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors duration-200" role="menuitem">
                <User size={20} />
                <span>Profile</span>
              </Link>
            ) : (
              <Link to="/login" className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors duration-200" role="menuitem">
                <User size={20} />
                <span>Session Expired</span>
              </Link>
            )
          ) : (
            <>
              <Link to="/login" className="block px-3 py-2 rounded-lg text-base font-medium text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors duration-200" role="menuitem">
                Log in
              </Link>
              <Link to="/register" className="block px-3 py-2 rounded-lg text-base font-medium text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors duration-200" role="menuitem">
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
