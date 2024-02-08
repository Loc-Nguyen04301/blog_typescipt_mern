import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { Server, Socket, ServerOptions } from "socket.io";
import { createServer } from "http";
import initRoutes from "./routes";
import { SocketServer } from "./config/socket";

var corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

const app = express();
// cookies
app.use(cookieParser());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// interact client to server
app.use(cors(corsOptions));
app.use(morgan("dev"));
//Init Routes
initRoutes(app);
// Connect Database
import "./config/database";

// Socket.io
const httpServer = createServer(app);
const serverOptions = {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true
  }

}
export const io = new Server(httpServer, serverOptions);
io.on("connect", (socket: Socket) => {
  SocketServer(socket)
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
