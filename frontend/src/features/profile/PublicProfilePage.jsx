// frontend/src/features/profile/PublicProfilePage.jsx (Final Version)

import { useQuery } from "@tanstack/react-query";
import { getPublicUserByUsername } from "../../services/userApi";
import ErrorPage from "../../pages/shared/ErrorPage";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Linkedin, Github, Twitter, Trophy, BarChart, User as UserIcon, Shield, Calendar, Sticker, Instagram } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Skeleton for a better loading experience
function ProfileSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8 pt-40 animate-pulse">
      <div className="flex items-center gap-6 mb-10">
        <div className="w-28 h-28 rounded-full bg-neutral-800"></div>
        <div className="space-y-3">
          <div className="h-8 w-48 bg-neutral-800 rounded"></div>
          <div className="h-4 w-32 bg-neutral-800 rounded"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-neutral-800 rounded"></div>
        <div className="h-4 w-3/4 bg-neutral-800 rounded"></div>
      </div>
    </div>
  );
}

  const getJoinDate = (joinDateString) => {
    const joinedDate = new Date(joinDateString);
    // security check: if the date is invalid, return a placeholder
    if (isNaN(joinedDate.getTime())) {
      return "Date not available";
    }

    // Format the date into the desired format (e.g. "June 2025")
    // 'en-US' is used to ensure English month names.
    const formattedDate = joinedDate.toLocaleDateString("en-US", {
      year: "numeric", // e.g. 2025
      month: "long", // e.g. June
    });

    return formattedDate;
  };

export default function PublicProfilePage({ username }) {
  // Fetch data with useQuery. The query key is dynamic.
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["publicProfile", username], // This key changes when the username prop changes
    queryFn: () => getPublicUserByUsername(username), // Pass the username to the fetch function
  });

  // Handle Loading State
  if (isLoading) {
    return <ProfileSkeleton />;
  }

  // Handle Error State
  if (isError) {
    return <ErrorPage errorCode={error.response?.status || "404"} errorMessage="Profile Not Found" errorDescription={error.response?.data?.message || `The user @${username} does not exist or has a private profile.`} />;
  }

  // Safely parse socials
  let userSocials = {};
  if (typeof user.socials === "string") {
    try {
      userSocials = JSON.parse(user.socials);
    } catch (e) {
    }
  } else if (user.socials) {
    userSocials = user.socials;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 pt-40 h-screen text-white">
      <Helmet>
        <title>{user.username} - Ripground</title>
        <meta name="description" content={`Profile of ${user.name} ${user.surname} on Ripground.`} />
      </Helmet>
      <div className="flex items-center gap-6 mb-10">
        <Avatar className="w-32 h-32 border-4 border-neutral-700">
          <AvatarImage src={user.profilePicture} alt={`${user.username}'s profile`} />
          <AvatarFallback className="text-4xl bg-neutral-800">
            {user.name?.[0]}
            {user.surname?.[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">
            {user.name} {user.surname}
          </h1>
          <p className="text-neutral-400 text-lg">@{user.username}</p>
          <p className="text-sm text-neutral-500 mt-1">{getJoinDate(user.created_at)}</p>
        </div>
      </div>

      {user.info && (
        <div className="mb-8 p-4 bg-neutral-900 border border-neutral-800 rounded-lg">
          <h3 className="text-sm font-semibold text-neutral-400 uppercase mb-2">Bio</h3>
          <p className="text-lg text-neutral-200 whitespace-pre-wrap">{user.info}</p>
        </div>
      )}

      {(userSocials.github || userSocials.twitter || userSocials.instagram) && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-neutral-400 uppercase mb-3">Socials</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-wrap items-center gap-6">
              {userSocials.instagram && (
                <a href={`https://instagram.com/${userSocials.instagram}`} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <Instagram size={20} /> Instagram
                </a>
              )}
              {userSocials.github && (
                <a href={`https://github.com/${userSocials.github}`} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <Github size={20} /> GitHub
                </a>
              )}
              {userSocials.twitter && (
                <a href={`https://twitter.com/${userSocials.twitter}`} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <Twitter size={20} /> Twitter
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
