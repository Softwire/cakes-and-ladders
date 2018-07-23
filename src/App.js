import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Snake from './Snake.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Snake />
      </div>
    );
  }
}

export default App;