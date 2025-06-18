// src/components/PlayerCube.jsx
import React from 'react';

export default function PlayerCube({ position = [0, 0.5, 0] }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}
