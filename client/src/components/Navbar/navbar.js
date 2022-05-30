/* This example requires Tailwind CSS v2.0+ */
import React from 'react';
import ReactDOM from 'react-dom';

export default function Navbar(props) {
  return (
    <React.Fragment>
      <nav className="navbar navbar-dark bg-primary">
        <a href="index.html">
          <span className="navbar-brand mb-0 h2 font-serif">
            Soulbound Library 📚
          </span>
        </a>
        {props.address != null ? (
          <div>
            <span className="navbar-text mb-0 mr-3 color-secondary text-white">
              Logged in as {props.address}
            </span>
            <button type="button" className="btn btn-warning">
              <a href="profile.html">My Books</a>
            </button>
          </div>
        ) : (
          <span className="navbar-text mb-0 color-secondary text-white">
            Not Connected
          </span>
        )}
      </nav>
    </React.Fragment>
  );
}
/*
onClick={() => {
                window.location.href = 'profile.html';
              }}
*/
