import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    const element = <h1>Hello, world!</h1>;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <RobinsElement />
      </div>
    );
  }
}

class RobinsElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameRunning: true,
      completedRounds: 0,
      leftButtonValue: 50,
      rightButtonValue: 50
    };
    this.updateRounds = this.updateRounds.bind(this);
    this.updateButtonValue = this.updateButtonValue.bind(this);
    this.buttonClicked = this.buttonClicked.bind(this);
    this.gameEnded = this.gameEnded.bind(this);
    this.MainDisplay = this.MainDisplay.bind(this);
  }

  updateRounds() {
    this.setState(prevState => (
      {completedRounds : prevState.completedRounds +1}
    ))
  }

  updateButtonValue(buttonID, value) {
    if(buttonID == 'left')
      this.setState({leftButtonValue : value})
    else 
      this.setState({rightButtonValue: value})
  }

  buttonClicked(buttonID) {
    if((buttonID == 'right' && this.state.rightButtonValue < this.state.leftButtonValue) 
    || (buttonID == 'left' && this.state.leftButtonValue < this.state.rightButtonValue))
      this.gameEnded();
    else {
      const min = 1;
      const max = 100;
      const randLeft = Math.round(min + Math.random() * (max - min));
      const randRight = Math.round(min + Math.random() * (max - min));
      this.updateRounds();
      this.updateButtonValue('left', randLeft);
      this.updateButtonValue('right', randRight);
    }
  }

  MainDisplay() {
    while(this.state.gameRunning == true)
      return(
      <div>
        <p>You have completed {this.state.completedRounds} round{this.state.completedRounds == 1 ? '':'s'}.</p>
        <Button
        buttonClicked = {this.buttonClicked}
        type = 'left'
        value = {this.state.leftButtonValue}
        />

        <Button
        buttonClicked = {this.buttonClicked}
        type = 'right'
        value = {this.state.rightButtonValue}
        />
      </div>
      );

    return(
        <p> GAME OVER. You reached round {this.state.completedRounds}! </p>
    );
  }


  gameEnded() {
    this.setState({gameRunning : false})
  }

  render() {
    return (
    <div>
      <h2>Hello, and welcome to Robin's component of fun and glory</h2>
      <p>Click the button displaying the higher number. </p>
        <this.MainDisplay />
    </div>
    );
  }
}


class Button extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(this)
    this.props.buttonClicked(this.props.type)
  }

  render() {
    return (
        <button onClick={this.handleClick.bind(this)}>{this.props.value}</button>
    );
  }
}


export default App;
