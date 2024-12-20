import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom'; 
import EventList from './EventList';
import EventForm from './EventForm';
import Greeting from './Greeting';

const App = () => {
  const [event, setEvent] = useState(null); // Store event data when editing

  const handleCreateEvent = (newEventData) => {
    fetch('/events', { // Route for creating event
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event: newEventData }), // Send event data as expected by the backend
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Event created:', data);
        window.location.href = '/events'; // Redirect to event list after creation
      })
      .catch((error) => {
        console.error('Error creating event:', error);
      });
  };

  const handleEditEvent = (updatedEventData, id) => {
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(`/events/${id}`, { // Correct route for updating event
      method: 'PATCH',
      headers: {
        "X-CSRF-Token": token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event: updatedEventData }), // Send event data as expected by the backend
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Event updated:', data);
        window.location.href = '/events'; // Redirect to event list after update
      })
      .catch((error) => {
        console.error('Error updating event:', error);
      });
  };

  // Fetch event data when editing an existing event
  const EditEventForm = () => {
    const { id } = useParams(); // Get the event ID from the URL
    const [event, setEvent] = useState(null); // Store event data

    useEffect(() => {
      const fetchEvent = async () => {
        const response = await fetch(`/events/${id}`);
        const data = await response.json();
        setEvent(data);
      };

      if (id) fetchEvent();
    }, [id]);

    if (!event) return <p>Loading event...</p>; // Show a loading message if the event is not fetched yet

    return <EventForm event={event} onSubmit={(updatedEventData) => handleEditEvent(updatedEventData, id)} />;
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
          <Route 
            path="/events/:id/edit" 
            element={<EditEventForm />} // Use the EditEventForm with the event data passed to it
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
