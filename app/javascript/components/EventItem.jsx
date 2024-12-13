import React from 'react';
import { Link } from 'react-router-dom';

const EventItem = ({ event }) => {
  const handleDelete = () => {
    // Get the CSRF token from the meta tag
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(`/events/${event.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token, // Include CSRF token here
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('Event deleted successfully');
          // Refresh the page or update the state to reflect the deletion
          window.location.reload();
        } else {
          console.error('Failed to delete event');
        }
      })
      .catch((error) => {
        console.error('Error deleting event:', error);
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
