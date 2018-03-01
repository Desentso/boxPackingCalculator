import React, { Component } from 'react';
import Calculator from "./Calculator.js"
import Answer from "./Answer.js"
import "./App.css";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      boxesData: []
    }
  }

  setAnswer = answer => {
    console.log(answer);
    this.setState({boxesData: answer});
  }

  render() {
    return (
      <div>
        <h1>Box Packing Calculator</h1>
        <p>Calculates how many boxes you need, to pack certain amount of bags</p>
        <p>Check out the code from Github <a href="https://github.com/Desentso/boxPackingCalculator">https://github.com/Desentso/boxPackingCalculator</a></p>
        <Calculator setAnswer={this.setAnswer} />

        <Answer boxesData={this.state.boxesData} />
      </div>
    );
  }
}

export default App;
