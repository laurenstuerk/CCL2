// src/sockets/socket.js
import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');
// const socket = io('http://10.0.0.157:3000');
export default socket;