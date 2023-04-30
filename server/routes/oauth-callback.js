const express = require('express');
const router = express.Router();
const request = require('request');

const lib = require("../lib");

function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

router.get('/', (req, res) => {
  if (!req.query.code) {
    // Now logged out
    console.log('Logged out');

    // Destroy session (deletes browser state carrying token)
    req.session.destroy();

    // Redirect to client's start page (e.g. 'http://localhost:3000')
    res.redirect(lib.getConfigValue("SVR_APP_FRONTENDGUI_LANDING_URI", "", false));
    return;
  }

  // Callback triggered following successful user login
  console.log('Backchannel received code:');
  console.log(req.query.code);
  console.log('Backchannel posting code back to Auth Server to receive new user token...');

  request(
    // POST request to /token endpoint
    // e.g. to 'http://localhost:8180' + '/auth/realms/registrationrealm/protocol/openid-connect/token'
    {
      method: 'POST',
      uri: lib.getConfigValue("SVR_APP_AUTHSERVER_HOST", "", false) + lib.getConfigValue("SVR_APP_BACKCHANNEL_TOKEN_REQUEST_PATH", "", false),
      form: {
        'client_id': lib.getConfigValue("SVR_APP_AUTHSERVER_CLIENT_ID", "", false),
        'client_secret': lib.getConfigValue("SVR_APP_AUTHSERVER_CLIENT_SECRET", "", false),
        'code': req.query.code,
        'grant_type': 'authorization_code',
        'redirect_uri': lib.getConfigValue("SVR_APP_REDIRECT_URI", "", false)
      }
    },

    // callback lambda
    (error, response, body) => {
      console.log('Response body received:');
      console.log(body);

	console.log("Access token extracted/decoded:");
	jwt = parseJwt(JSON.parse(body).id_token); // Note. or .access_token
      console.log(jwt);

      // Save token to session
      console.log('Token saved to session');
      req.session.token = JSON.parse(body).id_token; // Note. or .access_token

      // Redirect to client's start page
      res.redirect(lib.getConfigValue("SVR_APP_FRONTENDGUI_LANDING_URI", "", false));
    }
  );
});

module.exports = router;