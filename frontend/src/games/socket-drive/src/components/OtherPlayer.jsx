// src/components/OtherPlayer.jsx
import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

useGLTF.preload("/assets/models/Nissan.glb");

// We now accept 'tps' as a prop to know the update interval.
export default function OtherPlayer({ position, rotation, tps = 20 }) {
  const { scene } = useGLTF("/assets/models/Nissan.glb");
  const groupRef = useRef();

  // We need three refs to store the state of our animation
  const previousPos = useRef(new THREE.Vector3());
  const targetPos = useRef(new THREE.Vector3());

  // Rotation refs (using Quaternions for smooth interpolation)
  const previousRot = useRef(new THREE.Quaternion());
  const targetRot = useRef(new THREE.Quaternion());

  const lastUpdateTime = useRef(0);
  // The total time the interpolation should take, in seconds.
  const interpolationTime = 1 / tps;

  // This effect runs once when the component mounts to set the initial state.
  useEffect(() => {
    const initialVec = new THREE.Vector3(position[0], position[1], position[2]);
    previousPos.current.copy(initialVec);
    targetPos.current.copy(initialVec);
// console.log(rotation);
    const initialRotQuat = new THREE.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);
    previousRot.current.copy(initialRotQuat);
    targetRot.current.copy(initialRotQuat);
    // Use performance.now() for a high-resolution timestamp
    lastUpdateTime.current = performance.now();
  }, []);

  // This effect runs whenever a new 'position' prop arrives.
  useEffect(() => {
    // The old targetPos becomes the new previousPos.
    previousPos.current.copy(targetPos.current);
    // The new position prop is our new target.
    targetPos.current.set(position[0], position[1], position[2]);

    previousRot.current.copy(targetRot.current);
    targetRot.current.set(rotation.x, rotation.y, rotation.z, rotation.w);
    // Reset the timer.
    lastUpdateTime.current = performance.now();
  }, [position, rotation]);

  useFrame(() => {
    if (!groupRef.current) return;

    const now = performance.now();
    const timeSinceUpdate = (now - lastUpdateTime.current) / 1000; // in seconds

    // Calculate our progress (alpha) from 0.0 to 1.0 along the interpolation path.
    // We use Math.min to clamp the value at 1.0, ensuring we don't overshoot the target
    // if there's a network lag spike.
    const alpha = Math.min(timeSinceUpdate / interpolationTime, 1.0);

    groupRef.current.position.copy(previousPos.current).lerp(targetPos.current, alpha);

    // Interpolate rotation using slerp (for quaternions)
    groupRef.current.quaternion.copy(previousRot.current).slerp(targetRot.current, alpha);
  });

  return (
    // The main container group that we move and rotate
    <group ref={groupRef}>
      {/* This inner group applies the same visual offset and scale as your PlayerCar */}
      <group position={[0.1, -0.6, 0]} scale={[2.2, 2.2, 2.4]}>
        {/* Use the loaded scene. We clone it to ensure each OtherPlayer has a unique instance */}
        <primitive object={scene.clone()} />
      </group>
    </group>
  );
}
