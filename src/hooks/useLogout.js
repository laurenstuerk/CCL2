// src/hook/useLogout.js
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

export function useLogout() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    return () => {
        localStorage.removeItem('token');
        logout();
        navigate('/');
    };
}
