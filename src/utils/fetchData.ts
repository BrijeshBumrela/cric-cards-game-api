import Player from "../interface/Player.interface";
import path from "path";
import fs from "fs";

export const fetchData = (): Player[] => {
    const jsonFile = fs.readFileSync(
        path.resolve(__dirname, "..", "data/data.json")
    );
    const parsedData = JSON.parse(jsonFile.toString());
    const players = parsedData["players"].map(player => {
        return {
            id: player.pid,
            name: player.name,
            country: player.country,
            imageURL: player.imageURL,
            playingRole: player.playingRole,
            match: player.data.bowling.ODIs.Mat,
            batting: {
                notOuts: player.data.batting.ODIs["NO"],
                runs: player.data.batting.ODIs["Runs"],
                highScore: player.data.batting.ODIs["HS"],
                catches: player.data.batting.ODIs["Ct"],
                average: player.data.batting.ODIs["Ave"],
                hundreds: player.data.batting.ODIs["100"],
                fifties: player.data.batting.ODIs["50"]
            },
            bowling: {
                wickets: player.data.bowling.ODIs["Wkts"],
                economy: player.data.bowling.ODIs["Econ"],
                average: player.data.bowling.ODIs["Ave"],
                best: player.data.bowling.ODIs["BBM"]
            }
        };
    });

    return players;
};
