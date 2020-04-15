import Player from "../interface/Player.interface";
import User from "./User";
import { GameStatus } from "../enums/gamestatus.enum";
import { fetchData } from "../utils/fetchData";
import shuffle from "../utils/shuffle";

export default class Game {
    public users: User[] = [];
    private readonly MAX_USER_LIMIT = 4;

    constructor(
        public room: string,
        private _status: GameStatus = GameStatus.WAITING
    ) {}

    get status(): GameStatus {
        return this._status;
    }
    set status(value: GameStatus) {
        this._status = value;
    }

    addUser(user: User) {
        this.users.push(user);
        if (this.users.length === this.MAX_USER_LIMIT) {
            this._status = GameStatus.ON;
            this.startTheGame();
        }
    }

    private distributeCards(players: Player[]): void {
        let ids = players.map(card => card.pid);
        ids = shuffle(ids);
        const userCards: Player[][] = Array(this.users.length).fill([]);
        let iter = 0;
        while (ids.length > 0) {
            const id = ids.shift();
            const player = players.find(card => card.pid === id);
            if (player) {
                userCards[iter].push(player);
            }
            iter = (iter + 1) % 4;
        }
    }

    private startTheGame() {
        const players: Player[] = fetchData();
        this.distributeCards(players);
    }
}
