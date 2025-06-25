// backend/server.js

require("dotenv").config();
const http = require('http');
const app = require("./app");
const { initializeSocket } = require('./src/config/ws.js'); 

const PORT = process.env.PORT;
const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, () => {
  // console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`Socket.IO service is attached and listening for connections.`);
});