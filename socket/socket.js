import { io } from "socket.io-client";
import { API_BASE_URL } from "../src/components/userComponents/config/Api.routes";

export const onlineUsers = new Map();

export const socket = io(`${API_BASE_URL}`, {
    autoConnect: false,
    withCredentials: true,
    query: {},
});