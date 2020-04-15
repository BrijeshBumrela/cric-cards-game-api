import Card from "../interface/Player.interface";
import { UserStatus } from "../enums/gamestatus.enum";

export default class User {
    private cards: Card[] = [];
    public gameStatus: UserStatus;
    constructor(private id: string, private name: string) {
        this.gameStatus = UserStatus.WAITING;
    }

    addCards(cards: Card[]) {
        this.cards = cards;
    }

    removeCard(): void {
        this.cards.shift();
    }
}
