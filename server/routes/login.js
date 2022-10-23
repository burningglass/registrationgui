const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const dotenv = require('dotenv').config(); 

router.base64URLEncode = function (str) {
  return str.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

router.get('/', (req, res) => {
  const state = router.base64URLEncode(crypto.randomBytes(64));
  req.oauthState = state;

  var loginRedirectURI =
    process.env.SVR_APP_AUTHSERVER_HOST +
    process.env.SVR_APP_FRONTCHANNEL_LOGIN_PATH_PREFIX +
    process.env.SVR_APP_AUTHSERVER_CLIENT_ID +
    process.env.SVR_APP_REDIRECT_PATH +
    process.env.SVR_APP_REDIRECT_URI +
    process.env.SVR_APP_FRONTCHANNEL_LOGIN_PATH_SUFFIX + 
    state;

  console.log(loginRedirectURI);

  // e.g. 'http://localhost:8180' +
  //      '/auth/realms/registrationrealm/protocol/openid-connect/auth?client_id=' +
  //      'registrationclient' +
  //      '&redirect_uri=' + 
  //      'http://localhost:3001/oauth-callback' +
  //      '&response_type=code&state='
  //
  res.redirect(loginRedirectURI);
});

module.exports = router;