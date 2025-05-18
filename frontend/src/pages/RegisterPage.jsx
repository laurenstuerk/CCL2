import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createUser, updateUser, getUserById } from '../api/userApi.js';

export default function RegisterPage() {
    const [userData, setUserData] = useState({ name: '', email: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { id } = useParams();
    const isEditMode = Boolean(id);

    useEffect(() => {
        const fetchUser = async () => {
            if (!isEditMode) return;
            setIsLoading(true);
            const token = localStorage.getItem('token');
            try {
                const userData = await getUserById(token, id);
                setUserData(userData);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    const userForm = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        const token = localStorage.getItem('token');
        try {
            if (isEditMode) {
                await updateUser(token, id, userData);
            } else {
                await createUser(token, userData);
            }
            navigate('/users');
        } catch (error) {
            setError(error.message);
            if (error.status === 401 || error.status === 403) {
                navigate('/login');
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
    if (error) return <div className="flex justify-center items-center h-screen text-red-500 text-center mt-6">{error}</div>;

    return (
        <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center px-4 py-12 text-white">
            <div className="w-full max-w-md">
                <h1 className="text-2xl md:text-3xl font-semibold text-center mb-8 tracking-tight">
                    {isEditMode ? 'Edit User' : 'Create New User'}
                </h1>

                <form onSubmit={userForm} className="space-y-6 bg-neutral-900 p-8 border border-neutral-800">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-sm text-gray-400 mb-1">Name</label>
                        <input
                            id="name"
                            type="text"
                            value={userData.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                            className="bg-neutral-800 text-white border border-neutral-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="surname" className="text-sm text-gray-400 mb-1">Surname</label>
                        <input
                            id="surname"
                            type="text"
                            value={userData.surname}
                            onChange={(e) => setUserData({ ...userData, surname: e.target.value })}
                            className="bg-neutral-800 text-white border border-neutral-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-sm text-gray-400 mb-1">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            className="bg-neutral-800 text-white border border-neutral-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="info" className="text-sm text-gray-400 mb-1">Info</label>
                        <input
                            id="info"
                            type="info"
                            value={userData.info}
                            onChange={(e) => setUserData({ ...userData, info: e.target.value })}
                            className="bg-neutral-800 text-white border border-neutral-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="hero" className="text-sm text-gray-400 mb-1">Hero</label>
                        <input
                            id="hero"
                            type="hero"
                            value={userData.hero}
                            onChange={(e) => setUserData({ ...userData, hero: e.target.value })}
                            className="bg-neutral-800 text-white border border-neutral-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 font-semibold transition"
                    >
                        {isEditMode ? 'Update User' : 'Create User'}
                    </button>
                </form>
            </div>
        </div>
    );
}
