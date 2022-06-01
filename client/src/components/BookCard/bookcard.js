import React, { Component } from 'react';

export default function BookCard(props) {
  const book = props.book;
  return (
    <div className="card w-25">
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">By George Orwell</p>
      </div>
      <ul id="attr-list" className="list-group list-group-flush">
        <li id="pages" className="list-group-item">
          {book.number_of_pages} pages
        </li>
        <li id="publishDate" className="list-group-item">
          Published {book.publish_date}
        </li>
        <li id="tokenID" className="list-group-item">
          Token ID#{book.tokenID}
        </li>
      </ul>
      <div className="card-body">
        <a
          href={'https://openlibrary.org/' + book.key}
          target="_blank"
          className="card-link"
        >
          <button id="detailsButton" type="button" className="btn btn-warning">
            Get Details
          </button>
        </a>

        <button
          id="burnButton"
          type="button"
          className="btn btn-primary ml-4"
          onClick={() => props.burn(book['tokenID'])}
        >
          Burn
        </button>
      </div>
    </div>
  );
}
