// frontend/src/pages/user/dashboard/components/GameLibrary.jsx

import GameCard from "./GameCard"; // Import our new GameCard component

export default function GameLibrary({ games }) {
  return (
    <div className="container mx-auto px-6 py-20">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold mb-2">Game Library</h2>
        <p className="text-neutral-400">Discover more amazing games in our collection</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}