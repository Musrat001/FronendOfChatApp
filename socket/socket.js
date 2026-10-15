import { io } from "socket.io-client";

export const onlineUsers = new Map();

export const socket = io("http://localhost:9838", {
    autoConnect: false,
    withCredentials: true,
    query: {},
});