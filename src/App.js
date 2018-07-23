import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RobinsElement from './RobinsElement.jsx';
import AnswerButton from './AnswerButton.jsx'

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
