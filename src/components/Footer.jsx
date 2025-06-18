import { Link, useLocation } from "react-router-dom";
import { Twitter, Github, Mail, Instagram } from "lucide-react";

export default function RipgroundFooter() {
  const location = useLocation();
  const currentYear = new Date().getFullYear();


    // --- Logic to hide the footer ---
  // check if the path includes '/games/' and ends with '/play'.
  const isGamePage = location.pathname.endsWith("/play");

  // If we are on a game page, render nothing (null).
  if (isGamePage) {
    return null;
  }

  return (
    <footer className="bg-black text-white border-t border-gray-800" role="contentinfo">
      <div className="container mx-auto px-4 pt-12 max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src={"/ripgroundLogo.png"} alt="RIPGROUND Logo" className="h-8 w-8 text-white" aria-hidden="true" />
              <span className="text-2xl font-bold">RIPGROUND</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">The ultimate platform for browser-based gaming experiences. Play, create, and connect with gamers worldwide.</p>
          </div>

          {/* Platform Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Platform</h3>
            <nav aria-label="Platform navigation">
              <ul className="space-y-3">
                <li>
                  <Link to="/home" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-sm">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/create-game" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-sm">
                    Create Games
                  </Link>
                </li>
                <li>
                  <Link to="/leaderboard" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-sm">
                    Leaderboard
                  </Link>
                </li>
                <li>
                  <Link to="/tournaments" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-sm">
                    Tournaments
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Company</h3>
            <nav aria-label="Company navigation">
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-sm">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-sm">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-sm">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-sm">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Support & Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Support & Legal</h3>
            <nav aria-label="Support and legal navigation">
              <ul className="space-y-3">
                <li>
                  <Link to="/help-center" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-sm">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-service" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-sm">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/community-guidelines" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-sm">
                    Community Guidelines
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Social Media & Copyright Section */}
        <div className="border-t border-gray-800 pt-2">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            {/* Social Media Links */}
            <div className="flex items-center space-x-6">
              <span className="text-sm text-gray-300 font-medium">Follow us:</span>
              <nav aria-label="Social media links">
                <ul className="flex space-x-4">

                  <li>
                    <a href="https://www.instagram.com/ripground" className="text-gray-300hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-sm p-1" aria-label="Join RIPGROUND Instagram community" target="_blank" rel="noopener noreferrer">
                      <Instagram className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/laurenstuerk" className="text-gray-300 ring-white hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-sm p-1" aria-label="View RIPGROUND on GitHub" target="_blank" rel="noopener noreferrer">
                      <Github className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="mailto:support@ripground.com" className="text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-sm p-1" aria-label="Email RIPGROUND">
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-300">© {currentYear} RIPGROUND. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
