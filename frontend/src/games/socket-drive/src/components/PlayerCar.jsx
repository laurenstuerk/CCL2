import React from "react";
import { Collider } from "@react-three/rapier/node_modules/@dimforge/rapier3d-compat";
import {
  KeyboardControls,
  OrbitControls,
  useKeyboardControls,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import {
  CuboidCollider,
  Physics,
  RigidBody,
  useRapier,
} from "@react-three/rapier";
import { useControls } from "leva";
import { useRef, useState } from "react";
import * as THREE from "three";
import { useVehicleController } from "../hooks/useVehicleController.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import socket from "../sockets/socket";


// --- CONFIGURATION ---
// Set Tps to 2 for a 0.5 second update interval (1 / 2 = 0.5s)
// LATER: Change this to 10 or 20 for better responsiveness.
const Tps = 20;
const updateInterval = 10 / Tps;

const spawn = {
  position: [3, 2, 10],
  rotation: [0, -33, 0],
};

const controls = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "back", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "brake", keys: ["Space"] },
  { name: "reset", keys: ["KeyR"] },
];

const wheelInfo = {
  axleCs: new THREE.Vector3(0, 0, -1),
  suspensionRestLength: 0.25,
  suspensionStiffness: 24,
  maxSuspensionTravel: 1,
  radius: 0.3,
};

const wheels = [
  { position: new THREE.Vector3(-1.4, -0.4, 0.9), ...wheelInfo }, // Front-left
  { position: new THREE.Vector3(1.3, -0.4, 0.9), ...wheelInfo },  // Front-right
  { position: new THREE.Vector3(-1.4, -0.4, -0.9), ...wheelInfo },// Rear-left
  { position: new THREE.Vector3(1.3, -0.4, -0.9), ...wheelInfo }, // Rear-right
];

const cameraOffset = new THREE.Vector3(7, 3, 0);
const cameraTargetOffset = new THREE.Vector3(0, 1.5, 0);

const _bodyPosition = new THREE.Vector3();
const _airControlAngVel = new THREE.Vector3();
const _cameraPosition = new THREE.Vector3();
const _cameraTarget = new THREE.Vector3();

const Vehicle = ({ position, rotation }) => {
  const { world, rapier } = useRapier();
  const threeControls = useThree((s) => s.controls);
  const [, getKeyboardControls] = useKeyboardControls();
  const { nodes, materials } = useGLTF("/assets/models/Nissan.glb");

  const chasisMeshRef = useRef(null);
  const chasisBodyRef = useRef(null);
  const wheelsRef = useRef([]);
  const lastUpdateTime = useRef(0);
  const { vehicleController } = useVehicleController(
    chasisBodyRef,
    wheelsRef,
    wheels
  );

  const { accelerateForce, brakeForce, steerAngle } = useControls(
    "rapier-dynamic-raycast-vehicle-controller",
    {
      accelerateForce: { value: 10, min: 1, max: 100 },
      brakeForce: { value: 0.5, min: 0, max: 0.5, step: 0.01 },
      steerAngle: { value: Math.PI / 20, min: 0, max: Math.PI / 12 },
    }
  );

  const [smoothedCameraPosition] = useState(new THREE.Vector3(0, 100, -300));
  const [smoothedCameraTarget] = useState(new THREE.Vector3());

  const ground = useRef(null);

  useFrame((state, delta) => {
    if (!chasisMeshRef.current || !vehicleController.current || !!threeControls)
      return;

    const t = 1.0 - Math.pow(0.01, delta);

    /* controls */
    const controller = vehicleController.current;
    const chassisRigidBody = controller.chassis();
    const controls = getKeyboardControls();

    const pos = chassisRigidBody.translation();
    const rot = chassisRigidBody.rotation();

    // rough ground check
    let outOfBounds = false;
    const ray = new rapier.Ray(chassisRigidBody.translation(), {
      x: 0,
      y: -1,
      z: 0,
    });
    const raycastResult = world.castRay(
      ray,
      1,
      false,
      undefined,
      undefined,
      undefined,
      chassisRigidBody
    );
    ground.current = null;

    // --- Throttling Logic ---
    if (
      state.clock.elapsedTime - lastUpdateTime.current >
      updateInterval / 100
    ) {
      const pos = chassisRigidBody.translation();
      const rot = chassisRigidBody.rotation();

      socket.emit("playerUpdate", {
        position: [pos.x, pos.y, pos.z],
        rotation: { x: rot.x, y: rot.y, z: rot.z, w: rot.w },
      });

      lastUpdateTime.current = state.clock.elapsedTime;
    }

    if (raycastResult) {
      const collider = raycastResult.collider;
      const userData = collider.parent()?.userData;
      outOfBounds = userData?.outOfBounds;
      ground.current = collider;
    }

    const engineForce =
      Number(controls.forward) * accelerateForce - Number(controls.back * accelerateForce);
    controller.setWheelEngineForce(0, engineForce);
    controller.setWheelEngineForce(2, engineForce);

    const wheelBrake = Number(controls.brake) * brakeForce;
    controller.setWheelBrake(0, wheelBrake);
    controller.setWheelBrake(1, wheelBrake);
    controller.setWheelBrake(2, wheelBrake);
    controller.setWheelBrake(3, wheelBrake);

    const currentSteering = controller.wheelSteering(0) || 0;
    const steerDirection = Number(controls.left) - Number(controls.right);
    const steering = THREE.MathUtils.lerp(
      currentSteering,
      steerAngle * steerDirection,
      0.5
    );
    controller.setWheelSteering(0, steering);
    controller.setWheelSteering(2, steering);

    // air control
    if (!ground.current) {
      const forwardAngVel = Number(controls.forward) - Number(controls.back);
      const sideAngVel = Number(controls.left) - Number(controls.right);
      const angvel = _airControlAngVel.set(
        0,
        sideAngVel * t,
        forwardAngVel * t
      );
      angvel.applyQuaternion(chassisRigidBody.rotation());
      angvel.add(chassisRigidBody.angvel());
      chassisRigidBody.setAngvel(
        new rapier.Vector3(angvel.x, angvel.y, angvel.z),
        true
      );
    }

    if (controls.reset || outOfBounds) {
      const chassis = controller.chassis();
      chassis.setTranslation(new rapier.Vector3(...spawn.position), true);
      const spawnRot = new THREE.Euler(...spawn.rotation);
      const spawnQuat = new THREE.Quaternion().setFromEuler(spawnRot);
      chassis.setRotation(spawnQuat, true);
      chassis.setLinvel(new rapier.Vector3(0, 0, 0), true);
      chassis.setAngvel(new rapier.Vector3(0, 0, 0), true);
    }

    /* camera */
    const cameraPosition = _cameraPosition;
    if (!!ground.current) {
      cameraPosition.copy(cameraOffset);
      const bodyWorldMatrix = chasisMeshRef.current.matrixWorld;
      cameraPosition.applyMatrix4(bodyWorldMatrix);
    } else {
      const velocity = chassisRigidBody.linvel();
      cameraPosition.copy(velocity);
      cameraPosition.normalize();
      cameraPosition.multiplyScalar(-10);
      cameraPosition.add(chassisRigidBody.translation());
    }

    cameraPosition.y = Math.max(
      cameraPosition.y,
      (vehicleController.current?.chassis().translation().y ?? 0) + 1
    );
    smoothedCameraPosition.lerp(cameraPosition, t);
    state.camera.position.copy(smoothedCameraPosition);

    const bodyPosition = chasisMeshRef.current.getWorldPosition(_bodyPosition);
    const cameraTarget = _cameraTarget;
    cameraTarget.copy(bodyPosition);
    cameraTarget.add(cameraTargetOffset);
    smoothedCameraTarget.lerp(cameraTarget, t);
    state.camera.lookAt(smoothedCameraTarget);

  });

  const carModel = useLoader(GLTFLoader, "/assets/models/Nissan.glb");

  return (
    <RigidBody
      position={position}
      rotation={rotation}
      canSleep={false}
      ref={chasisBodyRef}
      colliders={false}
      type="dynamic"
      mass={1500}
      centerOfMass={{ x: 0, y: -1, z: 0 }}
    >
      <CuboidCollider args={[1.7, 0.4, 1]} />
      <group
        ref={chasisMeshRef}
        castShadow
        receiveShadow
        position={[0.1, -0.6, 0]}
        scale={[2.2, 2.2, 2.4]}
      >
        <primitive object={carModel.scene} />
      </group>
      {wheels.map((wheel, index) => (
        <group
          key={index}
          ref={(ref) => (wheelsRef.current[index] = ref)}
          position={wheel.position}
        >
          <group rotation-x={-Math.PI / 2}>
            <mesh>
              <cylinderGeometry args={[0.3, 0.3, 0.3, 16]} />
              <meshStandardMaterial color="#222" />
            </mesh>
          </group>
        </group>
      ))}
    </RigidBody>
  );
};

export default function PlayerCar() {
  const { debug, orbitControls } = useControls(
    "rapier-dynamic-raycast-vehicle-controller/physics",
    {
      debug: false,
      orbitControls: false,
    }
  );

  return (
    <>
      <KeyboardControls map={controls}>
        <Vehicle position={spawn.position} rotation={spawn.rotation} />
      </KeyboardControls>

      {orbitControls && <OrbitControls makeDefault />}
    </>
  );
}
