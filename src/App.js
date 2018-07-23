import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dynamite from "./Dynamite.js";
import Game from "./snekboard.js";
import Board from "./snekboard.js";
import Square from "./snekboard.js";


class App extends Component {
  render() {
    return (
      <div className="App">
          <h1 className="App-title">Welcome to Snek</h1>
            <Game/>
          <p className="App-intro">
        </p>
      </div>


    );
  }
}

export default App;

