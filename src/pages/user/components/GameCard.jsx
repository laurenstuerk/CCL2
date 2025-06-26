// frontend/src/pages/user/dashboard/components/GameCard.jsx

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Info, Star } from "lucide-react";

// It's good practice to keep this sub-component with the card that uses it.
function StarRating({ rating }) {
    const numericRating = parseFloat(rating) || 0;
    return (
        <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    aria-hidden="true"
                    className={`h-4 w-4 ${i < Math.floor(numericRating) ? "fill-yellow-400 text-yellow-400" : i < numericRating ? "fill-yellow-400/50 text-yellow-400" : "text-neutral-600"}`}
                />
            ))}
            <span className="ml-2 text-sm text-neutral-300 sr-only">{numericRating.toFixed(1)} out of 5 stars</span>
        </div>
    );
}

export default function GameCard({ game }) {
  return (
    <Card key={game.id} className="p-0 bg-neutral-900 border-neutral-800 hover:border-neutral-700 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2 flex flex-col">
      <CardHeader className="p-0">
        <div className="aspect-video w-full rounded-t-lg overflow-hidden bg-neutral-800">
          <img
            src={game.thumbnail_images?.[0] || game.main_image_url}
            alt={game.title}
            className="w-full h-full object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex flex-col flex-grow">
        <CardTitle className="text-xl font-semibold text-white mb-2 line-clamp-1">{game.title}</CardTitle>
        <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30 mb-3 w-fit">{game.genre}</Badge>
        <StarRating rating={game.rating} />
        <CardDescription className="text-neutral-400 my-4 text-sm leading-relaxed line-clamp-3 flex-grow">{game.description}</CardDescription>
        <div className="flex gap-2 mt-auto pt-4 border-t border-neutral-800">
          <Link to={game.play_url || "#"} className="flex-1">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm" size="sm"><Play className="w-3 h-3 mr-1" /> Play</Button>
          </Link>
          <Link to={`/games/${game.slug}`} className="flex-1">
            <Button variant="outline" className="w-full border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white text-sm" size="sm"><Info className="w-3 h-3 mr-1" /> Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}