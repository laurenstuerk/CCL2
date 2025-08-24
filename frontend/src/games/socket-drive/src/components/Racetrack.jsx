import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody, TrimeshCollider } from '@react-three/rapier'

export function Racetrack(props) {
  const { nodes, materials } = useGLTF('/assets/models/racetrack.glb')

  return (
    <RigidBody type="fixed" colliders={false} {...props}>
      <group dispose={null}>
        {/* The visual <group> from gltfjsx might have its own transform properties.
            It's often best to reset them on the physics body if you control position from GameScene.
            For now, we'll leave it as is. */}
        <group  >
          {/* First mesh part */}
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube032.geometry}
            material={materials['Material.001']}
          />
          {/* CORRECTED COLLIDER: Added the .index.array */}
          <TrimeshCollider args={[nodes.Cube032.geometry.attributes.position.array, nodes.Cube032.geometry.index.array]} />

          {/* Second mesh part */}
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube032_1.geometry}
            material={materials['Material.003']}
          />
          <TrimeshCollider args={[nodes.Cube032_1.geometry.attributes.position.array, nodes.Cube032_1.geometry.index.array]} />

          {/* Third mesh part */}
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube032_2.geometry}
            material={materials['Material.004']}
          />
          <TrimeshCollider args={[nodes.Cube032_2.geometry.attributes.position.array, nodes.Cube032_2.geometry.index.array]} />

          {/* Fourth mesh part */}
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube032_3.geometry}
            material={materials['Material.002']}
          />
          <TrimeshCollider args={[nodes.Cube032_3.geometry.attributes.position.array, nodes.Cube032_3.geometry.index.array]} />

          {/* Fifth mesh part */}
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube032_4.geometry}
            material={materials['Material.006']}
          />
          <TrimeshCollider args={[nodes.Cube032_4.geometry.attributes.position.array, nodes.Cube032_4.geometry.index.array]} />
        </group>
      </group>
    </RigidBody>
  )
}

useGLTF.preload('/assets/models/racetrack.glb')