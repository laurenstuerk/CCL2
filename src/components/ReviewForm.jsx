import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postReview } from '../services/gameApi';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';

export default function ReviewForm({ gameSlug }) {
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const mutation = useMutation({
    mutationFn: postReview,
    onSuccess: () => {
      // Wenn die Review erfolgreich war, sage TanStack Query,
      // dass die Daten für dieses Spiel veraltet sind.
      // Das löst automatisch einen Refetch in der GameDetailPage aus!
      queryClient.invalidateQueries(['game', gameSlug]);
      // Formular zurücksetzen
      setRating(0);
      setText('');
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === '' || rating === 0) {
      alert('Please provide a rating and a comment.');
      return;
    }
    mutation.mutate({ slug: gameSlug, rating, text });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-neutral-900 p-4 rounded-lg mt-6 border border-neutral-800">
      <h4 className="font-bold mb-2">Write your own review</h4>
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <button
              type="button"
              key={starValue}
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHoverRating(starValue)}
              onMouseLeave={() => setHoverRating(0)}
              className="cursor-pointer bg-transparent border-none"
            >
              <Star
                className={`w-6 h-6 transition-colors ${
                  starValue <= (hoverRating || rating) ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-600'
                }`}
              />
            </button>
          );
        })}
      </div>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Share your thoughts about the game..."
        className="bg-gray-800 border-gray-700 text-white"
        rows={4}
      />
      <Button type="submit" className="mt-4 w-full" disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Submitting...' : 'Submit Review'}
      </Button>
    </form>
  );
}