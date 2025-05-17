import { useState } from 'react';
import {Link} from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext.jsx';
import { useLogout } from '../hooks/useLogout.js';


function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { isLoggedIn } = useAuth();
    const logout = useLogout();

    const navLinks = isLoggedIn
        ? [
            { name: 'Home', to: '/' },
            { name: 'Users', to: '/users' },
            { name: 'Create User', to: '/users/create' },
        ]
        : [
            { name: 'Home', to: '/' },
            { name: 'Login', to: '/login' },
        ];

    return (
        <nav className="navbar fixed top-0 left-0 w-full bg-[rgba(32,33,36,0.25) backdrop-blur-sm border-b border-neutral-700 text-gray-50 shadow-lg z-50">
            <div className="navbar-container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo and Site Title */}
                    <Link to="/" className="flex items-center">
                        <img src={logo} alt="Logo" className="w-14 h-14 transition-transform duration-300 hover:rotate-20 hover:scale-110" />
                        <span className="text-2xl font-bold text-gray-50 hover:text-gray-300 transition duration-300 ease-in-out">
                            Workframe
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="navbar-links hidden md:flex space-x-8 items-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.to}
                                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
                            >
                                {link.name}
                            </Link>
                        ))}

                        {isLoggedIn && (
                            <button
                                onClick={logout}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
                            >
                                Logout
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition duration-300 ease-in-out"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`navbar-mobile-menu ${isOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.to}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-300 ease-in-out"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    {isLoggedIn && (
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                logout();
                            }}
                            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-400 hover:text-white hover:bg-red-600 transition duration-300 ease-in-out"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
