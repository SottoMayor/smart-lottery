import "./App.css";
import React from "react";
import lottery from "./lottery";
import web3 from "./web3";

class App extends React.Component {

  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance })
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' })

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    })

    this.setState({ message: 'You have been entered. Good luck!' })
  }

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' })

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    })

    this.setState({ message: 'A winner has been picked!' })
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

        <hr/>

          <h4>Ready to pick a winner?</h4>

          <button onClick={this.onClick}>Pick a winner</button>

        <hr/>

        <p>{this.state.message}</p>
      </div>
    );
  }
}
export default App;
