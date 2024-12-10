import React, { useState, useEffect } from 'react';

const EventForm = ({ event, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
  });

  // Pre-fill form for editing
  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        location: event.location,
      });
    }
  }, [event]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get the CSRF token from the meta tag
    const token = document.querySelector('meta[name="csrf-token"]').content;

    // Send the form data to the backend
    fetch('/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token, // Add CSRF token to headers
      },
      body: JSON.stringify({ event: formData }), // Send form data to the backend
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Event created:', data);
        window.location.href = '/events'; // Redirect after successful creation
      })
      .catch((error) => {
        console.error('Error creating event:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Title"
      />
      <textarea
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Description"
      />
      <input
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
      />
      <input
        type="time"
        value={formData.time}
        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
      />
      <input
        type="text"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        placeholder="Location"
      />
      <button type="submit">
        {event ? 'Update Event' : 'Create Event'}
      </button>
    </form>
  );
};

export default EventForm;
