// features/profile/OwnProfilePage.jsx
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserByUsername } from '../../services/userApi';
import { getUsernameFromToken } from '../../utils/auth';
import ProfileLayout from '../../components/ProfileLayout';


export default function OwnProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const username = getUsernameFromToken();

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
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!user) return null;

  return (
    <ProfileLayout
      user={user}
      showEdit
      onEdit={() => navigate(`/edit-profile/${user.username}`)}
    />
  );
}
