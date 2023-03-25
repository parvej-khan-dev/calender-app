// utils/google-calendar.js

const { google } = require('googleapis');
require('dotenv').config()

// const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = require('../config');

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// Get an authenticated Google Calendar API client
const getAuthClient = async (tokens) => {
    const { access_token, refresh_token, expiry_date } = tokens;
    oAuth2Client.setCredentials(tokens);
  return oAuth2Client;
};
module.exports = {getAuthClient}