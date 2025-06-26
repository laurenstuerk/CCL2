// src/components/Ground.jsx
import React from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { RigidBody, CuboidCollider } from "@react-three/rapier";

export default function Ground() {
  const texture = useTexture("/testGrid.png");
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(10, 10);

  return (
    <>
      <RigidBody type="fixed" restitution={0.2} friction={0}>
        {/* <CuboidCollider
          args={[55, 0.1, 55]}
          position={[0, -0.1, 0]}
          restitution={0.2}
          friction={1}
        />
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial map={texture} />
        </mesh> */}

        <RigidBody type="fixed" colliders="cuboid" position={[0, 0, 0]}>
          <mesh>
            <boxGeometry args={[600, 1, 600]} />
            <meshStandardMaterial map={texture} />
          </mesh>
        </RigidBody>
      </RigidBody>
    </>
  );
}
