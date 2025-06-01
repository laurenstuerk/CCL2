import { useKeyboardControls } from "@react-three/drei";
import useGame from "./stores/useGame.jsx";
import { addEffect } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { SubmitRaceTime } from "../../services/gameApi.js";

export default function Interface() {
  const time = useRef();
  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);

  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);

  const submittedRef = useRef(false);
  const { mutate } = SubmitRaceTime();
  const userId = 1;

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();
      let elapsedTime = 0;

      if (state.phase === "playing") {
        elapsedTime = Date.now() - state.startTime;
      } else if (state.phase === "ended") {
        elapsedTime = state.endTime - state.startTime;

        // Only submit once
        if (!submittedRef.current) {
          submittedRef.current = true;
          const seconds = (elapsedTime / 1000).toFixed(2);

          mutate({ user_id: 1, time: seconds });
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
