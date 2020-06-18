export default interface Player {
    id: string;
    country: string;
    imageURL: string;
    name: string;
    playingRole: string;
    matches: number;
    wickets: number;
    economy: number;
    bowlAverage: number;
    best: Best;
    notOuts: number;
    runs: number;
    highScore: number;
    catches: number;
    batAverage: number;
    hundreds: number;
    fifties: number;
}

// Best Bowling Performance
interface Best {
    wickets: number;
    runs: number;
}
