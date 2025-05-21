import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserByUsername } from '../../services/userApi';
import { getUsernameFromToken } from '../../utils/auth';

import Overview from './components/Overview';
import EditProfile from './components/EditProfile';
import Security from './components/Security';
import Theme from './components/Theme';

const MAIN_TABS = ['Overview'];
const SETTINGS_TABS = ['Edit Profile', 'Security', 'Theme'];

export default function OwnProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');
  const [activeSettingsTab, setActiveSettingsTab] = useState('Edit Profile');

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const username = getUsernameFromToken();

      try {
        const data = await getUserByUsername(token, username);
        setUser(data);
      } catch (err) {
        localStorage.removeItem('token');
      navigate('/login', { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleDeleteAccount = () => {
    console.log('Account deletion initiated');
    alert('Account deletion not yet implemented.');
  };

  if (!user || isLoading) return null;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex pt-16">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-900 p-6 border-r border-neutral-800 flex flex-col justify-between">
        <div>
          <div className="flex flex-col items-center mb-10">
            <div className="w-24 h-24 rounded-full bg-neutral-700 flex items-center justify-center text-4xl mb-4">
              <img src="{user.profilePicture}" alt="" />
            </div>
            <h2 className="text-xl font-semibold">{user.name} {user.surname}</h2>
            <p className="text-neutral-400">@{user.username}</p>
            <p className="text-sm mt-2 text-amber-400">{user.rank}</p>
          </div>

          <nav className="flex flex-col gap-2">
            {MAIN_TABS.map((tab) => (
              <button
                key={tab}
                className={`text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:bg-neutral-800'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}

            <div className="mt-6 mb-2 px-4 text-sm text-neutral-500 uppercase tracking-wider">Settings</div>

            {SETTINGS_TABS.map((tab) => (
              <button
                key={tab}
                className={`text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:bg-neutral-800'
                }`}
                onClick={() => {
                  setActiveTab(tab);
                  setActiveSettingsTab(tab);
                }}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-10 text-left px-4 py-2 rounded-lg transition-colors bg-red-600 hover:bg-red-700 text-white"
        >
          🚪 Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {activeTab === 'Overview' && <Overview user={user} />}
        {activeSettingsTab === 'Edit Profile' && activeTab === 'Edit Profile' && <EditProfile user={user} />}
        {activeSettingsTab === 'Security' && activeTab === 'Security' && <Security />}
        {activeSettingsTab === 'Theme' && activeTab === 'Theme' && <Theme />}

        {/* Danger Zone only for settings pages */}
        {SETTINGS_TABS.includes(activeTab) && (
          <div className="mt-10">
            <h2 className="text-lg font-semibold mb-4 text-red-500">Danger Zone</h2>
            <button
              onClick={handleDeleteAccount}
              className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg"
            >
              🗑️ Delete Account
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
