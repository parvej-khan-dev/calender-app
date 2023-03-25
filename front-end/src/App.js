import React from 'react';
import Calendar from './components/Calendar';
import NewEventForm from './components/EventForm';
import Meeting from "./components/Meeting"

const App = () => {
  return (
    <div>
      <Meeting />
      {/* <Calendar />
      <NewEventForm /> */}
    </div>
  );
};

export default App;