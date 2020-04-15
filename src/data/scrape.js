const fs = require('fs');
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const cricPlayersIds = [253802, 34102, 28235, 28081, 422108, 234675, 625371, 625383, 326016, ]
const url = "https://cricapi.com/api/playerStats";

const cricRequests = cricPlayersIds.map(id => new Promise(async (res, rej) => {
    try {
        const result = await axios.post(url, {
            pid: id,
            apikey: process.env.CRIC_API_KEY
        })
        res(result);
    } catch(e) {
        rej(e);
    }
}));

const jsonFile = fs.readFileSync(path.resolve(__dirname, 'data.json'))
const parsedData = JSON.parse(jsonFile);
const playerData = parsedData["players"][0]

const myPlayer = {
    id: playerData.pid,
    name: playerData.name,
    country: playerData.country,
    imageURL: playerData.imageURL,
    playingRole: playerData.playingRole,
    match: playerData.data.bowling.ODIs.Mat,
    batting: {
        notOuts: playerData.data.batting.ODIs["NO"],
        runs: playerData.data.batting.ODIs["Runs"],
        highScore: playerData.data.batting.ODIs["HS"],
        catches: playerData.data.batting.ODIs["Ct"],
        average: playerData.data.batting.ODIs["Ave"],
        hundreds: playerData.data.batting.ODIs["100"],
        fifties: playerData.data.batting.ODIs["50"]
    },
    bowling: {
        wickets: playerData.data.bowling.ODIs["Wkts"],
        economy: playerData.data.bowling.ODIs["Econ"],
        average: playerData.data.bowling.ODIs["Ave"],
        best: playerData.data.bowling.ODIs["BBM"]
    }
}
// const results = await Promise.all(cricRequests);
// results.map(result => {
//     const { data } = result;
//     parsedData.players.push(data);
// });
// fs.writeFileSync(path.resolve(__dirname, 'info.json'), JSON.stringify(parsedData));