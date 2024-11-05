import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App'; // Make sure the path is correct

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.getElementById('react-root') // Render inside the div with id="react-root"
  );
});