import { io } from "socket.io-client";
import { API_BASE_URL } from "../src/config/Api.routes";

export const onlineUsers = new Map();

export const socket = io(`${API_BASE_URL}`, {
    autoConnect: false,
    withCredentials: true,
    query: {},
});