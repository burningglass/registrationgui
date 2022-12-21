const userRoute = (require('./routes/user'));
const loginRoute = (require('./routes/login'));
const logoutRoute = (require('./routes/logout'));
const oauthCallbackRoute = (require('./routes/oauth-callback'));

const modelsRoute = (require('./routes/models'));
const coloursRoute = (require('./routes/colours'));
const registrationsRoute = (require('./routes/registrations'));
const validationErrorsRoute = (require('./routes/validationErrors'));

const express = require('express');
const cors = require('cors');

const lib = require("./lib");

// Remember to 'npm install dotenv' (one time, at the outset)
//  (enables process.env.* to be potentially overridden by the .env file)
const dotenv = require('dotenv').config(); 

// Not all runtime settings are retrieved from process.env
// (some are secrets accessed by lib.js in the local fs)
const PORT = lib.getConfigValue("SVR_APP_LISTENING_PORT", 3001, true);

// Configure express app and install JSON middleware for parsing JSON bodies
const app = express();
app.use(express.json());

// Enable http session support
var session = require('express-session')

app.use(session(
  {
    secret: '1234567890',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: 'auto',
      httpOnly: true,
      maxAge: 3600000
    }
  })
);

// Enable CORS
// (e.g. requests to this API may emerge from a GUI app listening on a different port)
app.use(cors({
  origin: true,
  credentials: true
}));

//Setup routes
app.use('/user', userRoute);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/oauth-callback', oauthCallbackRoute);
app.use('/models', modelsRoute);
app.use('/colours', coloursRoute);
app.use('/registrations', registrationsRoute);
app.use('/validationErrors', validationErrorsRoute);

//Start server
app.listen(PORT, () => console.log(`API listening on port ${PORT}.`));