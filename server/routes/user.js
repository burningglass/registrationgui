const express = require('express');
const router = express.Router();
const request = require('request');

function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

router.get('/', (req, res) => {
  // This will extract/return the user's attributes from the active session
  //
  if (req.session.token) {
    jwt = parseJwt(req.session.token);
    console.log(jwt["email"]);

    res.send({
      email: jwt["email"],
      loggedIn: true
    });
  }
  else {
    res.send({
      email: 'unknown user',
      loggedIn: false
    });   
  }
});

module.exports = router;