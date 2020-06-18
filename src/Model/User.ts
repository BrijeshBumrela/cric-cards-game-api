import Player from "../interface/Player.interface";
import { UserStatus } from "../enums/gamestatus.enum";

export default class User {
    private _cards: Player[] = [];

    constructor(
        private _id: string,
        private _name: string,
        private _status: UserStatus = UserStatus.WAITING
    ) {}

    get id(): string {
        return this._id;
    }
    set id(value: string) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }
    set name(value: string) {
        this._name = value;
    }

    get cards(): Player[] {
        return this._cards;
    }

    set cards(cards: Player[]) {
        this._cards = cards;
    }

    get status(): UserStatus {
        return this._status;
    }

    set status(status: UserStatus) {
        this._status = status;
    }

    addCards(cards: Player[]) {
        this.cards = cards;
    }

    removeCard(): void {
        this.cards.shift();
    }
}
