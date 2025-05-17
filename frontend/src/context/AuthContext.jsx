// context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    // Track the login state
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the token is present in localStorage
        const token = localStorage.getItem('token');
        // If token is present, user is logged in
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    // Login function to update localStorage and state
    const login = (token) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true); // Update the state to reflect login status
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    // Return the context provider with the context value
    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
