var express = require('express');
var router = express.Router();

const lobbies = [
  {
    id: "1234",
    players: ["pekka","nalle"]
  },
  {
    id: "2554",
    players: ["sinisentalonnalle"]
  }
];

// Find if the lobby exists
function findLobby(id) {
  for (var i = 0,len = lobbies.length; i < len; i++) {
      if (lobbies[i].id === id) {
          if(lobbies[i].players.length > 10)
            return 0;
          return 1;
      }
  }
  return -1;
}

// Join to the lobby
function joinLobby(id, username) {
  for (var i = 0,len = lobbies.length; i < len; i++) {
      if (lobbies[i].id === id) {
          if(lobbies[i].players.length > 10)
            return 0; // The lobby is full
          lobbies[i].players.push(username);
          return 1;
      }
  }
  // The lobby does not exist
  return -1;
}

// Create a new lobby
function createLobby() {
  let gameid = Math.floor(Math.random()*9999).toString();

  const lobby = {
    id: gameid,
    players: [],
  }
  lobbies.push(lobby);

  return gameid;
}

// Render lobbies to the page
router.get( "/", ( req, res, next ) => {
  res.status( 200 ).json({ lobbies });
});
router.get('/', function(req, res, next) {
  res.json(lobbies);
});


// Request to join to the lobby
router.post( "/join/", ( req, res, next ) => {
  const info = req.body.info;
  
  // Lobby status:
  // success: 1
  // full: 0
  // not found: -1
  let lobbyStatus = joinLobby(info.lobbyid, info.username);
  res.status( 200 ).json({ lobbyStatus });
});

// Request to create a lobby
router.get( "/create/", ( req, res, next ) => {
  
  let gameid = createLobby();
  res.status( 200 ).json(gameid);
});

module.exports = router;
