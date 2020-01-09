var express = require('express');
var router = express.Router();

const posts = [
  {
    name: "admin",
    message:
      "Päivitys tehty"
  },
  {
    name: "jappe",
    message: "JIPPII"
  },
  {
    name: "liisa",
    message:
      "Uusia lihatuotteita myynnissä"
  },
  {
    name: "nalle",
    message: "oorrait"
  },
  {
    name: "homer",
    message: "Ja naurattaahan se tietty :D"
  },
  {
    name: "sale",
    message: "Kaurahiutaleet alennuksessa!"
  },
  {
    name: "kirvesmies",
    message: "Kaikki #teamtrees"
  },
  {
    name: "cluster",
    message: "Moi, me ollaan tite"
  }
];

// Send posts
router.get('/', function(req, res, next) {
  res.json(posts);
});

router.get( "/", ( req, res, next ) => {
  res.status( 200 ).json({ posts });
});

// Add new post to the list
router.post( "/", ( req, res, next ) => {
  const post = req.body.post;
  // Pust the post at the start
  posts.unshift( post );
  res.status( 200 ).json({ post });
});

module.exports = router;
