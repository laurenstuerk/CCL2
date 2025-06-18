// profile/ProfileRouter.jsx
import { useParams } from 'react-router-dom';
import OwnProfilePage from './OwnProfilePage';
import PublicProfilePage from './PublicProfilePage';
import { useAuth } from "../../context/AuthContext.jsx"; // Sauberer Import

export default function ProfileRouter() {
  const { username } = useParams();
  const { user } = useAuth();
  const loggedInUsername = user?.username;

  const isOwnProfile = username === loggedInUsername;

  return isOwnProfile ? <OwnProfilePage /> : <PublicProfilePage username={username} />;
}
