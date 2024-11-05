import React from 'react';
import ReactDOM from 'react-dom';

// Define the main App component
const App = () => (
  <div>
    <h1>Hello React!</h1>
  </div>
);

// Wait for the DOM to be fully loaded before rendering the React app
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,  // Render the App component
    document.getElementById('react-root')  // Render inside the div with ID 'react-root'
  );
});

export default App;

