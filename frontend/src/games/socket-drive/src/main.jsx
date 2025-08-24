import React from "react";
import ReactDOM from "react-dom/client";
import { KeyboardControls } from "@react-three/drei";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "back", keys: ["ArrowDown", "KeyS"] },
        { name: "left", keys: ["ArrowLeft", "KeyA"] },
        { name: "right", keys: ["ArrowRight", "KeyD"] },
        { name: "brake", keys: ["Space"] },
        { name: "reset", keys: ["KeyR"] },
      ]}
    >
      <App />
    </KeyboardControls>
  </React.StrictMode>
);
