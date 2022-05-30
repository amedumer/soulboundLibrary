/* This example requires Tailwind CSS v2.0+ */
import React from 'react';
import ReactDOM from 'react-dom';

export default function Navbar(props) {
  return (
    <React.Fragment>
        <nav class="navbar navbar-dark bg-primary">
          <span class="navbar-brand mb-0 h2 font-serif">Soulbound Library 📚</span>
          {props.address != null ? <span class="navbar-text mb-0 color-secondary text-white">Logged in as {props.address}</span> : <span class="navbar-text mb-0 color-secondary text-white">Not Connected</span> }
        </nav>
    </React.Fragment>
  )
}

