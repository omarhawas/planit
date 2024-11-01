// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import SignOutButton from '../components/SignOutButton'
import Events from './Events'

const App = () => (
  <div>
    <h1>Hello React</h1>
    <SignOutButton />
    <Events />
  </div>
);

// Render the App component once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  );
});
