export default interface Card {
    pid: string;
    country: string;
    imageURL: string;
    name: string;
    playingRole: string;
    matches: number;
    bowling: Bowling;
    batting: Batting;
}

interface Bowling {
    wickets: number;
    economy: number;
    average: number;
    best: Best;
}

// Best Bowling Performance
interface Best {
    wickets: number;
    runs: number;
}

interface Batting {
    notOuts: number;
    runs: number;
    highScore: number;
    catches: number;
    average: number;
    hundreds: number;
    fifties: number;
}
