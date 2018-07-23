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
      isToggleOn: true,
      completedRounds: 0,
      leftButtonValue: null,
      rightButtonValue: null
    };
    this.updateRounds = this.updateRounds.bind(this);
    this.updateButtonValue = this.updateButtonValue.bind(this);
    this.isCorrectButton = this.isCorrectButton.bind(this);
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
      correct = this.state.leftButtonValue >= this.state.rightButtonValue ? true : false
    else
      correct = this.state.rightButtonValue >= this.state.leftButtonValue ? true : false
    return correct
  }

  render() {
    return (
    <div>
      <h2>Hello, and welcome to Robin's element of fun and glory</h2>
      <p>Here, we will play a little game. You have completed {this.state.completedRounds} round{this.state.completedRounds == 1 ? '':'s'}.</p>

      <Button
      updateRounds = {this.updateRounds}
      updateButtonValue = {this.updateButtonValue}
      isCorrectButton = {this.isCorrectButton}
      type = 'left'
      />

      <Button
      updateRounds = {this.updateRounds}
      updateButtonValue = {this.updateButtonValue}
      isCorrectButton = {this.isCorrectButton}
      type = 'right'
      />
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
    const min = 1;
    const max = 100;
    const rand = Math.round(min + Math.random() * (max - min));
    this.setState(
      {random: rand}
    );
    this.props.updateRounds();
    this.props.updateButtonValue(this.type, rand);
    if(!this.props.isCorrectButton(this.type))
    this.setState(
      {random: 'FALSE'}
    );
  }

  render() {
    return (
        <button onClick={this.handleClick.bind(this)}>{this.state.random}</button>
    );
  }
}


export default App;
