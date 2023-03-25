// routes/events.js

const express = require('express');
const { authenticate } = require('../middleware/auth');
const {JwtAuth} = require('../controllers/auth')
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  scheduleMeeting
} = require('../controllers/events');

const router = express.Router();

router.get('/events',JwtAuth,  getEvents);
router.post('/events',JwtAuth,
  createEvent);

router.post('/scheduleMeeting',JwtAuth, scheduleMeeting)
router.put('/events/:id',JwtAuth,  updateEvent);
router.delete('/events/:id',JwtAuth,  deleteEvent);

module.exports = router;
