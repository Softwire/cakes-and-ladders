import React, { Component } from 'react';
import './App.css';
<<<<<<< HEAD
import Snake from './Snake.js';
=======
import RobinsElement from './RobinsElement.jsx';
>>>>>>> 7e22c36e91d466a27d1f7316a80b4122eca60267

class App extends Component {
  render() {
    return (
<<<<<<< HEAD
      <div className="App">
        <Snake />
=======
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
>>>>>>> 7e22c36e91d466a27d1f7316a80b4122eca60267
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

<<<<<<< HEAD
export default App;
=======

export default App;
>>>>>>> 7e22c36e91d466a27d1f7316a80b4122eca60267
