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
    this.isCorrectButton = this.isCorrectButton.bind(this);
    this.leftButtonClicked = this.leftButtonClicked.bind(this);
    this.rightButtonClicked = this.rightButtonClicked.bind(this);
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

  isCorrectButton(buttonID) {
    let correct
    if(buttonID == 'left')
      correct = (this.state.leftButtonValue >= this.state.rightButtonValue ? true : false)
    else
      correct = (this.state.rightButtonValue >= this.state.leftButtonValue ? true : false)
    return correct
  }

  leftButtonClicked() {
    console.log("left button was clicked")
    if(this.state.leftButtonValue < this.state.rightButtonValue)
      this.gameEnded();
    else {
      const min = 1;
      const max = 100;
      const rand = Math.round(min + Math.random() * (max - min));
      this.updateRounds();
      this.updateButtonValue('left', rand);
      return rand;
    }
  }

  rightButtonClicked() {
    console.log("right button was clicked")
    if(this.state.rightButtonValue < this.state.leftButtonValue)
      this.gameEnded();
    else {
      const min = 1;
      const max = 100;
      const rand = Math.round(min + Math.random() * (max - min));
      this.updateRounds();
      this.updateButtonValue('right', rand);
      return rand;
    }
  }

  MainDisplay() {
    while(this.state.gameRunning == true)
      return(
      <div>
        <p>You have completed {this.state.completedRounds} round{this.state.completedRounds == 1 ? '':'s'}.</p>
        <Button
        leftButtonClicked = {this.leftButtonClicked}
        rightButtonClicked = {this.rightButtonClicked}
        type = 'left'
        />

        <Button
        leftButtonClicked = {this.leftButtonClicked}
        rightButtonClicked = {this.rightButtonClicked}
        type = 'right'
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
      <p>Here, we will play a little game. Below are two buttons; click the button displaying the higher number. </p>
        <this.MainDisplay />
    </div>
    );
  }
}


class Button extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { random: 50 };
  }

  handleClick() {
    console.log(this)
    console.log(this.props.type)
    let new_value
    if(this.props.type == "left")
      new_value = this.props.leftButtonClicked();
    else
      new_value = this.props.rightButtonClicked();
    this.setState({random: new_value});
  }

  render() {
    return (
        <button onClick={this.handleClick.bind(this)}>{this.state.random}</button>
    );
  }
}


export default App;
