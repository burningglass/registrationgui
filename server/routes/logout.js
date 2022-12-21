const express = require('express');
const router = express.Router();

const lib = require("../lib");

router.get('/', (req, res) => {
  var logoutRedirectURI =
    lib.getConfigValue("SVR_APP_AUTHSERVER_HOST", "", false) +
    lib.getConfigValue("SVR_APP_FRONTCHANNEL_LOGOUT_PATH_PREFIX", "", false) +
    lib.getConfigValue("SVR_APP_AUTHSERVER_CLIENT_ID", "", false) +
    lib.getConfigValue("SVR_APP_REDIRECT_PATH", "", false) +
    lib.getConfigValue("SVR_APP_REDIRECT_URI", "", false)

  console.log(logoutRedirectURI);

  // e.g. 'http://localhost:8180' +
  //      '/auth/realms/registrationrealm/protocol/openid-connect/logout?client_id=' +
  //      'registrationclient' +
  //      '&redirect_uri=' + 
  //      'http://localhost:3001/oauth-callback'
  //      
  res.redirect(logoutRedirectURI);
});

module.exports = router;