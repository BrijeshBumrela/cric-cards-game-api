import Game from "../Model/Game";
import { GameStatus } from "../enums/gamestatus.enum";

export const getAvailableRoom = (games: Game[]): Game | null => {
    for (let game of games) {
        if (game.status === GameStatus.WAITING) {
            return game;
        }
    }
    return null;
};
