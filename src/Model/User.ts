import Card from "../interface/Player.interface";
import { UserStatus } from "../enums/gamestatus.enum";

export default class User {
    private cards: Card[] = [];
    public gameStatus: UserStatus;
    private _name: string;

    constructor(private id: string) {
        this.gameStatus = UserStatus.WAITING;
        this._name = "";
    }

    get name(): string {
        return this._name;
    }
    set name(value: string) {
        this._name = value;
    }

    addCards(cards: Card[]) {
        this.cards = cards;
    }

    removeCard(): void {
        this.cards.shift();
    }
}
