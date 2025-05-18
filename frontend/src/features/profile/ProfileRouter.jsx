import { useParams } from 'react-router-dom';
import { getUsernameFromToken } from '../../utils/auth';
import OwnProfilePage from './OwnProfilePage';
import PublicProfilePage from './PublicProfilePage';

export default function ProfileRouter() {
  const { username } = useParams();
  const loggedInUsername = getUsernameFromToken();

  const isOwnProfile = username === loggedInUsername;

  return isOwnProfile ? <OwnProfilePage /> : <PublicProfilePage username={username} />;
}
