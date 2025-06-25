// backend/src/config/socketService.js

const { Server } = require("socket.io");

// This object will hold all the connected players' data
const players = {};

function initializeSocket(server) {
  // Create a new Socket.IO server and configure its CORS settings
  // to match your main application's settings.
  const io = new Server(server, {
    cors: {
      origin: "https://cc241049-10708.node.fhstp.cc", // Your frontend URL
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // All of your game logic goes inside this connection handler
  io.on("connection", (socket) => {
    console.log(`GAME: Player connected: ${socket.id}`);

    // When a player connects, add them to the players object
    // For now, we only store position, but you could add more data
    players[socket.id] = {
      position: [0, 2, 0], // Default starting position
      rotation: { x: 0, y: 0, z: 0, w: 1 },
    };

    // Immediately send the complete list of players to the new player
    socket.emit("players", players);

    // Announce the new player to all OTHER players
    socket.broadcast.emit("playerJoined", {
      id: socket.id,
      data: players[socket.id],
    });

    // Listen for player movement
    socket.on("playerUpdate", (data) => {
      if (players[socket.id]) {
        players[socket.id] = data;
        // Broadcast the updated data for this specific player
        // Using socket.broadcast is more efficient than io.emit for movement
        socket.broadcast.emit("playerUpdate", { id: socket.id, data: data });
      }
    });

    // Handle player disconnection
    socket.on("disconnect", () => {
      console.log(`GAME: Player disconnected: ${socket.id}`);
      delete players[socket.id];
      // Announce to all other players that this player has left
      io.emit("playerLeft", socket.id);
    });
  });

  console.log("Socket.IO service initialized");
}

module.exports = { initializeSocket };
