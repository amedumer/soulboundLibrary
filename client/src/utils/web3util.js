import React, { Component } from 'react';
import getWeb3 from './getWeb3';
import soulboundLibrary from '../contracts/soulboundLibrary.json';
import Navbar from '../components/Navbar/navbar';

class Web3Util extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    totalSupply: 0,
    userTokens: [],
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = soulboundLibrary.networks[networkId];

      const instance = new web3.eth.Contract(
        soulboundLibrary.abi,
        deployedNetwork && deployedNetwork.address
      );
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState(
        { web3, accounts, contract: instance },
        this.getTotalSupply
      );
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Please make sure you use Metamask`
      );
      console.error(error);
    }
  };

  getPastTransfers = async () => {
    const { contract, accounts } = this.state;
    const events = await contract.getPastEvents('Transfer', {
      filter: { 1: [accounts[0]] },
    });
    let userTokens = [];
    for (let i = 0; i < events.length; i++) {
      userTokens.push(events[i]['returnValues']['2']);
    }
    this.setState({ userTokens });
  };

  getTotalSupply = async () => {
    const { contract } = this.state;
    // Get the value from the contract to prove it worked.
    const response = await contract.methods.totalSupply().call();
    // Update state with the result.
    this.setState({ totalSupply: response });

    this.getPastTransfers();
  };

  render() {
    if (!this.state.web3) {
      return (
        <React.Fragment>
          <Navbar></Navbar>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Navbar address={this.state.accounts[0]}></Navbar>
      </React.Fragment>
    );
  }
}

export default Web3Util;
