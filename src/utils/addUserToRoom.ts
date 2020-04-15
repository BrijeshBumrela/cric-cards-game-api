import User from "../Model/User";
import Game from "../Model/Game";
import { GameStatus } from "../enums/gamestatus.enum";

export const addUserToRoom = (user: User, games: Game[]) => {
    for (let game of games) {
        if (game.status === GameStatus.WAITING) {
            game.addUser(user);
        }
    }
};
