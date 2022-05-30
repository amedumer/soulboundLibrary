import React, { Component } from 'react';

export default function BookCard(props) {
  const book = props.book;
  console.log(book);
  return (
    <div className="card w-25">
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">By George Orwell</p>
      </div>
      <ul className="list-group list-group-flush">
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
          Get Details
        </a>
        <a href="#" className="card-link">
          Burn
        </a>
      </div>
    </div>
  );
}
