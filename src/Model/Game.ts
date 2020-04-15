import Player from "../interface/Player.interface";
import User from "./User";
import { GameStatus, UserStatus } from "../enums/gamestatus.enum";
import { fetchData } from "../utils/fetchData";
import shuffle from "../utils/shuffle";

export default class Game {
    private _users: User[] = [];
    private readonly MAX_USER_LIMIT = 4;

    constructor(
        public room: string,
        private _status: GameStatus = GameStatus.WAITING
    ) {}

    addUser(user: User) {
        this._users.push(user);
        if (this._users.length === this.MAX_USER_LIMIT) {
            this.status = GameStatus.ON;
            this.startTheGame();
            this.users.map(user => (user.gameStatus = UserStatus.PLAYING));
        }
    }

    public isRoomFilled(): boolean {
        return this.users.length === this.MAX_USER_LIMIT;
    }

    private distributeCards(players: Player[]): void {
        let ids = players.map(player => player.id);
        ids = shuffle(ids);
        const userCards: Player[][] = Array(this._users.length)
            .fill(null)
            .map(() => []);
        let iter = 0;
        while (ids.length > 0) {
            const id = ids.shift();
            const player = players.find(card => card.id === id);
            if (player) {
                userCards[iter].push(player);
            }
            iter = (iter + 1) % 4;
        }
        // Adding players to users
        this.users.map((user, idx) => user.addCards(userCards[idx]));
    }

    private startTheGame() {
        const players: Player[] = fetchData();
        this.distributeCards(players);
    }

    get status(): GameStatus {
        return this._status;
    }

    set status(value: GameStatus) {
        this._status = value;
    }

    get users(): User[] {
        return this._users;
    }

    set users(userList: User[]) {
        this._users = userList;
    }
}
