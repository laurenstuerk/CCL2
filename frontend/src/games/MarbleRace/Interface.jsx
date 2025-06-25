import { useKeyboardControls } from "@react-three/drei";
import useGame from "./stores/useGame.jsx";
import { addEffect } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { submitGameResult } from "../../services/gameplayApi.js";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

const calculateXpFromTime = (timeInSeconds) => {
  if (timeInSeconds < 5000) {
    return 5; // 5 XP for the fastest times
  }
  if (timeInSeconds < 6000) {
    return 2; // 2 XP for fast times
  }
  if (timeInSeconds < 7000) {
    return 1; // 1 XP for finishing
  }
  return 0; // 0 XP if it takes too long
};

export default function Interface() {
  const time = useRef();
  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);

  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);
  const restartBtn = useKeyboardControls((state) => state.restart);

  const submittedRef = useRef(false);

  const { mutate: submitResultMutation } = useMutation({
    mutationFn: submitGameResult, // The function from our API service
    onSuccess: () => {
      toast.success("Result submitted successfully!");
      // You could potentially invalidate a 'leaderboard' query here in the future
    },
    onError: (error) => {
      // toast.error(error.message || "Failed to submit result.");
    },
  });

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();
      let elapsedTime = 0;

      if (state.phase === "playing") {
        elapsedTime = Date.now() - state.startTime;
      } else if (state.phase === "ended") {
        elapsedTime = state.endTime - state.startTime;

        const xpGained = calculateXpFromTime(elapsedTime);

        // Only submit once
        if (!submittedRef.current) {
          submittedRef.current = true;
          // Call the mutation with the correct payload
          submitResultMutation({
            gameSlug: "marble-rush-3d",
            time: elapsedTime, // Send the precise time in milliseconds
            xp: xpGained, // Send the player's XP
          });
        }
      }

      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);
      if (time.current) time.current.textContent = elapsedTime;
    });

    return () => unsubscribeEffect();
  }, []);

  useEffect(() => {
    if (phase === "playing") {
      submittedRef.current = false;
    }
  }, [phase]);

  return (
    <div className="interface">
      <div ref={time} className="time">
        0.00
      </div>

      {phase === "ended" && (
        <div className="restart" onClick={restart}>
          Restart
        </div>
      )}

      <div className="interface">
        {/* ... */}

        {/* Controls */}
        <div className="controls">
          <div className="raw">
            <div className={`key ${forward ? "active" : ""}`}></div>
            <div className={`key ${restartBtn ? "active" : ""}`}>R</div>
          </div>
          <div className="raw">
            <div className={`key ${leftward ? "active" : ""}`}></div>
            <div className={`key ${backward ? "active" : ""}`}></div>
            <div className={`key ${rightward ? "active" : ""}`}></div>
          </div>
          <div className="raw">
            <div className={`key large ${jump ? "active" : ""}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
