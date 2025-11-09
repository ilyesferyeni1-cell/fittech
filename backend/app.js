const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Parse CSV files
function parseCSV(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', reject);
    });
}

// API Endpoints
app.get('/competitions', async (req, res) => {
    const data = await parseCSV('./data/dim_competition.csv');
    res.json(data);
});

app.get('/teams', async (req, res) => {
    const data = await parseCSV('./data/dim_team.csv');
    res.json(data);
});

app.get('/players', async (req, res) => {
    const data = await parseCSV('./data/dim_player.csv');
    // Mock positions and performance scores
    const mockedPlayers = data.map(player => ({
        ...player,
        position: ['GK', 'DEF', 'MID', 'FWD'][Math.floor(Math.random() * 4)],
        performanceScore: Math.random() * 100 + (player.player_name_std.includes('Ronaldo') || player.player_name_std.includes('Mahrez') ? 20 : 0),
    }));
    res.json(mockedPlayers);
});

app.get('/matches', async (req, res) => {
    const data = await parseCSV('./data/dim_match.csv');
    res.json(data);
});

app.get('/stats', async (req, res) => {
    const data = await parseCSV('./data/fact_match_wyscout.csv');
    res.json(data);
});

app.get('/ai/rank-players', async (req, res) => {
    const players = await parseCSV('./data/dim_player.csv');
    const ranked = players.map(p => ({
        ...p,
        performanceScore: Math.random() * 100,
    })).sort((a, b) => a.performanceScore - b.performanceScore);
    res.json(ranked);
});

app.post('/ai/substitute', (req, res) => {
    const { playerId, replacementId } = req.body;
    res.json({ success: true, message: `Substituted player ${playerId} with ${replacementId}` });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));