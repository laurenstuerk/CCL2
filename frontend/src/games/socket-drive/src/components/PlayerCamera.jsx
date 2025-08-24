import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

export default function PlayerCamera({ playerPosition, playerVelocity, rotation }) {
  const [smoothedCamPos] = useState(() => new THREE.Vector3());
  const [smoothedCamTarget] = useState(() => new THREE.Vector3());

  useFrame((state, delta) => {
    if (!playerPosition) return;

    // Calculate camera offset based on rotation
    const cameraOffset = new THREE.Vector3(
      Math.sin(rotation) * 3, // x offset based on rotation
      1.5, // y offset (height)
      Math.cos(rotation) * 3  // z offset based on rotation
    );

    const camPos = new THREE.Vector3(
      playerPosition.x - cameraOffset.x, // Subtract to position camera behind player
      playerPosition.y + cameraOffset.y,
      playerPosition.z - cameraOffset.z
    );

    const camTarget = new THREE.Vector3(
      playerPosition.x,
      playerPosition.y + 0.3,
      playerPosition.z
    );

    smoothedCamPos.lerp(camPos, 5 * delta);
    smoothedCamTarget.lerp(camTarget, 5 * delta);

    state.camera.position.copy(smoothedCamPos);
    state.camera.lookAt(smoothedCamTarget);
  });

  return null; // This is a logical component, no need to render anything
} 