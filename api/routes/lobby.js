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

const content = [
  {
      guide: "Fill in the plank",
      question: "It's over anakin I have the ___________! ",
      url: "",//www.flickr.com/photos/44214515@N06/22155578112",
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
      question: "If Finland had area 51, what would be its biggest secret?",
      url: "",//https://pixabay.com/fi/photos/mies-secret-kasvot-salaper%C3%A4inen-4393964/",
      timer: "3"
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
  //res.status( 200 ).json({id: "1234"});
  res.status( 200 ).json({id: gameid});
});

// Request to the questions
router.get( "/content/", ( req, res, next ) => {
  //res.status( 200 ).json({id: "1234"});
  res.status( 200 ).json({content});
});

module.exports = router;
