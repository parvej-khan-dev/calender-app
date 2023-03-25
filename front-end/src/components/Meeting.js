import React, { useEffect, useState } from "react";
import axios from "axios";
import BACKEND_URL from "../backend";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJhbHJhbS5wb2h1bGFic0BnbWFpbC5jb20iLCJpZCI6IjY0MWVjZTAwMzhjMzA0NzE4Y2QzYWRkZiIsImlhdCI6MTY3OTc0MDUyNH0.OZcW06XG5JNuTvGRtKkVhcsA-WPKNMj5l4B_BnJJ00c";

const Meeting = () => {
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState();
  const [attendees, setAttendees] = useState([]);

  let email = [
    "kparvej761@gmail.com",
    "amrutsagar06@gmail.com",
    "balram.pohulabs@gmail.com",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset the form fields
    console.log(start, "sdsdassa", end);
    const startDate = new Date(start);
    const endDate = new Date(end);
    const startDateTimeConverted = startDate.toISOString();
    const endDateTimeConveted = endDate.toISOString();

    console.log(startDateTimeConverted, "start ");
    console.log(endDateTimeConveted, "end ");
    // Add authorization token to headers
    // const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    // Make a POST request to the events endpoint with the form data and headers
    axios
      .post(
        `${BACKEND_URL}/scheduleMeeting`,
        {
          summary: summary,
          description: description,
          start: startDateTimeConverted,
          end: endDateTimeConveted,
          attendees: attendees,
        },
        config
      )
      .then((res) => {
        console.log(res.data, "data");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="summary">Summary</label>
          <input
            type="text"
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="start">Start Date/Time</label>
          <input
            type="datetime-local"
            id="start"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="end">End Date/Time</label>
          <input
            type="datetime-local"
            id="end"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>
        <div>
        <label>
        Attendees:
        <select
          multiple
          value={attendees}
          onChange={(e) => setAttendees(Array.from(e.target.selectedOptions, (option) => option.value))}
        >
          <option value="kparvej761@gmail.com">kparvej761@gmail.com</option>
          <option value="balram.pohulabs@gmail.com">balram.pohulabs@gmail.com</option>
          <option value="amrutsagar06@gmail.com">amrutsagar06@gmail.com</option>
          <option value="parvej.pohulabs@gmail.com">parvej.pohulabs@gmail.com</option>
        </select>
      </label>
        </div>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default Meeting;
