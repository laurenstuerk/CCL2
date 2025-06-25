// src/sockets/socket.js
import { io } from 'socket.io-client';
const socket = io('https://cc241049-10708.node.fhstp.cc');
// const socket = io('http://10.0.0.157:3000');
export default socket;