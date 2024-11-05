// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
// import SignOutButton from '../components/SignOutButton'
// import Events from './Events'

const App = () => (
  <div>
    <h1>Hello from React!</h1>
    <h2>Testing </h2>
  </div>
);

// Render the App component once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  );
});

export default App
