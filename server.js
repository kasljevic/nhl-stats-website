// server.js
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

// NHL API base URLs
const API_WEB_BASE_URL = 'https://api-web.nhle.com';
const API_STATS_BASE_URL = 'https://api.nhle.com/stats/rest/en';

async function fetchData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error.message);
    throw error;
  }
}

app.get('/api/standings', async (req, res) => {
  try {
    const url = `${API_WEB_BASE_URL}/v1/standings/now`;
    const data = await fetchData(url);
    res.json(data);
  } catch (error) {
    console.error('Error fetching standings data:', error.message);
    res.status(500).send('Error fetching standings data.');
  }
});



// Route to get current skater stats leaders
app.get('/api/skater-leaders', async (req, res) => {
  try {
    const url = `${API_WEB_BASE_URL}/v1/skater-stats-leaders/current`;
    const data = await fetchData(url);
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching skater leaders data.');
    

  }
});

// Route to get current goalie stats leaders
app.get('/api/goalie-leaders', async (req, res) => {
  try {
    const url = `${API_WEB_BASE_URL}/v1/goalie-stats-leaders/current`;
    const data = await fetchData(url);
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching goalie leaders data.');
    

  }
});

// Route to get team roster
app.get('/api/teams/:teamId/roster', async (req, res) => {
  try {
    const { teamId } = req.params;
    const url = `${API_WEB_BASE_URL}/v1/roster/${teamId}/current`;
    const data = await fetchData(url);
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching team roster data.');
    

  }
});

// Route to get today's schedule
app.get('/api/schedule', async (req, res) => {
  try {
    const url = `${API_WEB_BASE_URL}/v1/schedule/now`;
    const data = await fetchData(url);
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching schedule data.');
    
  }
});

// Route to get specific player info
app.get('/api/players/:playerId', async (req, res) => {
  try {
    const { playerId } = req.params;
    const url = `${API_WEB_BASE_URL}/v1/player/${playerId}/landing`;
    const data = await fetchData(url);
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching player data.');
    

  }
});

// Route to get game log for a specific player
app.get('/api/players/:playerId/game-log', async (req, res) => {
  try {
    const { playerId } = req.params;
    const url = `${API_WEB_BASE_URL}/v1/player/${playerId}/game-log/now`;
    const data = await fetchData(url);
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching player game log data.');
    

  }
});

// Route to get team schedule
app.get('/api/teams/:teamId/schedule', async (req, res) => {
  try {
    const { teamId } = req.params;
    const url = `${API_WEB_BASE_URL}/v1/club-schedule-season/${teamId}/now`;
    const data = await fetchData(url);
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching team schedule data.');
    

  }
});

// Route to get skater milestones
app.get('/api/milestones/skaters', async (req, res) => {
  try {
    const url = `${API_STATS_BASE_URL}/milestones/skaters`;
    const data = await fetchData(url);
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching skater milestones data.');
    

  }
});

// Route to get list of all teams
app.get('/api/teams', async (req, res) => {
  try {
    const url = `${API_STATS_BASE_URL}/team`;
    const data = await fetchData(url);
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching teams data.');
    

  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
});
