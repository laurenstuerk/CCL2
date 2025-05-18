import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserByUsername } from '../../services/userApi';
import { getUsernameFromToken } from '../../utils/auth';
import ProfileLayout from '../../components/ProfileLayout';
import ErrorMessage from '../../components/ErrorMessage';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function PublicProfilePage() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const loggedInUsername = getUsernameFromToken();

      setIsOwnProfile(username === loggedInUsername);
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

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!user) return null;

  return <ProfileLayout user={user} showEdit={isOwnProfile} />;
}
