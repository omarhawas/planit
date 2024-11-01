import React from 'react';
import ReactDOM from 'react-dom';
import EventList from '../components/EventList';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<EventList />, document.getElementById('events-root'));
});
