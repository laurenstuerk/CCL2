// src/components/Trees.jsx
import React from 'react';
import { useGLTF } from '@react-three/drei';
import { RigidBody, CylinderCollider } from '@react-three/rapier';

// A single tree component that will be instanced
function Tree({ position }) {
  const { nodes, materials } = useGLTF('/assets/models/tree.glb');
  return (
    <RigidBody type="fixed" position={position} colliders={false}>

      <CylinderCollider args={[5, 0.5]} /> {/* [height, radius] */}
    </RigidBody>
  );
}

// A component that places multiple trees
export default function Trees() {
  // Define the positions for each tree
  const treePositions = [
    [10, 0, -15],
    [15, 0, -25],
    [-10, 0, -15],
    [-15, 0, -25],
  ];

  return (
    <>
      {treePositions.map((pos, i) => (
        <Tree key={i} position={pos} />
      ))}
    </>
  );
}

useGLTF.preload('/assets/models/tree.glb');