// src/GameScene.jsx
import React, { useState, useEffect } from "react";
import { Environment } from "@react-three/drei";
import { Physics } from "@react-three/rapier";

import Ground from "./components/Ground";
import PlayerCar from "./components/PlayerCar.jsx";
import OtherPlayer from "./components/OtherPlayer";
import { Racetrack } from "./components/Racetrack"; // Import new components
// import Trees from "./components/Trees";
import PhysicsObjects from "./components/PhysicsObjects";

import socket from "./sockets/socket";

export default function GameScene() {
  const tpsForOtherPlayers = 20;
  const [players, setPlayers] = useState({});
  const [myId, setMyId] = useState(null);

  useEffect(() => {
    const handleConnect = () => {
      // console.log("CLIENT received 'players' event:", receivedPlayers);
      // console.log("Connected to server:", socket.id);
      setMyId(socket.id);
    };

    // const handlePlayers = (players) => {
    //   setPlayers(players);
    // };

    // Handle the initial list of all players already in the game
    const handlePlayers = (initialPlayers) => {
      // console.log("CLIENT: Received initial list of players:", initialPlayers);
      setPlayers(initialPlayers);
    };

    // Handle a new player joining the game
    const handlePlayerJoined = (newPlayer) => {
      // console.log("CLIENT: Player joined:", newPlayer);
      setPlayers((prevPlayers) => ({
        ...prevPlayers,
        [newPlayer.id]: newPlayer.data,
      }));
    };

    // Handle a player leaving the game
    const handlePlayerLeft = (playerId) => {
      // console.log("CLIENT: Player left:", playerId);
      setPlayers((prevPlayers) => {
        const updatedPlayers = { ...prevPlayers };
        delete updatedPlayers[playerId];
        return updatedPlayers;
      });
    };

    const handlePlayerUpdate = (update) => {
      // Uncomment the next line for VERY noisy but useful debugging
      // console.log("CLIENT: Received player update:", update);
      setPlayers((prevPlayers) => ({
        ...prevPlayers,
        [update.id]: update.data,
      }));
    };

    socket.on("connect", handleConnect);
    socket.on("players", handlePlayers);
    socket.on("playerJoined", handlePlayerJoined);
    socket.on("playerLeft", handlePlayerLeft);
    socket.on("playerUpdate", handlePlayerUpdate);

    // Fallback: immediately set if already connected
    if (socket.connected && !myId) {
      // console.log("Connected (immediate):", socket.id);
      setMyId(socket.id);
    }

    return () => {
      // console.log("CLIENT: Cleaning up socket listeners.");
      socket.off("connect", handleConnect);
      socket.off("players", handlePlayers);
      socket.off("playerJoined", handlePlayerJoined);
      socket.off("playerLeft", handlePlayerLeft);
      socket.off("playerUpdate", handlePlayerUpdate);
    };
  }, []);

  // console.log("GameScene rendering with players:", players);

  return (
    <>
      <Environment files="/assets/hdris/hdri.exr" background />

      <Physics gravity={[0, -9.81, 0]}>
        {/* Your Player and Other Players */}
        <PlayerCar />
        {myId &&
          Object.entries(players).map(([id, playerState]) => {
            if (id === myId || !playerState?.position) return null;
            return <OtherPlayer key={id} position={playerState.position} rotation={playerState.rotation} tps={tpsForOtherPlayers} />;
          })}

        {/* Your New Environment Components */}
        <Ground />
        <Racetrack position={[-10, -1.5, 50]} />
        {/* <Trees /> */}
        {/* Add Fence and House components here when you make them */}
        <PhysicsObjects />
      </Physics>
    </>
  );
}
