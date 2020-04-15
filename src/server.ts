import express from "express";
import http from "http";
import socket from "socket.io";
import cors from "cors";
import Game from "./Model/Game";
import User from "./Model/User";
import { getAvailableRoom } from "./utils/getAvailableRoom";
import { v4 as uuidv4 } from "uuid";

const app = express();
const server = http.createServer(app);
const io = socket(server);
app.use(cors());

const games: Game[] = [];

io.on("connection", socket => {
    const user = new User(socket.id);
    let game = getAvailableRoom(games);
    if (!game) {
        game = new Game(uuidv4());
        games.push(game);
    }
    // Starting the game when the user limit is reached is in this function
    game.addUser(user);
});

server.listen(8000);
module.exports = app;
