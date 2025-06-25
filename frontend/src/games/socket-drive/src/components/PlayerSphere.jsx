// src/components/PlayerSphere.jsx
import { RigidBody, useRapier } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import socket from "../sockets/socket";
import PlayerCamera from "./PlayerCamera";

export default function PlayerSphere({ position }) {
  const body = useRef();
  const [subscribe, getKeys] = useKeyboardControls();
  const { world } = useRapier();
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0, z: 0 });
  const [playerVelocity, setPlayerVelocity] = useState({ x: 0, y: 0, z: 0 });
  const [rotation, setRotation] = useState(0); // Track current rotation

  useFrame((state, delta) => {
    // Controls
    const { forward, backward, leftward, rightward } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.6 * delta;
    const rotationSpeed = 2 * delta; // Speed of rotation

    // Update rotation based on A/D keys
    if (leftward) {
      setRotation(prev => prev + rotationSpeed);
    }
    if (rightward) {
      setRotation(prev => prev - rotationSpeed);
    }

    // Calculate forward direction based on current rotation
    const forwardX = Math.sin(rotation);
    const forwardZ = Math.cos(rotation);

    // Apply forward/backward movement in the direction we're facing
    if (forward) {
      impulse.x += forwardX * impulseStrength;
      impulse.z += forwardZ * impulseStrength;
    }
    if (backward) {
      impulse.x -= forwardX * impulseStrength;
      impulse.z -= forwardZ * impulseStrength;
    }

    if (body.current) {
      body.current.applyImpulse(impulse);
      body.current.applyTorqueImpulse(torque);

      const pos = body.current.translation();
      const linvel = body.current.linvel();

      setPlayerPosition({ x: pos.x, y: pos.y, z: pos.z });
      setPlayerVelocity({ x: linvel.x, y: linvel.y, z: linvel.z });

      socket.emit("move", { x: pos.x, y: pos.y, z: pos.z });
    }
  });

  return (
    <>
      <RigidBody
        ref={body}
        position={[0, 1, 0]}
        colliders="ball"
        canSleep={false}
        linearDamping={0.5}
        angularDamping={0.5}
        restitution={0.2}
        friction={1}
      >
        <mesh castShadow>
          <icosahedronGeometry args={[0.3, 1]} />
          <meshStandardMaterial flatShading color="blue" />
        </mesh>
      </RigidBody>
      <PlayerCamera 
        playerPosition={playerPosition} 
        playerVelocity={playerVelocity} 
        rotation={rotation}
      />
    </>
  );
}
