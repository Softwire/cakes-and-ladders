import React, { Component } from 'react';
import './css/App.css';
import CountriesQuiz from "./game-engine/countries-quiz.jsx";

class App extends Component {
  render() {
    return (
      <CountriesQuiz/>
    );
  }
}

export default App;
