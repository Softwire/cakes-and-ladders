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
      timeAllowed: 5,
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
      var randRight = Math.round(min + Math.random() * (max - min));
      while(randRight == randLeft)
        randRight = Math.round(min + Math.random() * (max - min));
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
        <this.startClock
        countdownFrom = {2}
        completedRounds = {this.state.completedRounds}
        gameEnded = {this.gameEnded}
        />
      </div>
      );

    return(
        <p> GAME OVER. You reached round {this.state.completedRounds}! </p>
    );
  }

  startClock(props) {
    console.log(props.completedRounds)
    if(props.completedRounds >0)
      return <Clock 
      countdownFrom={props.countdownFrom}
      gameEnded = {props.gameEnded}
       />;
    else
      return null;
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
    this.props.buttonClicked(this.props.type)
  }

  render() {
    return (
        <button onClick={this.handleClick.bind(this)}>{this.props.value}</button>
    );
  }
}

class Clock extends React.Component {
  constructor(props){
    super(props);
    this.state = {currentCount: props.countdownFrom}
  }
  timer() {
    this.setState({
      currentCount: this.state.currentCount - 1
    })
    if(this.state.currentCount < 1) { 
      clearInterval(this.intervalId)
      this.props.gameEnded()
    }
  }
  componentDidMount() {
    this.intervalId = setInterval(this.timer.bind(this), 1000);
  }
  componentWillUnmount(){
    clearInterval(this.intervalId);
  }
  render() {
    return(
      <div>Time remaining:{this.state.currentCount}</div>
    );
  }
}


export default App;
