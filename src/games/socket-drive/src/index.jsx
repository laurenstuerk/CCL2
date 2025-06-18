import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import GameScene from "./GameScene";

export default function SocketDrive() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas shadows camera={{ position: [0, 5, -10], fov: 60 }}>
        {/* <ambientLight intensity={0.4} /> */}
        <directionalLight castShadow position={[5, 10, 5]} shadow-mapSize={[1024, 1024]} intensity={1} />
        <GameScene />
        <OrbitControls />
        <Stats />
      </Canvas>
    </div>
  );
}
