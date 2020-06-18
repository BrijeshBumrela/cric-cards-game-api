import express from "express";
import http from "http";
import socket from "socket.io";
import cors from "cors";
import Game from "./Model/Game";
import User from "./Model/User";
import { getAvailableRoom } from "./utils/getAvailableRoom";
import { v4 as uuidv4 } from "uuid";
import PlayService from "./services/playService";
import { getUserGame } from "./utils/getValues";

const app = express();
const server = http.createServer(app);
const io = socket(server);
app.use(cors());

const games: Game[] = [];

io.on("connection", socket => {
    const user = new User(socket.id, socket.handshake.query.name);
    let game = getAvailableRoom(games);
    if (!game) {
        game = new Game(uuidv4(), new PlayService());
        games.push(game);
    }
    // Starting the game when the user limit is reached is in this function
    game.addUser(user);
    socket.join(game.room);

    if (game.isRoomFilled()) {
        game.users.forEach(user => {
            if (game instanceof Game) {
                io.to(user.id).emit("startgame", {
                    myInfo: {
                        card: user.cards[0],
                        position: game.getUserIndex(user)
                    },
                    // Info about the user who is going to start the game
                    turnInfo: {
                        card: game.getUserWithTheTurn().cards[0],
                        position: game.getUserIndex(game.getUserWithTheTurn())
                    }
                });
            }
        });
    }

    socket.on("playedTurn", ({ key }) => {
        const game = getUserGame(socket.id, games);
        if (!game) throw new Error("No game found for this user");
        if (game.validateTurnUser(user)) {
            const data = game.playedTheTurn(key);
            game.users.forEach(user => {
                if (game instanceof Game) {
                    io.to(user.id).emit("turnResponse", data);
                }
            });
        }
    });

    socket.on("disconnect", () => {
        findUserAndRemoveFromGame(socket.id, games);
    });
});

const findUserAndRemoveFromGame = (id: string, games: Game[]) => {
    games.forEach((game, index) => {
        game.users.forEach((user, index) => {
            if (user.id === id) game.users.splice(index, 1);
        });

        // Destory the room if no user if left
        if (game.users.length === 0) {
            games.splice(index, 1);
        }
    });
};

server.listen(8000);
module.exports = app;
