import "./App.css";
import React from "react";
import lottery from "./lottery";

class App extends React.Component {

  state = {manager: ''};

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();

    this.setState({ manager })
  }

  render() {
    return (
      <div>
        <h2>Smart Lottery</h2>
        <p>Manager: {this.state.manager}</p>
      </div>
    );
  }
}
export default App;
