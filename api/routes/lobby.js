var express = require('express');
var router = express.Router();

const lobbies = [
  {
    id: "1234",
    players: ["nalle","liisa","runtu"],
    mode: "waiting",
    round: 0
  },
  {
    id: "2554",
    players: ["sinisentalonnalle"],
    mode: "waiting",
    round: 0
  }
];

const content = [
  {
      guide: "Fill in the plank",
      question: "It's over anakin I have the ___________! ",
      url: "",//www.flickr.com/photos/44214515@N06/22155578112",
      timer: "3"
  },
  {
      guide: "Answer something funny",
      question: "If Finland had area 51, what would be its biggest secret?",
      url: "",//https://pixabay.com/fi/photos/mies-secret-kasvot-salaper%C3%A4inen-4393964/",
      timer: "3"
  },
  {
      guide: "Fill in the plank",
      question: "People say I have small hands, but I make up for it with my ______.",
      url: "",//https://fi.wikipedia.org/wiki/Tiedosto:Life_of_George_Washington,_Deathbed.jpg",
      timer: "3"
  },
  {
      guide: "Answer something funny",
      question: "What's the real reason for Mona Lisa's smile?",
      url: "",
      timer: "3"
  }
];

// Find if the lobby exists
function findLobby(id) {
  for (var i = 0,len = lobbies.length; i < len; i++) {
      if (lobbies[i].id == id) {
          return lobbies[i];
      }
  }
  return null;
}

// Set the mode of the lobby
function lobbySetMode(id, mode) {
  for (var i = 0,len = lobbies.length; i < len; i++) {
      if (lobbies[i].id == id) {
          lobbies[i].mode = mode;
      }
  }
  return null;
}

// Set the round of the lobby
function lobbySetRound(id, round) {
  for (var i = 0,len = lobbies.length; i < len; i++) {
      if (lobbies[i].id == id) {
          lobbies[i].round = round;
      }
  }
  return null;
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
  //res.status( 200 ).json({id: "1234"});
  res.status( 200 ).json({id: gameid});
});

// Request to get players of the lobby
router.post( "/players/", ( req, res, next ) => {
  const info = req.body.info;
  let lobby = findLobby(info.gameid.toString());
  if(lobby === null) {
    players = "error";
    res.status( 200 ).json({players: players});
  }
  res.status( 200 ).json({players: lobby.players});
});

// Request to the questions
router.post( "/content/", ( req, res, next ) => {
  const info = req.body.info;
  //res.status( 200 ).json({id: "1234"});
  const data = content[info.round];
  lobbySetRound(info.gameid, info.round)
  res.status( 200 ).json({ content: data });
});

// Request to the questions for mobile
router.post( "/mobilecontent/", ( req, res, next ) => {
  const info = req.body.info;
  //res.status( 200 ).json({id: "1234"});
  const lobby = findLobby(info.gameid);
  const round = lobby.round;
  const data = content[round];
  res.status( 200 ).json({ content: data, round: round });
});

// Request to get state of the lobby
router.post( "/getmode/", ( req, res, next ) => {
  const info = req.body.info;
  let lobby = findLobby(info.gameid.toString());

  res.status( 200 ).json({mode: lobby.mode});
});

// Request to set state of the lobby
router.post( "/setmode/", ( req, res, next ) => {
  const info = req.body.info;
  const gameid = info.gameid.toString();
  const mode = info.mode;

  lobbySetMode(gameid, mode);

  res.status( 200 );
});

module.exports = router;
