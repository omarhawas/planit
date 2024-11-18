import React, { useEffect, useState } from 'react';
import EventItem from './EventItem';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/events')
      .then((response) => response.json())
      .then((data) => {
        setEvents(data); // Directly setting the fetched events as the array
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div>
      <h2>Event List</h2>
      {/* Check if events is an array and not empty */}
      {Array.isArray(events) && events.length > 0 ? (
        events.map((event) => (
          <EventItem key={event.id} event={event} />
        ))
      ) : (
        <p>No events available</p>
      )}
    </div>
  );
};

export default EventList;
