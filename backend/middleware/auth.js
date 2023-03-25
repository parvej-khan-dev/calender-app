const { google } = require('googleapis');
require('dotenv').config()

// const config = require('../config/config');

// const { client_id, client_secret, redirect_uris } = config.credentials;
const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

const authenticate = (req, res, next) => {
  const { access_token, refresh_token, expiry_date } = req.user.tokens;

  oAuth2Client.setCredentials({
    access_token,
    refresh_token,
    expiry_date
  });
 

  req.auth = oAuth2Client;
  next();
};

module.exports = {
  authenticate
};
