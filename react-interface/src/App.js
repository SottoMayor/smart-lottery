import "./App.css";
import React from "react";
import lottery from "./lottery";
import web3 from "./web3";

class App extends React.Component {

  state = {
    manager: '',
    players: [],
    balance: '',
    value: ''
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance })
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const account = await web3.eth.getAccounts()[1];

    await lottery.methods.enter().send({
      from: account,
      value: web3.utils.toWei(this.state.balance)
    })
  }

  render() {
    return (
      <div>
        <h2>Smart Lottery</h2>
        <p>Manager: {this.state.manager}</p>
        <p>
          There are currently {this.state.players.length} people entered, competiting to win {' '} 
          {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>

        <hr/>

        <form onSubmit={this.onSubmit}>

          <h4>Want to try your luck?</h4>

          <div>
            <label>Amount of Ether to enter:</label>
            <input
             type="text" value={this.state.value} 
             onChange={event => this.setState({value: event.target.value})}
            />
          </div>

          <button>Enter!</button>
        </form>
      </div>
    );
  }
}
export default App;
