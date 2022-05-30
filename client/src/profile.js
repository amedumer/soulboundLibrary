import React, { Component } from 'react';
import BookCard from './components/BookCard/bookcard';
import Navbar from './components/Navbar/navbar';
import Web3Util from './utils/web3util';
const axios = require('axios').default;

class ProfileView extends Web3Util {
  //state = { bookISBNs: [], books: [] };

  constructor(props) {
    super(props);
    console.log('constructor called');
    this.state = {
      ...this.state,
      bookISBNs: [],
      books: [],
      loading: true,
    };
  }
  componentDidUpdate = async () => {
    console.log('component did update');
    if (this.state.web3 === null) {
      alert('No web3 detected.');
      return;
    }
    if (this.state.userTokens.length === 0) {
      // no need to fetch data
      console.log('User does not have any tokens.');
      return;
    }
    if (!this.state.loading) {
      //already fetched some data
      console.log('Already fetched books');
      return;
    }
    this.loadBooks();
  };

  loadBooks = async () => {
    const books = [];
    try {
      const userTokens = this.state.userTokens;
      for (var i = 0; i < userTokens.length; i++) {
        const tokenID = userTokens[i];
        const response = await this.state.contract.methods
          .getBook(tokenID)
          .call();
        const book = await this.getBookByISBN(response[0], tokenID);
        books.push(book);
      }
      this.setState({ loading: false, books });
    } catch (err) {
      console.log(err);
    }
  };

  getBookByISBN = async (isbn, tID) => {
    try {
      const book = await axios.get(
        'https://openlibrary.org/isbn/' + isbn + '.json'
      );
      book.data['tokenID'] = tID;
      return book.data;
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div>
        <Navbar address={this.state.accounts}></Navbar>
        <div className="container flex justify-content-center align-items-center pt-4">
          <div className="card p-3">
            <div className="mt-1 text-center">
              <h4 className="mb-0">{this.state.accounts}</h4>

              <div className="d-flex justify-content-around align-items-center mt-4 px-4">
                <div className="stats">
                  <h6 className="mb-0">Books Read</h6>
                  <span>{this.state.userTokens.length}</span>
                </div>

                <div className="stats">
                  <h6 className="mb-0">Total Supply</h6>
                  <span>{this.state.totalSupply}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {this.state.loading ? (
          <h3 className="text-center pt-4">Loading Books</h3>
        ) : (
          <div className="p-3 d-flex justify-content-around align-items-center">
            {this.state.books.map((bk) => {
              return <BookCard book={bk}></BookCard>;
            })}
          </div>
        )}
      </div>
    );
  }
}

export default ProfileView;
