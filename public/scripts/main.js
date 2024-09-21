// main.js
document.addEventListener('DOMContentLoaded', () => {
    const standingsLink = document.getElementById('standingsLink');
    const skaterLeadersLink = document.getElementById('skaterLeadersLink');
    const goalieLeadersLink = document.getElementById('goalieLeadersLink');
    const teamsLink = document.getElementById('teamsLink');
    const scheduleLink = document.getElementById('scheduleLink');
  
    standingsLink.addEventListener('click', loadStandings);
    skaterLeadersLink.addEventListener('click', loadSkaterLeaders);
    goalieLeadersLink.addEventListener('click', loadGoalieLeaders);
    teamsLink.addEventListener('click', loadTeams);
    scheduleLink.addEventListener('click', loadSchedule);
  
    // Load standings by default
    loadStandings();
  });
  
  // Function to load standings
  function loadStandings() {
    fetch('/api/standings')
      .then(response => response.json())
      .then(data => {
        displayStandings(data);
      })
      .catch(error => {
        console.error('Error loading standings:', error);
      });
  }
  
  function displayStandings(data) {
    const content = document.getElementById('content');
    content.innerHTML = '<h2>Current NHL Standings</h2>';
  
    data = data.data; // Adjust according to actual API response
  
    // Build standings table
    let table = '<table><thead><tr><th>Team</th><th>GP</th><th>W</th><th>L</th><th>OT</th><th>Pts</th></tr></thead><tbody>';
    
    data.teamRecords.forEach(teamRecord => {
      table += `<tr>
        <td>${teamRecord.team.teamName}</td>
        <td>${teamRecord.gamesPlayed}</td>
        <td>${teamRecord.leagueRecord.wins}</td>
        <td>${teamRecord.leagueRecord.losses}</td>
        <td>${teamRecord.leagueRecord.ot}</td>
        <td>${teamRecord.points}</td>
      </tr>`;
    });
  
    table += '</tbody></table>';
    content.innerHTML += table;
  }
  
  // Function to load skater leaders
  function loadSkaterLeaders() {
    fetch('/api/skater-leaders')
      .then(response => response.json())
      .then(data => {
        displaySkaterLeaders(data);
      })
      .catch(error => {
        console.error('Error loading skater leaders:', error);
      });
  }
  
  function displaySkaterLeaders(data) {
    const content = document.getElementById('content');
    content.innerHTML = '<h2>Current Skater Leaders</h2>';
  
    data = data.data; // Adjust according to actual API response
  
    // Build leaders table
    let table = '<table><thead><tr><th>Player</th><th>Team</th><th>Goals</th><th>Assists</th><th>Points</th></tr></thead><tbody>';
    
    data.forEach(player => {
      table += `<tr>
        <td>${player.playerName}</td>
        <td>${player.teamAbbrevs}</td>
        <td>${player.goals}</td>
        <td>${player.assists}</td>
        <td>${player.points}</td>
      </tr>`;
    });
  
    table += '</tbody></table>';
    content.innerHTML += table;
  }
  
  // Function to load goalie leaders
  function loadGoalieLeaders() {
    fetch('/api/goalie-leaders')
      .then(response => response.json())
      .then(data => {
        displayGoalieLeaders(data);
      })
      .catch(error => {
        console.error('Error loading goalie leaders:', error);
      });
  }
  
  function displayGoalieLeaders(data) {
    const content = document.getElementById('content');
    content.innerHTML = '<h2>Current Goalie Leaders</h2>';
  
    data = data.data; // Adjust according to actual API response
  
    // Build leaders table
    let table = '<table><thead><tr><th>Player</th><th>Team</th><th>Wins</th><th>GAA</th><th>Save %</th></tr></thead><tbody>';
    
    data.forEach(player => {
      table += `<tr>
        <td>${player.playerName}</td>
        <td>${player.teamAbbrevs}</td>
        <td>${player.wins}</td>
        <td>${player.goalsAgainstAverage}</td>
        <td>${player.savePercentage}</td>
      </tr>`;
    });
  
    table += '</tbody></table>';
    content.innerHTML += table;
  }
  
  // Function to load teams
  function loadTeams() {
    fetch('/api/teams')
      .then(response => response.json())
      .then(data => {
        displayTeams(data);
      })
      .catch(error => {
        console.error('Error loading teams:', error);
      });
  }
  
  function displayTeams(data) {
    const content = document.getElementById('content');
    content.innerHTML = '<h2>NHL Teams</h2>';
  
    data = data.data; // Adjust according to actual API response
  
    // Build teams list
    let html = '<ul>';
    data.forEach(team => {
      html += `<li><a href="#" onclick="loadTeamRoster(${team.id})">${team.name}</a></li>`;
    });
    html += '</ul>';
    content.innerHTML += html;
  }
  
  // Function to load team roster
  function loadTeamRoster(teamId) {
    fetch(`/api/teams/${teamId}/roster`)
      .then(response => response.json())
      .then(data => {
        displayTeamRoster(data);
      })
      .catch(error => {
        console.error('Error loading team roster:', error);
      });
  }
  
  function displayTeamRoster(data) {
    const content = document.getElementById('content');
    content.innerHTML = '<h2>Team Roster</h2>';
  
    data = data.data; // Adjust according to actual API response
  
    // Build roster table
    let table = '<table><thead><tr><th>Name</th><th>Position</th><th>Number</th></tr></thead><tbody>';
    
    data.roster.forEach(player => {
      table += `<tr>
        <td><a href="#" onclick="loadPlayerInfo(${player.playerId})">${player.playerName}</a></td>
        <td>${player.position}</td>
        <td>${player.jerseyNumber}</td>
      </tr>`;
    });
  
    table += '</tbody></table>';
    content.innerHTML += table;
  }
  
  // Function to load today's schedule
  function loadSchedule() {
    fetch('/api/schedule')
      .then(response => response.json())
      .then(data => {
        displaySchedule(data);
      })
      .catch(error => {
        console.error('Error loading schedule:', error);
      });
  }
  
  function displaySchedule(data) {
    const content = document.getElementById('content');
    content.innerHTML = '<h2>Today\'s Schedule</h2>';
  
    data = data.data; // Adjust according to actual API response
  
    // Build schedule list
    let html = '<ul>';
    data.games.forEach(game => {
      html += `<li>${game.awayTeamAbbrev} @ ${game.homeTeamAbbrev} - ${new Date(game.gameDate).toLocaleTimeString()}</li>`;
    });
    html += '</ul>';
    content.innerHTML += html;
  }
  
  // Function to load player information
  function loadPlayerInfo(playerId) {
    fetch(`/api/players/${playerId}`)
      .then(response => response.json())
      .then(data => {
        displayPlayerInfo(data);
      })
      .catch(error => {
        console.error('Error loading player info:', error);
      });
  }
  
  function displayPlayerInfo(data) {
    const content = document.getElementById('content');
    content.innerHTML = '<h2>Player Information</h2>';
  
    data = data.data; // Adjust according to actual API response
  
    const player = data.player; // Adjust according to actual data structure
  
    let html = `
      <h3>${player.fullName}</h3>
      <p>Position: ${player.primaryPosition.name}</p>
      <p>Team: ${player.currentTeam.name}</p>
      <p>Height: ${player.height}</p>
      <p>Weight: ${player.weight}</p>
      <p>Birth Date: ${player.birthDate}</p>
    `;
  
    content.innerHTML += html;
  
    // Optionally, load game log
    loadPlayerGameLog(player.id);
  }
  
  // Function to load player's game log
  function loadPlayerGameLog(playerId) {
    fetch(`/api/players/${playerId}/game-log`)
      .then(response => response.json())
      .then(data => {
        displayPlayerGameLog(data);
      })
      .catch(error => {
        console.error('Error loading player game log:', error);
      });
  }
  
  function displayPlayerGameLog(data) {
    const content = document.getElementById('content');
    content.innerHTML += '<h3>Recent Games</h3>';
  
    data = data.data; // Adjust according to actual API response
  
    // Build game log table
    let table = '<table><thead><tr><th>Date</th><th>Opponent</th><th>G</th><th>A</th><th>P</th></tr></thead><tbody>';
    
    data.gameLog.forEach(game => {
      table += `<tr>
        <td>${game.gameDate}</td>
        <td>${game.opponent}</td>
        <td>${game.goals}</td>
        <td>${game.assists}</td>
        <td>${game.points}</td>
      </tr>`;
    });
  
    table += '</tbody></table>';
    content.innerHTML += table;
  }
  