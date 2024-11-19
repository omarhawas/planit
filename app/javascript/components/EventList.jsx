import React, { useEffect, useState } from "react";
import EventItem from "./EventItem";

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/events.json", {
      headers: {
        Accept: "application/json", // Explicitly ask for JSON
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        return response.json();
      })
      .then((data) => {
        setEvents(data); // Update state with fetched events
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div>
      <h2>Event List</h2>
      {Array.isArray(events) && events.length > 0 ? (
        events.map((event) => <EventItem key={event.id} event={event} />)
      ) : (
        <p>No events available</p>
      )}
    </div>
  );
};

export default EventList;
