// src/pages/games/MyGodotGamePage.jsx
import React from 'react';
import GodotGame from '@/components/GodotGame'; // Import the Godot component

export default function MyGodotGamePage() {
  return (
    <div className="w-full h-screen bg-black pt-16">
      {/* You can add titles or other UI elements here if you want */}
      <GodotGame />
    </div>
  );
}