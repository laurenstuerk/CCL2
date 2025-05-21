// src/features/profile/PublicProfilePage.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function PublicProfilePage({ username }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(`/api/users/username/${username}`);
        setUser(res.data);
        console.log("API response:", res.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        console.log(user);
        setLoading(false);
      }
    }

    fetchUser();
  }, [username]);

  if (loading) return <p className="text-neutral-400">Loading profile...</p>;
  if (!user) return <p className="text-red-500">User not found.</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 pt-16">
      <div className="flex items-center gap-6 mb-10">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border border-neutral-700"
        />
        <div>
          <h2 className="text-2xl font-bold">
            {user.name} {user.surname}
          </h2>
          <p className="text-neutral-400 text-sm">@{user.username}</p>
          <p className="text-sm text-neutral-400 mt-1">
            Rank: {user.rank || "Iron"}
          </p>
        </div>
      </div>

      {user.info && (
        <div className="mb-6">
          <h3 className="text-sm text-neutral-400 uppercase mb-1">Bio</h3>
          <p className="text-lg text-neutral-300">{user.info}</p>
        </div>
      )}

      {user.socials && (
        <div className="mb-6">
          <h3 className="text-sm text-neutral-400 uppercase mb-2">
            Social Media
          </h3>
          <ul className="flex gap-4 text-blue-400">
            {user.socials.twitter && (
              <li>
                <a
                  href={user.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
            )}
            {user.socials.linkedin && (
              <li>
                <a
                  href={user.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
            )}
            {user.socials.github && (
              <li>
                <a
                  href={user.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
            )}
          </ul>
        </div>
      )}

      {user.achievements && user.achievements.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm text-neutral-400 uppercase mb-2">
            Achievements
          </h3>
          <ul className="list-disc list-inside space-y-1 text-neutral-300">
            {user.achievements.map((ach, i) => (
              <li key={i}>{ach}</li>
            ))}
          </ul>
        </div>
      )}

      {user.stats && (
        <div>
          <h3 className="text-sm text-neutral-400 uppercase mb-2">
            Stats & Highscores
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-neutral-300">
            <div>
              <span className="block text-xs uppercase text-neutral-500">
                Games Played
              </span>
              <span className="text-lg font-medium">
                {user.stats.gamesPlayed}
              </span>
            </div>
            <div>
              <span className="block text-xs uppercase text-neutral-500">
                Highest Score
              </span>
              <span className="text-lg font-medium">
                {user.stats.highScore}
              </span>
            </div>
            <div>
              <span className="block text-xs uppercase text-neutral-500">
                Accuracy
              </span>
              <span className="text-lg font-medium">
                {user.stats.accuracy}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
