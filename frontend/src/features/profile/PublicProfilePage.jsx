// features/profile/PublicProfilePage.jsx
import { useEffect, useState } from 'react';
import { getUserByUsername } from '../../services/userApi';
import ProfileLayout from '../../components/ProfileLayout';

export default function PublicProfilePage({ username }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');

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

  if (isLoading) return "laoding";
  // if (error) return <ErrorMessage error={error} />;
  if (!user) return null;

  return <ProfileLayout user={user} />;
}
