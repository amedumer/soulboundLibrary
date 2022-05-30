import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar/navbar';
import Web3Util from './utils/web3util';

ReactDOM.render(<Web3Util />, document.getElementById('web3util'));
ReactDOM.render(<Navbar />, document.getElementById('navbar'));

