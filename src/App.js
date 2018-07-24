import React, { Component } from 'react';
import './App.css';
import CountriesQuiz from "./countries-quiz/CountriesQuiz.jsx";
import './App.css';
import RobinsElement from './RobinsElement.jsx';
import JoelGame from "./snekboard.js";
import Snake from './Snake.js';

class App extends Component {
  render() {
    return (
        <CountriesQuiz/>
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

