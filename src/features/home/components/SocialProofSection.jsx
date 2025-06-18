// src/features/home/components/SocialProofSection.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, MessageSquare } from 'lucide-react';

// --- Dummy Data for Reviews ---
// This would be replaced by an API call in a real application.
const reviews = [
  {
    id: 1,
    username: "SpeedRunner_Pro",
    avatar: "https://images.pexels.com/photos/32551228/pexels-photo-32551228.jpeg",
    rating: 5,
    title: "Absolutely Addictive!",
    comment: "The physics in Marble Rush 3D are incredible. I haven't been this hooked on a browser game in years. The monthly leaderboard reset keeps me coming back for more."
  },
  {
    id: 2,
    username: "PixelArtFan",
    avatar: "https://images.pexels.com/photos/2078467/pexels-photo-2078467.jpeg",
    rating: 5,
    title: "A True Hidden Gem",
    comment: "Ripground is what browser gaming should be. No downloads, no nonsense, just pure fun. The platform is clean, fast, and the games are top-notch."
  },
  {
    id: 3,
    username: "CasualGamer_92",
    avatar: "https://images.pexels.com/photos/633432/pexels-photo-633432.jpeg",
    rating: 4,
    title: "Great for a quick session",
    comment: "Love that I can just hop on and play a few rounds without any commitment. It's the perfect way to unwind. Looking forward to seeing more games on the platform!"
  }
];

// --- Sub-components for the new design ---

// Star Rating Display Component
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-700'}`}
        />
      ))}
    </div>
  );
}

// Review Card Component
function ReviewCard({ review }) {
  return (
    <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 h-full flex flex-col">
      <div className="flex-grow">
        <StarRating rating={review.rating} />
        <h3 className="text-xl font-bold text-white mt-4">{review.title}</h3>
        <p className="mt-2 text-neutral-400 leading-relaxed">"{review.comment}"</p>
      </div>
      <div className="flex items-center mt-6 pt-4 border-t border-neutral-800">
        <img 
          src={review.avatar}
          alt={`${review.username}'s avatar`}
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="ml-3 font-semibold text-neutral-200">{review.username}</span>
      </div>
    </div>
  );
}


export default function SocialProofSection() {
  return (
    <section 
      className="bg-black py-20 md:py-28"
      role="region" 
      aria-labelledby="social-proof-heading"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <MessageSquare className="mx-auto h-10 w-10 text-blue-400 mb-4" />
          <h2 id="social-proof-heading" className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
            From Our Community
          </h2>
          <p className="mt-4 text-lg text-neutral-400">
            See what players are saying about their experience on the Ripground platform.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
