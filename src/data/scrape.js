const express = require('express');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const cricPlayersIds = [253802, 34102, 28235, 28081, 422108, 234675, 625371, 625383, 326016, ]
const url = "https://cricapi.com/api/playerStats";
const app = express();

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

app.get('/scrape', async (_, __) => {
    const jsonFile = fs.readFileSync(path.resolve(__dirname, 'info.json'))
    const parsedData = JSON.parse(jsonFile);

    const results = await Promise.all(cricRequests);
    results.map(result => {
        const { data } = result;
        parsedData.players.push(data);
    });
    fs.writeFileSync(path.resolve(__dirname, 'info.json'), JSON.stringify(parsedData));
})

app.listen(8000, () => console.log("Listening on port 8000"));
module.exports = app;