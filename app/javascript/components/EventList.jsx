import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventForm from './EventForm';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const response = await axios.get('/events', { params: { user_id: 1 } });
    setEvents(response.data.events);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/events/${id}`, { data: { user_id: 1 } });
    fetchEvents();
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
  };

  const handleSuccess = () => {
    fetchEvents();
    setEditingEvent(null);
  };

  return (
    <div>
      <h1>Events</h1>
      <EventForm event={editingEvent} onSuccess={handleSuccess} />
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>
              {event.date} at {event.time}
            </p>
            <p>Location: {event.location}</p>
            <button onClick={() => handleEdit(event)}>Edit</button>
            <button onClick={() => handleDelete(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
