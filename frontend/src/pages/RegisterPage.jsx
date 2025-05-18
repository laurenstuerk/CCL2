import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/userApi.js';

export default function RegisterPage() {
  const [userData, setUserData] = useState({
    name: '',
    surname: '',
    username: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await register(userData); // No token needed for registration
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4 py-12 text-white">
      <div className="w-full max-w-md">
        <h1 className="text-2xl md:text-3xl font-semibold text-center mb-8">Register</h1>

        <form onSubmit={handleRegister} className="space-y-6 bg-neutral-900 p-8 border border-neutral-800">
          {['name', 'surname', 'username', 'email', 'password'].map((field) => (
            <div className="flex flex-col" key={field}>
              <label htmlFor={field} className="text-sm text-gray-400 mb-1 capitalize">{field}</label>
              <input
                id={field}
                type={field === 'password' ? 'password' : 'text'}
                value={userData[field]}
                onChange={(e) => setUserData({ ...userData, [field]: e.target.value })}
                required
                className="bg-neutral-800 text-white border border-neutral-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
          ))}

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 font-semibold transition"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}
