// main.js
document.addEventListener('DOMContentLoaded', () => {
  const standingsLink = document.getElementById('standingsLink');
  const skaterLeadersLink = document.getElementById('skaterLeadersLink');
  const goalieLeadersLink = document.getElementById('goalieLeadersLink');
  const teamsLink = document.getElementById('teamsLink');
  const scheduleLink = document.getElementById('scheduleLink');
  const darkModeToggle = document.getElementById('darkModeToggle');

  standingsLink.addEventListener('click', (e) => {
    e.preventDefault();
    loadStandings();
  });
  skaterLeadersLink.addEventListener('click', (e) => {
    e.preventDefault();
    loadSkaterLeaders();
  });
  goalieLeadersLink.addEventListener('click', (e) => {
    e.preventDefault();
    loadGoalieLeaders();
  });
  teamsLink.addEventListener('click', (e) => {
    e.preventDefault();
    loadTeams();
  });
  scheduleLink.addEventListener('click', (e) => {
    e.preventDefault();
    loadSchedule();
  });
  darkModeToggle.addEventListener('click', toggleDarkMode);

  // Load standings by default
  loadStandings();
});
// Toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

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

  const standings = data.standings;

  // Build standings table
  let table = '<table><thead><tr><th>Conference</th><th>Team</th><th>GP</th><th>W</th><th>L</th><th>OT</th><th>Pts</th></tr></thead><tbody>';

  standings.forEach(record => {
    const conference = record.conferenceAbbrev;
    const teamName = record.teamName.default;
    const teamId = record.teamId;
    const teamLogo = record.teamLogo;
    const gamesPlayed = record.gamesPlayed;
    const wins = record.wins;
    const losses = record.losses;
    const otLosses = record.otLosses;
    const points = record.points;

    table += `<tr>
      <td>${conference}</td>
      <td>
        <img src="${teamLogo}" alt="${teamName}" class="team-logo">
        <a href="#" onclick="loadTeamDetails(${teamId})">${teamName}</a>
      </td>
      <td>${gamesPlayed}</td>
      <td>${wins}</td>
      <td>${losses}</td>
      <td>${otLosses}</td>
      <td>${points}</td>
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
  content.innerHTML = '<h2>Current Skater Leaders - Goals</h2>';

  const players = data.goals; // Adjust based on the specific stat you want to display

  // Check if players data exists
  if (!players) {
    content.innerHTML += '<p>No skater leader data available.</p>';
    return;
  }

  // Build leaders table
  let table = '<table><thead><tr><th>Player</th><th>Team</th><th>Goals</th></tr></thead><tbody>';

  players.forEach(player => {
    const playerId = player.id;
    const playerName = `${player.firstName.default} ${player.lastName.default}`;
    const playerImage = `https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${playerId}.jpg`;
    const teamLogo = player.teamLogo;
    const teamAbbrev = player.teamAbbrev;
    const goals = player.value; // Assuming 'value' holds the goals

    table += `<tr>
      <td>
        <img src="${playerImage}" alt="${playerName}" class="player-photo">
        <a href="#" onclick="loadPlayerInfo(${playerId})">${playerName}</a>
      </td>
      <td>
        <img src="${teamLogo}" alt="${teamAbbrev}" class="team-logo">
        ${teamAbbrev}
      </td>
      <td>${goals}</td>
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
  content.innerHTML = '<h2>Goalie Leaders - Wins</h2>';

  const goalies = data.wins; // Assuming 'wins' is the property with goalie wins leaders

  if (!goalies || goalies.length === 0) {
    content.innerHTML += '<p>No goalie leader data available.</p>';
    return;
  }

  // Build leaders table
  let table = '<table><thead><tr><th>Player</th><th>Team</th><th>Wins</th></tr></thead><tbody>';

  goalies.forEach(player => {
    const playerId = player.id;
    const playerName = `${player.firstName.default} ${player.lastName.default}`;
    const playerImage = `https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${playerId}.jpg`;
    const teamLogo = player.teamLogo;
    const teamAbbrev = player.teamAbbrev;
    const wins = player.value; // Assuming 'value' holds the number of wins

    table += `<tr>
      <td>
        <img src="${playerImage}" alt="${playerName}" class="player-photo">
        <a href="#" onclick="loadPlayerInfo(${playerId})">${playerName}</a>
      </td>
      <td>
        <img src="${teamLogo}" alt="${teamAbbrev}" class="team-logo">
        ${teamAbbrev}
      </td>
      <td>${wins}</td>
    </tr>`;
  });

  table += '</tbody></table>';
  content.innerHTML += table;
}



function displayTeams(data) {
  const content = document.getElementById('content');
  content.innerHTML = '<h2>NHL Teams</h2>';

  const teams = data.data;

  // Build teams list
  let html = '<ul class="team-list">';
  teams.forEach(team => {
    const teamId = team.id;
    const teamName = team.fullName;
    const teamLogo = `https://assets.nhle.com/logos/nhl/svg/${team.triCode}_light.svg`;

    html += `<li>
      <img src="${teamLogo}" alt="${teamName}" class="team-logo">
      <a href="#" onclick="loadTeamDetails(${teamId})">${teamName}</a>
    </li>`;
  });
  html += '</ul>';
  content.innerHTML += html;
}

// Function to load team details (roster and schedule)
function loadTeamDetails(teamId) {
  loadTeamRoster(teamId);
}

// Function to load team roster
function loadTeamRoster(teamId) {
  fetch(`/api/teams/${teamId}/roster`)
    .then(response => response.json())
    .then(data => {
      displayTeamRoster(data, teamId);
    })
    .catch(error => {
      console.error('Error loading team roster:', error);
    });
}

function displayTeamRoster(data, teamId) {
  const content = document.getElementById('content');
  content.innerHTML = '<h2>Team Roster</h2>';

  const players = data.roster; // Adjusted based on actual API response

  // Build roster table
  let table = '<table><thead><tr><th>Name</th><th>Position</th><th>Number</th></tr></thead><tbody>';

  players.forEach(player => {
    const playerId = player.person.id;
    const playerImage = `https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${playerId}.jpg`;

    table += `<tr>
      <td>
        <img src="${playerImage}" alt="${player.person.fullName}" class="player-photo">
        <a href="#" onclick="loadPlayerInfo(${playerId})">${player.person.fullName}</a>
      </td>
      <td>${player.position.name}</td>
      <td>${player.jerseyNumber}</td>
    </tr>`;
  });

  table += '</tbody></table>';
  content.innerHTML += table;

  // Add a button to load the team's upcoming schedule
  content.innerHTML += `<button onclick="loadTeamSchedule(${teamId})">View Upcoming Schedule</button>`;
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

  const gameWeek = data.gameWeek;

  if (gameWeek && gameWeek.length > 0) {
    // Build schedule list
    let html = '<ul>';
    gameWeek.forEach(day => {
      const date = day.date;
      const games = day.games;

      games.forEach(game => {
        const homeTeam = game.homeTeam.placeName.default;
        const awayTeam = game.awayTeam.placeName.default;
        const gameTimeUTC = game.startTimeUTC;
        const gameTime = new Date(gameTimeUTC).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: game.venueTimezone });

        html += `<li>${date}: ${awayTeam} @ ${homeTeam} - ${gameTime}</li>`;
      });
    });
    html += '</ul>';
    content.innerHTML += html;
  } else {
    content.innerHTML += '<p>No games scheduled for today.</p>';
  }
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

  const player = data.people[0]; // Adjusted according to actual data structure

  let html = `
    <h3>${player.fullName}</h3>
    <img src="https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${player.id}.jpg" alt="${player.fullName}" class="player-photo-large">
    <p>Position: ${player.primaryPosition.name}</p>
    <p>Team: ${player.currentTeam.name}</p>
    <p>Height: ${player.height}</p>
    <p>Weight: ${player.weight}</p>
    <p>Birth Date: ${player.birthDate}</p>
  `;

  content.innerHTML += html;

  // Load player's recent game log
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

  const stats = data.stats[0].splits; // Adjusted according to actual API response

  if (stats && stats.length > 0) {
    // Build game log table
    let table = '<table><thead><tr><th>Date</th><th>Opponent</th><th>G</th><th>A</th><th>P</th></tr></thead><tbody>';

    stats.forEach(game => {
      const date = game.date;
      const opponent = game.opponent.name;
      const goals = game.stat.goals;
      const assists = game.stat.assists;
      const points = goals + assists;

      table += `<tr>
        <td>${date}</td>
        <td>${opponent}</td>
        <td>${goals}</td>
        <td>${assists}</td>
        <td>${points}</td>
      </tr>`;
    });

    table += '</tbody></table>';
    content.innerHTML += table;
  } else {
    content.innerHTML += '<p>No recent games available.</p>';
  }
}

// Function to load upcoming schedule for a team
function loadTeamSchedule(teamId) {
  fetch(`/api/teams/${teamId}/schedule`)
    .then(response => response.json())
    .then(data => {
      displayTeamSchedule(data);
    })
    .catch(error => {
      console.error('Error loading team schedule:', error);
    });
}

function displayTeamSchedule(data) {
  const content = document.getElementById('content');
  content.innerHTML += '<h3>Upcoming Schedule</h3>';

  const dates = data.dates;

  if (dates && dates.length > 0) {
    // Build schedule list
    let html = '<ul>';
    dates.forEach(date => {
      const gameDate = new Date(date.date).toDateString();
      date.games.forEach(game => {
        const opponentTeam = game.teams.away.team.name;
        html += `<li>${gameDate} vs ${opponentTeam}</li>`;
      });
    });
    html += '</ul>';
    content.innerHTML += html;
  } else {
    content.innerHTML += '<p>No upcoming games scheduled.</p>';
  }
}

// Function to load skater milestones
function loadSkaterMilestones() {
  fetch('/api/milestones/skaters')
    .then(response => response.json())
    .then(data => {
      displaySkaterMilestones(data);
    })
    .catch(error => {
      console.error('Error loading skater milestones:', error);
    });
}

function displaySkaterLeaders(data) {
  const content = document.getElementById('content');
  content.innerHTML = '<h2>Skater Leaders - Goals</h2>';

  const players = data.goals; // Assuming 'goals' is the property with goals leaders

  if (!players || players.length === 0) {
    content.innerHTML += '<p>No skater leader data available.</p>';
    return;
  }

  // Build leaders table
  let table = '<table><thead><tr><th>Player</th><th>Team</th><th>Goals</th></tr></thead><tbody>';

  players.forEach(player => {
    const playerId = player.id;
    const playerName = `${player.firstName.default} ${player.lastName.default}`;
    const playerImage = `https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${playerId}.jpg`;
    const teamLogo = player.teamLogo;
    const teamAbbrev = player.teamAbbrev;
    const goals = player.value; // Assuming 'value' holds the number of goals

    table += `<tr>
      <td>
        <img src="${playerImage}" alt="${playerName}" class="player-photo">
        <a href="#" onclick="loadPlayerInfo(${playerId})">${playerName}</a>
      </td>
      <td>
        <img src="${teamLogo}" alt="${teamAbbrev}" class="team-logo">
        ${teamAbbrev}
      </td>
      <td>${goals}</td>
    </tr>`;
  });

  table += '</tbody></table>';
  content.innerHTML += table;
}

