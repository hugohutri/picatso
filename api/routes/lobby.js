var express = require("express");
var router = express.Router();

const normal = 25;

const lobbies = [
  {
    id: "1234",
    players: [] /*[
      {
        name: "jappe",
        points: 0,
        answers: ["money", "There is a cookie monster", "äijät"]
      },
      {
        name: "liisa",
        points: 0,
        answers: ["suuri miekka", "lightspeed laser", "titeläiset"]
      },
      {
        name: "kirvesmies",
        points: 0,
        answers: ["hat", "sisäänkäynti", "react kurssi"]
      }
    ],*/,
    mode: "waiting",
    round: 0,
    created: new Date().getTime()
  },
  {
    id: "0000",
    players: [
      {
        name: "peka",
        points: 0,
        answers: ["olen bot", "ihan ok juttu", "joopa joo"]
      },
      {
        name: "lompakko",
        points: 0,
        answers: ["suuri miekka", "lihaa myynnissä", "Olen liisa"]
      },
      {
        name: "hiihtäjä",
        points: 0,
        answers: ["puu kaatuu", "oispa kaakaota", "meni päin mäntyä"]
      }
    ],
    mode: "waiting",
    round: 0,
    created: new Date().getTime()
  }
];

const content = [
  {
    guide: "Fill in the plank",
    question: "It's over anakin I have the ___________! ",
    url: "", //www.flickr.com/photos/44214515@N06/22155578112",
    //bigger sword, picture of you and palpatine at a (strip club)/(touching each others lightsabers)
    timer: normal
  },
  {
    guide: "Answer something funny",
    question: "If Finland had area 51, what would be kept there?",
    url: "", //https://pixabay.com/fi/photos/mies-secret-kasvot-salaper%C3%A4inen-4393964/",
    //terminator Kekkonen, 101% alcohol, proof that Finland exists
    timer: normal
  },
  {
    guide: "Answer something funny",
    question: "What's the real reason for Mona Lisa's smile?",
    url: "", //https://fi.wikipedia.org/wiki/Tiedosto:Life_of_George_Washington,_Deathbed.jpg",
    //she's not wearing any pants, holocaust, you would be smiling too if you got paid as much
    timer: normal
  },
  {
    guide: "Fill in the plank",
    question:
      "People say I have small hands, but I make up for it with _________.",
    url: "",
    //enormous ego, shooting missiles into Iran, an even smaller penis,
    timer: normal
  },
  {
    guide: "Answer something funny",
    question: "What's the real reason behind global warming?",
    url: "",
    //kitka aukkioppilaiden aseen hinkkauksesta
    timer: normal
  },
  {
    guide: "Answer something funny",
    question: "Best pickup line at a Minecraft convention?",
    url: "",
    //I heard they added Love in the last patch and only thing missing from my recipe is you; If you were creeper I wouldn't turn around if you snuck up behind me.
    timer: normal
  },
  {
    guide: "Fill in the plank",
    question:
      "I don't want to go to sleep, I'm scared of _______ under the bed!",
    url: "",
    //the president, GOT season 8 writing team,
    timer: normal
  },
  {
    guide: "Fill in the plank",
    question:
      "We live in dark times, but someday, ________ will descend from the sky and save us all.",
    url: "",
    //microsoft office suite that actually works and installs without conflicts, a robot voiced by Morgan Freeman that narrates your life
    timer: normal
  },
  {
    guide: "Fill in the plank",
    question: "I know, I know... I shouldn't use _________ as my password.",
    url: "",
    //hitlerDidNothingWrong69,
    timer: normal
  },
  {
    guide: "Answer something funny",
    question:
      "Worst thing for the doctor to say, right as the patient is going under anesthesia?",
    url: "",
    //was it the right or the left leg?, I'm gonna need a tasoittava to make it, just dump him with the rest, "Hello, I'm mr. Bean"
    timer: normal
  },
  {
    guide: "Fill in the plank",
    question: "What's something little known about the world of Harry Potter?",
    url: "",
    //they sniff glue just like the rest of us, in book 8 hagrid killed all the younglings,
    timer: normal
  },
  {
    guide: "Fill in the plank",
    question:
      "What did I tell you, dear Watson? All it takes to solve a mystery is deductive reasoning and _______.",
    url: "",
    //just a little bit of cocaine, for you to shut up,
    timer: normal
  },
  {
    guide: "Fill in the plank",
    question: "We should have stopped _______ when we still had the chance.",
    url: "",
    //just a little bit of cocaine, for you to shut up,
    timer: normal
  },
  {
    guide: "Answer something funny",
    question: "What pet did Pope ask to get him for his birthday?",
    url: "",
    //Timmy, batmobile, Ariana Grande's nail clippings, some coke and not the cheap shit
    timer: normal
  },
  {
    guide: "Answer something funny",
    question:
      "What are the real first words said when Apollo 11 landed on the moon?",
    url: "",
    //Aaaaannd CUT!, is that a smuf?, Neil has to lick it first,
    timer: normal
  }
];

function getContent(gameid, round) {
  const len = content.length;
  const idx = (gameid + round) % len;
  return content[idx];
}

// Find if the lobby exists
function findLobby(id) {
  for (var i = 0, len = lobbies.length; i < len; i++) {
    if (lobbies[i].id == id) {
      return lobbies[i];
    }
  }
  return null;
}

// Set the mode of the lobby
function lobbySetMode(id, mode) {
  for (var i = 0, len = lobbies.length; i < len; i++) {
    if (lobbies[i].id == id) {
      lobbies[i].mode = mode;
    }
  }
  return null;
}

// Set the round of the lobby
function lobbySetRound(id, round) {
  for (var i = 0, len = lobbies.length; i < len; i++) {
    if (lobbies[i].id == id) {
      lobbies[i].round = round;
    }
  }
  return null;
}

// Delete lobby
function deleteLobby(id) {
  for (var i = 0, len = lobbies.length; i < len; i++) {
    if (lobbies[i].id == id) {
      // Delete lobby
      lobbies.splice(i, 1);
      return 1;
    }
  }
  return 0;
}

// Add answer
function addAnswer(id, username, answer) {
  // Loop lobbies
  for (var i = 0, len = lobbies.length; i < len; i++) {
    if (lobbies[i].id === id) {
      // Loop players
      const players = lobbies[i].players;
      for (var k = 0, len2 = players.length; k < len2; k++) {
        if (players[k].name === username) {
          // Store the answer
          lobbies[i].players[k].answers.push(answer);
        }
      }
    }
  }
}

// Join to the lobby
function addPoints(id, choice) {
  for (var i = 0, len = lobbies.length; i < len; i++) {
    if (lobbies[i].id === id) {
      // Loop players
      const players = lobbies[i].players;
      for (var k = 0, len2 = players.length; k < len2; k++) {
        if (players[k].name === choice) {
          // add points
          lobbies[i].players[k].points += 100;
        }
      }
    }
  }
}

// Join to the lobby
function joinLobby(id, username) {
  for (var i = 0, len = lobbies.length; i < len; i++) {
    // Delete old lobbies
    const age = new Date().getTime() - lobbies[i].created;
    if (age > 3600000) deleteLobby(lobbies[i].id);
    if (i >= lobbies.length) return -1;

    if (lobbies[i].id === id) {
      if (lobbies[i].players.length >= 12) return 0; // The lobby is full
      const player = {
        name: username,
        points: 0,
        answers: []
      };
      lobbies[i].players.push(player);
      return 1;
    }
  }
  // The lobby does not exist
  return -1;
}

// Create a new lobby
function createLobby() {
  while (true) {
    let gameid = Math.floor(Math.random() * 9999).toString();
    if (findLobby(gameid) !== null) continue;

    const lobby = {
      id: gameid,
      players: [],
      mode: "waiting",
      round: 0,
      created: new Date().getTime()
    };
    lobbies.push(lobby);

    return gameid;
  }
}

// Render lobbies to the page
router.get("/", (req, res, next) => {
  res.status(200).json({ lobbies });
});
router.get("/", function(req, res, next) {
  res.json(lobbies);
});

// Request to join to the lobby
router.post("/join/", (req, res, next) => {
  const info = req.body.info;

  // Lobby status:
  // success: 1
  // full: 0
  // not found: -1
  let lobbyStatus = joinLobby(info.lobbyid, info.username);
  res.status(200).json({ lobbyStatus: lobbyStatus });
});

// Request to create a lobby
router.get("/create/", (req, res, next) => {
  let gameid = createLobby();
  //res.status( 200 ).json({id: "1234"});
  res.status(200).json({ id: gameid });
});

// Request to delete a lobby
router.post("/delete/", (req, res, next) => {
  const status = deleteLobby(req.body.info.gameid.toString());
  //res.status( 200 ).json({id: "1234"});
  res.status(200).json({ status: status });
});

// Request to get players of the lobby
router.post("/players/", (req, res, next) => {
  const info = req.body.info;
  let lobby = findLobby(info.gameid.toString());
  if (lobby === null) {
    players = null;
    res.status(200).json({ players: players, error: true });
  }
  res.status(200).json({ players: lobby.players });
});

// Request to the questions
router.post("/content/", (req, res, next) => {
  const info = req.body.info;
  //res.status( 200 ).json({id: "1234"});
  //const data = content[info.round];
  const content = getContent(info.gameid, info.round);
  lobbySetRound(info.gameid, info.round);
  res.status(200).json({ content: content });
});

// Request to the questions for mobile
router.post("/mobilecontent/", (req, res, next) => {
  const info = req.body.info;
  //res.status( 200 ).json({id: "1234"});
  const lobby = findLobby(info.gameid);
  const round = lobby.round;
  const data = getContent(info.gameid, round);
  res.status(200).json({ content: data, round: round });
});

// Request to get state of the lobby
router.post("/getmode/", (req, res, next) => {
  const info = req.body.info;
  let lobby = findLobby(info.gameid.toString());

  res.status(200).json({ mode: lobby.mode });
});

// Request to get round of the lobby
router.post("/getround/", (req, res, next) => {
  const info = req.body.info;
  let lobby = findLobby(info.gameid.toString());

  res.status(200).json({ round: lobby.round });
});

// Request to set state of the lobby
router.post("/setmode/", (req, res, next) => {
  const info = req.body.info;
  const gameid = info.gameid.toString();
  const mode = info.mode;

  lobbySetMode(gameid, mode);

  res.status(200).json({ mode: mode });
});

// Request to set round of the lobby
router.post("/setround/", (req, res, next) => {
  const info = req.body.info;
  const gameid = info.gameid.toString();
  const round = info.round;

  lobbySetRound(gameid, round);

  res.status(200).json({ round: round });
});

// Request to submit an answer for a player
router.post("/submitanswer/", (req, res, next) => {
  const info = req.body.info;

  const gameid = info.gameid.toString();
  const username = info.username;
  const answer = info.answer;

  addAnswer(gameid, username, answer);

  res.status(200).json({ answer });
});

// Request to set state of the lobby
router.post("/vote/", (req, res, next) => {
  const info = req.body.info;
  const gameid = info.gameid.toString();
  const choice = info.choice;

  addPoints(gameid, choice);

  res.status(200).json({ choice: choice });
});

module.exports = router;
