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
    const user = new User(socket.id, socket.handshake.query.name);
    let game = getAvailableRoom(games);
    if (!game) {
        game = new Game(uuidv4());
        games.push(game);
    }
    // Starting the game when the user limit is reached is in this function
    game.addUser(user);
    socket.join(game.room);

    if (game.isRoomFilled()) {
        game.users.forEach((user, index) => {
            if (game instanceof Game) {
                io.to(user.id).emit("startgame", {
                    myInfo: {
                        card: user.cards[0],
                        position: game.getUserIndex(user)
                    },
                    turnInfo: {
                        card: game.getUserWithTheTurn().cards[0],
                        position: game.getUserIndex(game.getUserWithTheTurn())
                    }
                });
            }
        });
        console.log(user);
    }
});

server.listen(8000);
module.exports = app;
