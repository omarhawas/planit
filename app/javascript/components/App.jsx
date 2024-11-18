import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import EventList from './EventList';
import EventForm from './EventForm';
import Greeting from './Greeting'

const App = () => {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateEvent = (newEventData) => {
    fetch('/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event: newEventData }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle successful creation
        window.location.reload(); // Or trigger re-fetch of data
      });
  };

  return (
    <Router>
      <div>
        <h1>Event Management</h1>
        <Greeting />

        <Routes>
          <Route path="/events" element={<EventList />} />
          <Route 
            path="/events/create" 
            element={<EventForm onSubmit={handleCreateEvent} />} 
          />
          {/* Other routes can be added here for editing or deleting events */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
