import Player from "../interface/Player.interface";
import User from "./User";
import { GameStatus, UserStatus } from "../enums/gamestatus.enum";
import { fetchData } from "../utils/fetchData";
import shuffle from "../utils/shuffle";

export default class Game {
    private _users: User[] = [];
    private readonly MAX_USER_LIMIT = 4;
    private _turn: number = 0;

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

        // Set who is going to play first
        this.turn = Math.floor(Math.random() * 3);
    }

    public getUserWithTheTurn(): User {
        return (
            this.users.find((_, index) => index === this.turn) || this.users[0]
        );
    }

    public getUserIndex(findUser: User): number {
        return this.users.findIndex(user => user === findUser);
    }

    get status(): GameStatus {
        return this._status;
    }

    set status(value: GameStatus) {
        this._status = value;
    }

    get turn(): number {
        return this._turn;
    }

    set turn(value: number) {
        this._turn = value;
    }

    get users(): User[] {
        return this._users;
    }

    set users(userList: User[]) {
        this._users = userList;
    }
}
