import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useQuery } from '@tanstack/react-query';
import { getMe } from '../../services/userApi';
import { Button } from '@/components/ui/button';
import { LogOut, User, Edit, Shield, Palette } from 'lucide-react';
import ErrorPage from '@/pages/shared/ErrorPage';
import { Helmet } from 'react-helmet-async';

// Importiere deine Tab-Komponenten
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import Security from './components/Security';

// define the tabs as a constant array
const TABS = [
  {
    name: 'Profile',
    icon: User,
  },
  {
    name: 'Edit Profile',
    icon: Edit,
  },
  {
    name: 'Security',
    icon: Shield,
  }
];

export default function OwnProfilePage() {
  const { user, logout, setUser } = useAuth();
  const [activeTab, setActiveTab] = useState('Profile'); // state to manage the active tab
  console.log(activeTab);

  const {
    data: profileData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['userProfile', user?.username],
    queryFn: () => getMe(user.username),
    initialData: user,
    enabled: !!user?.username,
    onSuccess: (freshData) => {
      // Wichtig: Aktualisiere den globalen User-State, damit die Navbar etc. aktuell bleibt
      setUser(freshData);
    },
  });

  if (isLoading && !profileData) {
    // Zeige Loading nur an, wenn wir keine Initialdaten haben
    return <div className="text-center h-screen bg-black text-white pt-40">Loading Profile...</div>;
  }

  if (isError) {
    const errorCode = error.response?.status || '500';
    const errorMessage = error.response?.data?.message || 'Server Error';
    const errorDescription = `We couldn't load your profile data. Please try refreshing the page or contact support if the problem persists.`;
    
    return (
      <ErrorPage 
        errorCode={errorCode} 
        errorMessage={errorMessage}
        errorDescription={errorDescription}
      />
    );
  }

  // Dieser Fall sollte durch den ProtectedRoute eigentlich nie eintreten, ist aber eine gute Absicherung
  if (!profileData) {
    return <div className="text-center text-white pt-40">Benutzer nicht gefunden.</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <Helmet>
        <title>{profileData.username}'s Profile - Ripground</title>
        <meta name="description" content="Manage your profile, edit settings, and update security options." />
      </Helmet>
      <div className="max-w-screen-lg mx-auto px-4 md:px-8">
        {/* === TAB-NAVIGATION === */}
        <div className="border-b border-gray-800 mb-8">
          <nav className="flex items-center gap-4 -mb-px">
            {TABS.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center gap-2 px-3 py-4 text-base font-medium transition-colors ${
                  activeTab === tab.name
                    ? 'border-b-2 border-white text-white'
                    : 'text-grey-400 hover:text-white'
                }`}
              >
                {/* 3. Rendere das Icon und den Namen des Tabs */}
                <tab.icon className="w-5 h-5" />
                <span className="hidden md:inline">{tab.name}</span>
              </button>
            ))}
            <div className="md:ml-auto">
              <Button onClick={logout} variant="destructive" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </nav>
        </div>

        {/* === TAB-INHALT === */}
        <main>
          {/* 3. Wir verwenden 'profileData' für die Übergabe an die Kind-Komponenten */}
          {activeTab === 'Profile' && <Profile user={profileData} isLoading={isLoading} />}
          {activeTab === 'Edit Profile' && <EditProfile user={profileData} />}
          {activeTab === 'Security' && <Security />}
        </main>
      </div>
    </div>
  );
}
