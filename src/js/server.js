import { io } from "socket.io-client";
import {socketEndpoint} from "./config";

const socket = io(socketEndpoint, { autoConnect: false, withCredentials: true });

export default socket;
