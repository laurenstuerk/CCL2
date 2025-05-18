import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUsernameFromToken } from '../utils/auth.js';

export default function UserProfilePage() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const loggedInUsername = getUsernameFromToken();

      setIsOwnProfile(username === loggedInUsername);

      try {
        const res = await fetch(`/api/users/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('User not found');
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUser();
  }, [username]);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold">{user.name} {user.surname}</h1>
      <p className="text-gray-400">@{user.username}</p>
      <p className="mt-4">{user.info}</p>
      {user.hero && <img src={user.hero} alt="Hero" className="mt-4 w-full max-w-md" />}

      {isOwnProfile && (
        <button className="mt-6 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded">
          Edit Profile
        </button>
      )}
    </div>
  );
}
