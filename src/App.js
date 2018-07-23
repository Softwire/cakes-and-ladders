import React, { Component } from 'react';
import './App.css';
import RobinsElement from './RobinsElement.jsx';
import Dynamite from "./Dynamite.js";
import Game from "./snekboard.js";
import Board from "./snekboard.js";
import Square from "./snekboard.js";

class App extends Component {
  render() {
    return (
      <div>
        <div className="tab">
          <button className="tablinks" onClick={(e) => this.openCity(e, "Robin")}>Robin</button>
          <button className="tablinks" onClick={(e) => this.openCity(e, "Eric")}>Eric</button>
          <button className="tablinks" onClick={(e) => this.openCity(e, "Ant")}>Ant</button>
          <button className="tablinks" onClick={(e) => this.openCity(e, "Charlie")}>Charlie</button>
          <button className="tablinks" onClick={(e) => this.openCity(e, "Kate")}>Kate</button>
          <button className="tablinks" onClick={(e) => this.openCity(e, "Joel")}>Joel</button>
        </div>

        <div id="Robin" className="tabcontent">
          <h1> Robin </h1>
          <RobinsElement />
        </div>
        <div id="Joel" className="tabcontent">
          <h1> Joel </h1>
            <div className="App">
              <h1 className="App-title">Welcome to Snek</h1>
                <Game/>
            </div>
        </div>
        <div id="Eric" className="tabcontent">
          <h1> Eric </h1>
        </div>
        <div id="Kate" className="tabcontent">
          <h1> Kate </h1>
        </div>
        <div id="Ant" className="tabcontent">
          <h1> Ant </h1>
        </div>
        <div id="Charlie" className="tabcontent">
          <h1> Charlie </h1>
        </div>
      </div>
    );
  }


  openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }
}

export default App;

