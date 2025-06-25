import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getGameBySlug, deleteReview } from "../../services/gameApi";
import { useAuth } from "../../context/AuthContext.jsx";
import ReactPlayer from "react-player/lazy";
import ReviewForm from "../../components/ReviewForm";
import ErrorPage from "@/pages/shared/ErrorPage";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";

// UI & Icon Imports
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, User, Trash2, CheckCircle2, XCircle, PlayCircle, X as CloseIcon, ChevronLeft, ChevronRight } from "lucide-react";

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
    const queryClient = useQueryClient();

    const [activeMediaUrl, setActiveMediaUrl] = useState("");
    const [lightboxImageUrl, setLightboxImageUrl] = useState(null);

    const queryKey = ["game", slug];

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
    
    const deleteReviewMutation = useMutation({
        mutationFn: deleteReview,
        onMutate: async (reviewIdToDelete) => {
            await queryClient.cancelQueries({ queryKey: queryKey });
            const previousGameData = queryClient.getQueryData(queryKey);
            queryClient.setQueryData(queryKey, (oldData) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    reviews: oldData.reviews.filter((review) => review.id !== reviewIdToDelete),
                };
            });
            return { previousGameData };
        },
        onError: (err, variables, context) => {
            if (context?.previousGameData) {
                queryClient.setQueryData(queryKey, context.previousGameData);
            }
            toast.error("Failed to delete review", {
                description: err.response?.data?.message || "Please try again later.",
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: queryKey });
        },
        onSuccess: () => {
            toast.success("Your review has been deleted.");
        },
    });

    useEffect(() => {
        if (game?.mainImage) {
            setActiveMediaUrl(game.mainImage);
        }
    }, [game]);

    if (isLoading) return <GameDetailSkeleton />;
    if (isError) {
        const errorCode = error.response?.status || "404";
        const errorMessage = error.response?.data?.message || "Page Not Found";
        const errorDescription = `Sorry, we couldn't find the game you're looking for. Please check the URL or try again later.`;
        return <ErrorPage errorCode={errorCode} errorMessage={errorMessage} errorDescription={errorDescription} />;
    }

    // --- MODIFICATION 1: Create a unified array for all media ---
    // This includes the main image, thumbnails, and the video.
    // The .filter(Boolean) elegantly removes any null or undefined values.
    const allMedia = [
        game.mainImage,
        ...(game.thumbnailImages || []),
        game.videoUrl
    ].filter(Boolean);

    const isVideoActive = activeMediaUrl === game.videoUrl;
    const hasUserReviewed = game?.reviews?.some((review) => review.user_id === user?.id);
    const userReview = game?.reviews?.find((review) => review.user_id === user?.id);
    const otherReviews = game?.reviews?.filter((review) => review.user_id !== user?.id) || [];

    // --- MODIFICATION 2: Add navigation functions for the main media viewer ---
    const navigateMedia = (direction) => {
        const currentIndex = allMedia.findIndex(media => media === activeMediaUrl);
        // This calculates the next index, wrapping around if it reaches the end or beginning.
        const nextIndex = (currentIndex + direction + allMedia.length) % allMedia.length;
        setActiveMediaUrl(allMedia[nextIndex]);
    };
    
    const allImages = [game.mainImage, ...(game.thumbnailImages || [])].filter(Boolean);

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
        <div className="min-h-screen bg-black text-white p-4 md:p-12 pt-24 mt-16 md:mt-20">
            <Helmet>
                <title>{game.title} - Ripground</title>
                <meta name="description" content={game.description} />
            </Helmet>
            <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl font-bold mb-2">{game.title}</h1>
                <div className="flex items-center gap-4 mb-6">
                    {renderStars(game.rating)}
                    <div className="bg-neutral-800 px-3 py-1 rounded-md text-sm">{game.tag}</div>
                </div>

                <div className="grid lg:grid-cols-[1fr_400px] gap-8">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            {/* --- MODIFICATION 3: Main Media Viewer with Navigation Arrows --- */}
                            <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden group">
                                {/* Media content with transition effect */}
                                <div key={activeMediaUrl} className="w-full h-full animate-fade-in">
                                    {isVideoActive ? (
                                        <ReactPlayer url={activeMediaUrl} playing={true} controls={true} width="100%" height="100%" />
                                    ) : (
                                        <img src={activeMediaUrl} alt={`${game.title} main view`} className="object-cover w-full h-full cursor-pointer" onClick={() => setLightboxImageUrl(activeMediaUrl)} />
                                    )}
                                </div>

                                {/* Navigation Arrows - visible on hover within the 'group' */}
                                {allMedia.length > 1 && (
                                    <>
                                        <button onClick={() => navigateMedia(-1)} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/20 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/50 focus:opacity-100">
                                            <ChevronLeft size={32} />
                                        </button>
                                        <button onClick={() => navigateMedia(1)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/20 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/50 focus:opacity-100">
                                            <ChevronRight size={32} />
                                        </button>
                                    </>
                                )}
                            </div>

                            <div className="flex justify-center gap-2 overflow-x-auto p-2">
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
                            {user ? (
                                userReview ? (
                                    <div className="bg-neutral-900 border border-sky-400 p-4 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="font-semibold text-white">Your Review</p>
                                            <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-900/50 hover:text-red-400" onClick={() => deleteReviewMutation.mutate(userReview.id)} disabled={deleteReviewMutation.isLoading}>
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                {deleteReviewMutation.isLoading ? "Deleting..." : "Delete"}
                                            </Button>
                                        </div>
                                        <div className="flex items-center mb-2">{renderStars(userReview.rating)}</div>
                                        <p className="text-neutral-300">{userReview.text}</p>
                                    </div>
                                ) : (
                                    <ReviewForm gameSlug={slug} />
                                )
                            ) : (
                                <div className="bg-neutral-900 p-4 rounded-lg text-center text-neutral-400">
                                    <Link to="/login" className="text-blue-400 hover:underline">
                                        Log in
                                    </Link>{" "}
                                    to leave a review.
                                </div>
                            )}

                            {otherReviews.length > 0
                                ? otherReviews.map((review) => (
                                      <div key={review.id} className="bg-neutral-900 p-4 rounded-lg">
                                          <div className="flex items-center justify-between mb-2">
                                              <div className="flex items-center gap-2">
                                                  <User className="w-5 h-5 text-neutral-400" />
                                                  <span className="font-medium">{review.username}</span>
                                                  {renderStars(review.rating)}
                                              </div>
                                              <span className="text-sm text-gray-400">{new Date(review.date).toLocaleDateString()}</span>
                                          </div>
                                          <p className="text-gray-300">{review.text}</p>
                                      </div>
                                  ))
                                : // Only show this if there are no reviews at all (including the user's)
                                !userReview && <p className="text-neutral-500 italic">No reviews available for this game yet.</p>}
                        </div>
                    </div>

                    <aside className="space-y-6">
                        <img src={game.logo} alt={`${game.title} Logo`} className="w-full aspect-16/9 object-cover max-w-xs mx-auto bg-black" />
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