import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Linkedin, Github, Twitter, Trophy, BarChart, User as UserIcon, Shield, Calendar, Sticker, Instagram } from "lucide-react";
import StatsAndAchievements from "./StatsAndAchievements";

const InfoSection = ({ title, icon: Icon, children }) => (
  <div className="py-8">
    <div className="flex items-center gap-3 mb-4">
      <Icon className="w-5 h-5 text-gray-400" />
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">{title}</h3>
    </div>
    <div className="text-lg text-gray-100">{children}</div>
  </div>
);

// placeholder for empty sections
const Placeholder = ({ text = "No information provided yet." }) => <p className="text-gray-500 italic text-base">{text}</p>;

// Skeleton for loading state
const OverviewSkeleton = () => (
  <div className="full">
    <div className="flex items-center gap-6 py-6">
      <Skeleton className="h-24 w-24 rounded-full bg-gray-800" />
      <div className="space-y-2">
        <Skeleton className="h-8 w-48 bg-gray-800" />
        <Skeleton className="h-5 w-32 bg-gray-800" />
      </div>
    </div>
    <Separator className="bg-gray-800" />
    <div className="py-8">
      <Skeleton className="h-16 w-full bg-gray-800" />
    </div>
    <Separator className="bg-gray-800" />
    <div className="py-8">
      <Skeleton className="h-12 w-full bg-gray-800" />
    </div>
  </div>
);

// Overview component
export default function Overview({ user, isLoading }) {
  if (isLoading) {
    return <OverviewSkeleton />;
  }
  if (!user) {
    return (
      <div className="py-8">
        <Placeholder text="User data could not be loaded." />
      </div>
    );
  }
  // Helper variables
  const hasSocials = user.socials && Object.values(user.socials).some((link) => link);

  const getJoinDate = (joinDateString) => {
    const joinedDate = new Date(joinDateString);

    // security check: if the date is invalid, return a placeholder
    if (isNaN(joinedDate.getTime())) {
      return "Join date not available";
    }

    // Format the date into the desired format (e.g. "June 2025")
    // 'en-US' is used to ensure English month names.
    const formattedDate = joinedDate.toLocaleDateString("en-US", {
      year: "numeric", // e.g. 2025
      month: "long", // e.g. June
    });

    return formattedDate;
  };

  return (
    <div>
      <div className="flex flex-row gap-12">
        <div className="w-1/2">
          <div className="flex flex-col sm:flex-row items-center gap-6 py-6">
            <Avatar className="w-24 h-24 text-3xl border-2 border-gray-700">
              <AvatarImage src={user.profilePicture} alt={`${user.username}'s profile picture`} />
              <AvatarFallback className="bg-gray-800">
                {user.name?.[0]}
                {user.surname?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <h2 className="text-3xl font-bold">
                {user.name} {user.surname}
              </h2>
              <p className="text-lg text-gray-400">@{user.username}</p>
              <p className="text-lg text-gray-400">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-400 mb-6 ">
            <p>
              League: <span className="text-white">{user.league}</span>
            </p>
            <p>
              XP: <span className="text-white">{user.xp}</span>
            </p>
            <p>
              Member Since: <span className="text-white">{getJoinDate(user.created_at)}</span>
            </p>
          </div>
        </div>

        {/* === BIO / ABOUT ME SEKTION === */}
        <div className="w-1/2 ">
          <InfoSection title="About Me" icon={UserIcon}>
            {user.info ? <p className="text-base text-gray-300 whitespace-pre-wrap">{user.info}</p> : <Placeholder />}
          </InfoSection>
        </div>
      </div>

      <div className="divide-y divide-gray-800">
        {/* === SOCIALS SEKTION === */}
        <InfoSection title="Socials" icon={Sticker}>
          {hasSocials ? (
            <div className="flex flex-wrap items-center gap-6">
              {user.socials.instagram && (
                <a href={`https://instagram.com/${user.socials.instagram}`} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <Instagram size={20} /> Instagram
                </a>
              )}
              {user.socials.github && (
                <a href={`https://github.com/${user.socials.github}`} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <Github size={20} /> GitHub
                </a>
              )}
              {user.socials.twitter && (
                <a href={`https://twitter.com/${user.socials.twitter}`} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <Twitter size={20} /> Twitter
                </a>
              )}
            </div>
          ) : (
            <Placeholder />
          )}
        </InfoSection>

        <StatsAndAchievements userProfile={user} />
      </div>
    </div>
  );
}
