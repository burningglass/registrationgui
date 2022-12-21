const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const lib = require("../lib");

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
    lib.getConfigValue("SVR_APP_AUTHSERVER_HOST", "", false) +
    lib.getConfigValue("SVR_APP_FRONTCHANNEL_LOGIN_PATH_PREFIX", "", false) +
    lib.getConfigValue("SVR_APP_AUTHSERVER_CLIENT_ID", "", false) +
    lib.getConfigValue("SVR_APP_REDIRECT_PATH", "", false) +
    lib.getConfigValue("SVR_APP_REDIRECT_URI", "", false) +
    lib.getConfigValue("SVR_APP_FRONTCHANNEL_LOGIN_PATH_SUFFIX", "", false) +
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