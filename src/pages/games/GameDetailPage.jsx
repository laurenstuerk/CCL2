import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getGameBySlug } from "../../services/gameApi";
import { useAuth } from "../../context/AuthContext.jsx";
import ReactPlayer from "react-player/lazy";
import ReviewForm from "../../components/ReviewForm";
import ErrorPage from '@/pages/shared/ErrorPage';
import { Helmet } from 'react-helmet-async';

// UI & Icon Imports
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, User, CheckCircle2, XCircle, PlayCircle, X as CloseIcon, ChevronLeft, ChevronRight } from "lucide-react";

// Helper function to render star ratings
const renderStars = (rating) => {
  const ratingValue = parseFloat(rating);
  const fullStars = Math.floor(ratingValue);
  const hasHalfStar = ratingValue % 1 !== 0; // For potential future use

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      ))}
      {[...Array(5 - fullStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-600" />
      ))}
      <span className="ml-2 text-white font-bold">{ratingValue.toFixed(1)}</span>
    </div>
  );
};

// Skeleton Component for Loading State
const GameDetailSkeleton = () => (
  <div className="min-h-screen bg-black text-white p-6 md:p-12 pt-24">
    <div className="max-w-7xl mx-auto">
      <Skeleton className="h-12 w-3/5 mb-2" />
      <Skeleton className="h-7 w-2/5 mb-6" />
      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <Skeleton className="w-full aspect-video rounded-lg" />
            <div className="flex gap-2 py-2">
              <Skeleton className="w-24 h-16 rounded-lg" />
              <Skeleton className="w-24 h-16 rounded-lg" />
              <Skeleton className="w-24 h-16 rounded-lg" />
            </div>
          </div>
          <Skeleton className="h-24 w-full" />
        </div>
        <aside className="space-y-6">
          <Skeleton className="w-48 h-24 mx-auto" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-14 w-full" />
        </aside>
      </div>
    </div>
  </div>
);

export default function GameDetailPage() {
  const { slug } = useParams();
  const { user } = useAuth();
  const location = useLocation();

  // State for the main media viewer and the image lightbox
  const [activeMediaUrl, setActiveMediaUrl] = useState("");
  const [lightboxImageUrl, setLightboxImageUrl] = useState(null);

  const {
    data: game,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["game", slug],
    queryFn: () => getGameBySlug(slug),
    enabled: !!slug,
  });

  // Set the initial active media when the game data is loaded
  useEffect(() => {
    if (game?.mainImage) {
      setActiveMediaUrl(game.mainImage);
    }
  }, [game]);

  if (isLoading) return <GameDetailSkeleton />;
  if (isError) {
    const errorCode = error.response?.status || '404';
    const errorMessage = error.response?.data?.message || 'Page Not Found';
    const errorDescription = `Sorry, we couldn't find the game you're looking for. Please check the URL or try again later.`;
    return (
      <ErrorPage 
        errorCode={errorCode} 
        errorMessage={errorMessage}
        errorDescription={errorDescription}
      />
    );
  }


  const allImages = [game.mainImage, ...(game.thumbnailImages || [])].filter(Boolean);
  const isVideoActive = activeMediaUrl === game.videoUrl;
  const hasUserReviewed = game?.reviews?.some((review) => review.user_id === user?.id);

  // Handlers for lightbox navigation
  const handleNextImage = (e) => {
    e.stopPropagation();
    const currentIndex = allImages.findIndex((img) => img === lightboxImageUrl);
    const nextIndex = (currentIndex + 1) % allImages.length;
    setLightboxImageUrl(allImages[nextIndex]);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    const currentIndex = allImages.findIndex((img) => img === lightboxImageUrl);
    const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    setLightboxImageUrl(allImages[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 pt-24 mt-20">
    <Helmet>
      <title>{game.title} - Ripground</title>
      <meta name="description" content={game.description} />
    </Helmet>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-2">{game.title}</h1>
        <div className="flex items-center gap-4 mb-6">
          {renderStars(game.rating)}
          <div className="bg-gray-800 px-3 py-1 rounded-md text-sm">{game.tag}</div>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="space-y-4">
              {/* Main Media Viewer */}
              <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden group">{isVideoActive ? <ReactPlayer url={activeMediaUrl} playing={true} controls={true} width="100%" height="100%" /> : <img src={activeMediaUrl} alt={`${game.title} main view`} className="object-cover w-full h-full cursor-pointer" onClick={() => setLightboxImageUrl(activeMediaUrl)} />}</div>

              {/* Thumbnail Selector */}
              <div className="flex gap-2 overflow-x-auto py-2">
                {allImages.map((imgUrl, index) => (
                  <div key={index} onClick={() => setActiveMediaUrl(imgUrl)} className={`cursor-pointer flex-shrink-0 w-24 h-16 rounded-lg border-2 transition-all duration-200 ${activeMediaUrl === imgUrl ? "border-white scale-105" : "border-transparent opacity-60 hover:opacity-100"}`}>
                    <img src={imgUrl} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover rounded-md" />
                  </div>
                ))}
                {game.videoUrl && (
                  <div onClick={() => setActiveMediaUrl(game.videoUrl)} className={`cursor-pointer flex-shrink-0 w-24 h-16 rounded-lg border-2 transition-all duration-200 relative flex items-center justify-center bg-black ${isVideoActive ? "border-white scale-105" : "border-transparent opacity-60 hover:opacity-100"}`}>
                    <img src={game.mainImage} alt="Trailer thumbnail" className="w-full h-full object-cover rounded-md opacity-40" />
                    <PlayCircle className="w-10 h-10 text-white absolute" />
                  </div>
                )}
              </div>
            </div>

            <p className="text-lg leading-relaxed text-neutral-300">{game.description}</p>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Reviews</h3>
              {user && !hasUserReviewed && <ReviewForm gameSlug={slug} />}
              {user && hasUserReviewed && <div className="bg-gray-900 p-4 rounded-lg text-center text-neutral-400">You have already reviewed this game.</div>}

              {game.reviews && game.reviews.length > 0 ? (
                game.reviews.map((review) => (
                  <div key={review.id} className="bg-gray-900 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        <span className="font-medium">{review.username}</span>
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-gray-400">{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-300">{review.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-neutral-500 italic">No reviews available for this game yet.</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <aside className="space-y-6">
            <img src={game.logo} alt={`${game.title} Logo`} className="w-full aspect-16/9 max-w-xs mx-auto" />
            <div className="space-y-3 pt-4 pb-4 border-y border-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-400">Genre:</span> <span>{game.genre}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Developer:</span> <span>{game.developer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Release Date:</span> <span>{new Date(game.releaseDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="space-y-3 pt-4 pb-4 border-b border-gray-700">
              <h4 className="font-bold text-lg">Features</h4>
              {game.features?.map((feature, index) => (
                <div key={index} className="flex justify-between items-center text-neutral-300">
                  <span>{feature.name}</span>
                  {feature.supported ? <CheckCircle2 className="text-green-500" size={20} /> : <XCircle className="text-red-500" size={20} />}
                </div>
              ))}
            </div>
            <div className="pt-4">
              {user ? (
                <Button asChild size="lg" className="w-full text-lg h-14 bg-green-600 hover:bg-green-700">
                  <Link to={game.playUrl}>Play Now</Link>
                </Button>
              ) : (
                <Button asChild size="lg" className="w-full text-lg h-14 bg-neutral-950 hover:bg-neutral-800">
                  <Link to="/login" state={{ from: location }}>
                    Login to Play
                  </Link>
                </Button>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Image Lightbox Modal with Navigation */}
      {lightboxImageUrl && (
        <div onClick={() => setLightboxImageUrl(null)} className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <button onClick={handlePrevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 p-2 rounded-full text-white hover:bg-white/20 transition-colors z-10">
            <ChevronLeft size={32} />
          </button>
          <img src={lightboxImageUrl} alt="Enlarged view" className="max-w-[90vw] max-h-[90vh] object-contain" />
          <button onClick={handleNextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 p-2 rounded-full text-white hover:bg-white/20 transition-colors z-10">
            <ChevronRight size={32} />
          </button>
          <button onClick={() => setLightboxImageUrl(null)} className="absolute top-4 right-4 bg-white/10 p-2 rounded-full text-white hover:bg-white/20 transition-colors" aria-label="Close image view">
            <CloseIcon size={24} />
          </button>
        </div>
      )}
    </div>
  );
}
