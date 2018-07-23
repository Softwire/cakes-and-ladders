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
    };
    this.updateRounds = this.updateRounds.bind(this);
  }

  updateRounds() {
    this.setState(prevState => (
      {completedRounds : prevState.completedRounds +1}
    ))
  }

  render() {
    return (
    <div>
      <h2>Hello, and welcome to Robin's element of fun and glory</h2>
      <p>Here, we will play a little game. Below, you should see two buttons. You have completed {this.state.completedRounds} round{this.state.completedRounds == 1 ? '':'s'}.</p>
      <Button updateRounds = {this.updateRounds}/>
    </div>
    );
  }
}


class Button extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { random: 'Start' };
  }

  handleClick() {
    const min = 1;
    const max = 100;
    const rand = Math.round(min + Math.random() * (max - min));
    this.props.updateRounds();
    this.setState(
      {random: rand}
    );
  }

  render() {
    return (
        <button onClick={this.handleClick.bind(this)}>{this.state.random}</button>
    );
  }
}


export default App;
