var express = require('express');
var router = express.Router();

const users = [
  {
    username: "admin",
    password: "1234" 
  },
  {
    username: "jappe",
    password: "1234" 
  },
  {
    username: "liisa",
    password: "1234"
  },
  {
    username: "nalle",
    password: "1234" 
  },
  {
    username: "homer",
    password: "1234" 
  },
  {
    username: "lut",
    password: "1234" 
  },
  {
    username: "kirvesmies",
    password: "1234" 
  },
  {
    username: "cluster",
    password: "1234"
  }
];

// Find if the username and the password match any user
function findInArray(username, password) {
  for (var i = 0,len = users.length; i < len; i++) {
      if ( users[i].username === username && users[i].password === password) { 
          return true;
      }
  }
  return false;
}

router.post( "/", ( req, res, next ) => {
  const user = req.body.user;
  
  // If user is correct, send user back. If user is not found, send "0"
  if(findInArray(user.username, user.password))
    res.status( 200 ).json({ user });
  else
    res.status( 200 ).json({user:"0"});
});

module.exports = router;
