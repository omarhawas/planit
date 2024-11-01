import React, { useState } from 'react';
import axios from 'axios';

const EventForm = ({ event = {}, onSuccess }) => {
  const [title, setTitle] = useState(event.title || '');
  const [description, setDescription] = useState(event.description || '');
  const [date, setDate] = useState(event.date || '');
  const [time, setTime] = useState(event.time || '');
  const [location, setLocation] = useState(event.location || '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = event.id ? `/events/${event.id}` : '/events';
      const method = event.id ? 'put' : 'post';

      const response = await axios({
        method: method,
        url: url,
        data: {
          event: { title, description, date, time, location },
          user_id: 1,
        },
      });

      onSuccess(response.data.event || response.data);
      resetForm();
    } catch (error) {
      console.error('There was an error!', error.response.data);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setLocation('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" required />
      <button type="submit">{event.id ? 'Update' : 'Create'} Event</button>
    </form>
  );
};

export default EventForm;
