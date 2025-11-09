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
    try {
        const data = await parseCSV('./data/dim_competition.csv');
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch competitions', message: error.message });
    }
});

app.get('/teams', async (req, res) => {
    try {
        const data = await parseCSV('./data/dim_team.csv');
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams', message: error.message });
    }
});

app.get('/players', async (req, res) => {
    try {
        const data = await parseCSV('./data/dim_player.csv');
        // Mock positions and performance scores
        const mockedPlayers = data.map(player => ({
            ...player,
            position: ['GK', 'DEF', 'MID', 'FWD'][Math.floor(Math.random() * 4)],
            performanceScore: Math.random() * 100 + (player.player_name_std && (player.player_name_std.includes('Ronaldo') || player.player_name_std.includes('Mahrez')) ? 20 : 0),
        }));
        res.json(mockedPlayers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch players', message: error.message });
    }
});

app.get('/matches', async (req, res) => {
    try {
        const data = await parseCSV('./data/dim_match.csv');
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch matches', message: error.message });
    }
});

app.get('/stats', async (req, res) => {
    try {
        const data = await parseCSV('./data/fact_match_wyscout.csv');
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stats', message: error.message });
    }
});

app.get('/ai/rank-players', async (req, res) => {
    try {
        const players = await parseCSV('./data/dim_player.csv');
        const ranked = players.map(p => ({
            ...p,
            performanceScore: Math.random() * 100,
        })).sort((a, b) => b.performanceScore - a.performanceScore);
        res.json(ranked);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch player rankings', message: error.message });
    }
});

app.post('/ai/substitute', (req, res) => {
    try {
        const { playerId, replacementId } = req.body;
        if (!playerId || !replacementId) {
            return res.status(400).json({ error: 'Player ID and Replacement ID are required' });
        }
        res.json({ success: true, message: `Substituted player ${playerId} with ${replacementId}` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to process substitution', message: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));