import Player from "../interface/Player.interface";
import User from "./User";
import { GameStatus, UserStatus } from "../enums/gamestatus.enum";
import { fetchData } from "../utils/fetchData";
import shuffle from "../utils/shuffle";
import PlayService from "../services/playService";

export default class Game {
    private _users: User[] = [];
    private readonly MAX_USER_LIMIT = 4;
    private _turn: User;

    constructor(
        public room: string,
        private playService: PlayService,
        private _status: GameStatus = GameStatus.WAITING
    ) {}

    addUser(user: User) {
        this._users.push(user);
        if (this._users.length === this.MAX_USER_LIMIT) {
            this.status = GameStatus.ON;
            this.startTheGame();
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
        this.turn = this.users[Math.floor(Math.random() * 3)];
    }

    public playedTheTurn(key: string) {
        const selectedCards = this.getUsersFirstCard();
        const winnerCard = this.playService.compare(selectedCards, key);
        const winnerUser = this.getUserFromCardId(winnerCard);
        if (!winnerUser) throw new Error("Winner user not found");

        const usersInfo = this._users.map(user => ({
            id: user.id,
            // Could be undefined
            card: user.cards[0],
            status: user.status
        }));

        // ! TEST THIS THOROUGHLY
        this._users.forEach(user => {
            const removedCard = user.cards.shift();
            if (user === winnerUser && removedCard) {
                user.cards.push(removedCard);
            }
            if (user.cards.length === 0) {
                user.status = UserStatus.LOST;
            }
        });

        // Set the winner user to take the turn
        this._turn = winnerUser;
        return { usersInfo, id: winnerUser.id };
    }

    private getUserFromCardId = (id: string) =>
        this._users.find(user => user.cards.find(card => card.id === id));

    private getUsersFirstCard(): Player[] {
        let cards: Player[] = [];
        this._users.forEach(user => {
            if (user.status === UserStatus.PLAYING) cards.push(user.cards[0]);
        });
        return cards;
    }

    public getUserWithTheTurn(): User {
        return this.users.find(user => user === this.turn) || this.users[0];
    }

    public getUserIndex(findUser: User): number {
        return this.users.findIndex(user => user === findUser);
    }

    public validateTurnUser(user: User): boolean {
        return this.turn === user;
    }

    get status(): GameStatus {
        return this._status;
    }

    set status(value: GameStatus) {
        this._status = value;
    }

    get turn(): User {
        return this._turn;
    }

    set turn(value: User) {
        this._turn = value;
    }

    get users(): User[] {
        return this._users;
    }

    set users(userList: User[]) {
        this._users = userList;
    }
}
