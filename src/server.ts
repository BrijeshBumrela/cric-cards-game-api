import express from "express";
import http from "http";
import socket from "socket.io";
import cors from "cors";
import Game from "./Model/Game";

const app = express();
const server = http.createServer(app);
const io = socket(server);
app.use(cors());

const games: Game[] = [];

io.on("connection", socket => {});

server.listen(8000);
module.exports = app;
