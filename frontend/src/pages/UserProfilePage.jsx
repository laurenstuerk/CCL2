import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUsernameFromToken } from '../utils/auth.js';
import { getUserByUsername } from '../services/userApi.js';

export default function UserProfilePage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const loggedInUsername = getUsernameFromToken();

      setIsOwnProfile(username === loggedInUsername);
      setIsLoading(true);
      setError('');

      try {
        const data = await getUserByUsername(token, username);
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  const handleEditProfile = () => {
    navigate(`/edit-profile/${username}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl mb-4">{error}</div>
        <button 
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
        >
          Return Home
        </button>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">{user.name} {user.surname}</h1>
            <p className="text-gray-400">@{user.username}</p>
          </div>
          {isOwnProfile && (
            <button 
              onClick={handleEditProfile}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>

        {user.info && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-white mb-2">About</h2>
            <p className="text-gray-300">{user.info}</p>
          </div>
        )}

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-white mb-2">Contact</h2>
          <p className="text-gray-300">{user.email}</p>
        </div>
      </div>
    </div>
  );
}
