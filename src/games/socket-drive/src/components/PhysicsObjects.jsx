// src/components/PhysicsObjects.jsx
import React from 'react';
import { RigidBody, BallCollider, CuboidCollider } from '@react-three/rapier';

export default function PhysicsObjects() {
  return (
    <>
      {/* A dynamic sphere */}
      <RigidBody position={[0, 5, -20]} colliders="ball" mass={1}>
        <mesh castShadow>
          <sphereGeometry args={[0.5]} /> {/* radius */}
          <meshStandardMaterial color="white" />
        </mesh>
      </RigidBody>

      {/* A dynamic cube */}
      <RigidBody position={[2, 5, -20]} mass={1}>
        <mesh castShadow>
          <boxGeometry args={[1, 1, 1]} /> {/* width, height, depth */}
          <meshStandardMaterial color="orange" />
        </mesh>
        <CuboidCollider args={[0.5, 0.5, 0.5]} />
      </RigidBody>

      {/* Add a few more in a stack to make it fun */}
      <RigidBody position={[2, 7, -20]} mass={1}>
        <mesh castShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
        <CuboidCollider args={[0.5, 0.5, 0.5]} />
      </RigidBody>
    </>
  );
}