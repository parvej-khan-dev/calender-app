// controllers/events.js

const { google } = require("googleapis");

const { getAuthClient } = require("../utils/google-caledar");
require("dotenv").config();

const calendar = google.calendar({ version: "v3" });



// Get all events from the user's calendar
exports.getEvents = async (req, res) => {
  try {
    const auth = await getAuthClient(req.user.tokens);
    const {
      data: { items },
    } = await calendar.events.list({
      auth,
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 1000,
      singleEvents: true,
      orderBy: "startTime",
    });
    res.send(items);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

// Create a new event on the user's calendar
exports.createEvent = async (req, res) => {
  try {
    const auth = await getAuthClient(req.user.tokens);
    // console.log(auth, "auth");
    // Get user's primary calendar ID

    console.log(auth.credentials, "Access Token");

    const { data } = await calendar.events.insert({
      auth: auth,
      calendarId: "primary",
      requestBody: {
        summary: req.body.summary,
        location: req.body.location,
        description: req.body.description,
        start: {
          dateTime: req.body.start,
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: req.body.end,
          timeZone: "Asia/Kolkata",
        },
      },
    });
    res.send(data);
  } catch (error) {
    //   console.error(error);
    res.status(500).send({ message: error.message });
  }
};

// Update an existing event on the user's calendar
exports.updateEvent = async (req, res) => {
  try {
    const auth = await getAuthClient(req.user.tokens);
    const { data } = await calendar.events.update({
      auth,
      calendarId: "primary",
      eventId: req.params.id,
      requestBody: {
        summary: req.body.summary,
        location: req.body.location,
        description: req.body.description,
        start: {
          dateTime: req.body.start,
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: req.body.end,
          timeZone: "Asia/Kolkata",
        },
      },
    });
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

// Delete an existing event from the user's calendar
exports.deleteEvent = async (req, res) => {
  try {
    const auth = await getAuthClient(req.user.tokens);
    await calendar.events.delete({
      auth,
      calendarId: "primary",
      eventId: req.params.id,
    });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.scheduleMeeting = async (req, res) => {
  // console.log(oauth2Client.credentials.access_token, "Access Token");
  const auth = await getAuthClient(req.user.tokens);
  let attendece = req.body.attendees
  const attendeeArray = attendece.map(email => ({ email }));
 const {data} =  await calendar.events.insert({
    calendarId: "primary",
    auth: auth,
    conferenceDataVersion: 1,
    requestBody: {
      summary: req.body.summary,
      description: req.body.description,
      start: {
        dateTime: req.body.start,
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: req.body.end,
        timeZone: "Asia/Kolkata",
      },
      conferenceData: {
        createRequest: {
          requestId: 'randomID',
        },
      },
      attendees: attendeeArray
    },
  });

  res.send({
    msg: "Done",
    data: data
  });
};
