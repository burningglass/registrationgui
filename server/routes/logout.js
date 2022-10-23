const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  var logoutRedirectURI =
    process.env.SVR_APP_AUTHSERVER_HOST +
    process.env.SVR_APP_FRONTCHANNEL_LOGOUT_PATH_PREFIX +
    process.env.SVR_APP_AUTHSERVER_CLIENT_ID +
    process.env.SVR_APP_REDIRECT_PATH +
    process.env.SVR_APP_REDIRECT_URI

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