// src/components/NewEventForm.js

import React, { useState } from "react";
import axios from "axios";
import BACKEND_URL from "../backend";
const NewEventForm = () => {
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState();
  const [link, setLink] = useState("");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtcnV0c2FnYXIxMjMxQGdtYWlsLmNvbSIsImlkIjoiNjQxZTljMWViYWY1YTA0OTU0MWIzZGE0IiwiaWF0IjoxNjc5NzI3OTM0fQ.wN0y8lWJhZdTrRqoYEaOTVaTY-zR7Wmsg3OTf2I537E";

  // axios.interceptors.request.use((config) => {
  //   // const token = localStorage.getItem('token');
  //   if (token) {
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }
  //   return config;
  // });

  let googleAuth = async (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:8000/api/google`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          // "Content-Type" : "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data.data);
        setLink(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let GetAccesToken = async (e) => {
    e.preventDefault();
    axios
      .get(link, {
        headers: {
          // "Access-Control-Allow-Origin": "*",
          // "Content-Type" : "multipart/form-data",

          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data.data);
        setLink(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Reset the form fields
    const startDate = new Date(startDateTime);
    const endDate = new Date(endDateTime);
    const startDateTimeConverted = startDate.toISOString();
    const endDateTimeConveted = endDate.toISOString();
    setSummary(summary);
    setDescription(description);
    setStartDateTime(startDateTime);
    setEndDateTime(endDateTime);
  
    console.log(startDateTimeConverted,"start", endDateTimeConveted,"endTime" )
    console.log(typeof startDateTimeConverted,"start",typeof endDateTimeConveted,"endTime" )
  
    // Add authorization token to headers
    // const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
  
    // Make a POST request to the events endpoint with the form data and headers
    axios.post(`${BACKEND_URL}/events`, {
      summary,
      description,
      start:startDateTimeConverted,
      end: endDateTimeConveted,
    }, config)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <button onClick={googleAuth}>Google Auth</button>
      <button onClick={GetAccesToken}>click for redirect</button>

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
          <label htmlFor="startDateTime">Start Date/Time</label>
          <input
            type="datetime-local"
            id="startDateTime"
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="endDateTime">End Date/Time</label>
          <input
            type="datetime-local"
            id="endDateTime"
            value={endDateTime}
            onChange={(e) => setEndDateTime(e.target.value)}
          />
        </div>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default NewEventForm;
