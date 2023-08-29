import { io } from "socket.io-client";

export const socket = io('http://localhost:3000'); // Establish a connection with the Socket.IO server
