import React from 'react';
import EventForm from './EventForm';
import { Link } from 'react-router-dom';

const EventItem = ({ event }) => {
  const handleDelete = () => {
    fetch(`/events/${event.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Re-fetch events after deletion
        window.location.reload();
      });
  };

  return (
    <div>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p>{event.date} at {event.time}</p>
      <p>{event.location}</p>
      <button onClick={handleDelete}>Delete</button>
      
      {/* Add link to edit */}
      <Link to={`/events/${event.id}/edit`}>
        <button>Edit Event</button>
      </Link>
    </div>
  );
};

export default EventItem;
