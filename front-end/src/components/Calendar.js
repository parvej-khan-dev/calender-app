// src/components/Calendar.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BACKEND_URL from "../backend"
const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Make a GET request to the events endpoint
    axios.get(`${BACKEND_URL}/events`)
      .then(res => {
        setEvents(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h2>My Calendar</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <strong>{event.summary}</strong><br />
            {event.start.dateTime} - {event.end.dateTime}<br />
            {event.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
