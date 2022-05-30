import React, { Component } from "react";
import getWeb3 from "./getWeb3";

class Web3Util extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {

    // Update state with the result.
    this.setState({ storageValue: 2 });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="Web3Util">
        <h1>LETS FUCKING GO!</h1>
        <p>WEB3 WORKS FUCKING AMAZING</p>
        <p>Your address is</p>
        {this.state.accounts}
        
      </div>
    );
  }
}

export default Web3Util;
