import Card from "../interface/Player.interface";
import User from "./User";
import { GameStatus } from "../enums/gamestatus.enum";

export default class Game {
    private users: User[] = [];
    constructor(
        private _status: GameStatus = GameStatus.WAITING,
        private room: string
    ) {}

    get status(): GameStatus {
        return this._status;
    }
    set status(value: GameStatus) {
        this._status = value;
    }

    addUser(user: User) {
        this.users.push(user);
        /*  
            ! USERS VALUE IN EACH GAME IS HARDCODED TO 4
        */
        if (this.users.length === 4) {
            this._status = GameStatus.ON;
        }
    }
}
