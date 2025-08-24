// src/hooks/usePlayerControls.js
import { useEffect, useState } from 'react';

export default function usePlayerControls() {
  const [movement, setMovement] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const handleKeyDown = (e) => {
      setMovement((prev) => {
        const newMove = { ...prev };
        if (e.key === 'w') newMove.z = -1;
        if (e.key === 's') newMove.z = 1;
        if (e.key === 'a') newMove.x = -1;
        if (e.key === 'd') newMove.x = 1;
        return newMove;
      });
    };

    const handleKeyUp = (e) => {
      setMovement((prev) => {
        const newMove = { ...prev };
        if (e.key === 'w' || e.key === 's') newMove.z = 0;
        if (e.key === 'a' || e.key === 'd') newMove.x = 0;
        return newMove;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return movement;
}
