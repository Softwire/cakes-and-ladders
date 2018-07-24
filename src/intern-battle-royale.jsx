import React, { Component } from 'react';
import * as _ from 'lodash';

var events = [" deep fried ",
    " threw an angry leech at ",
    " wrote a bot to beat ",
    " pulled a scary face at ",
    " beat ",
    " pretended to run away from ",
    " confused ",
    " beat ",
    " made chickpea curry for ",
    " drank all the coffee, and there was none left for ",
    " ensnared "];
var eventsEnd = [".",
    ".",
    ".",
    ", who died of fright.",
    " in a deadly dance off.",
    " only to lead them into a trap!",
    " with labyrinthine Github structures.",
    " to the lunch queue.",
    " but it was poisoned!",
    ".",
    " in an endless while loop."]
var Nevents = [" ran away from ",
    " temporarily teamed up with ",
    " chose to leave ",
    " and ",
    " and ",
    " and ",
    " and ",
    " threw something shiny to distract "]
var NeventsEnd = [".",
    ".",
    " alone, for now.",
    " decided to call it a draw.",
    " sat down for a nice cup for tea.",
    " agreed to disagree.",
    " sat down together and had a bit of a break.",
    ", and it was very effective."]
var outputEvents = [];

class DisplayBattle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { inputStage: true, internquantity: 6, nameslist: [], };
    }

    createList() {
        var temp = new Array(this.state.internquantity);

        for (var i = 0; i < this.state.internquantity; i++) {
            temp[i] = i;
        }

        return _.map(temp, (i) => <p key={i}> Intern number {i + 1} <input type="text" onChange={(e) => this.updateValue(e, i)} /> </p>)
    }

    updateValue(e, i) {
        var temp = _.clone(this.state.nameslist);
        temp[i] = e.target.value;
        this.setState({ nameslist: temp })
    }
    
    updateNumber(e) {
        this.setState({ internquantity: e.target.value});
    }

    render() {
        var divStyle = {borderWidth: 1, borderStyle: 'solid', borderColor: 'black', width: 300, height: 500, float: 'left', overflow: 'auto', padding: 10}

        return (<div> <div style={divStyle}>
            <p> How many interns are going to battle? <input type="text" onChange={this.updateNumber.bind(this)} /> </p> 
            {this.createList()}
            <button onClick={this.runBattle.bind(this)}> Go </button></div> <div style={divStyle} >
            {outputEvents} </div></div>);
    }

    runBattle() {
        var survivingInterns = new Array(this.state.internquantity);
        for (var i = 0; i < this.state.internquantity; i++) {
            survivingInterns[i] = 1;
        }

        var winners = 6;

        while (winners != 1) {
            
            this.runEncounter(survivingInterns);
            this.forceUpdate();

            winners = 0;
            for (var i = 0; i < this.state.internquantity; i++) {
                if (survivingInterns[i] !== 0) {
                    winners++;
                }
            }
        }

        for (var i = 0; i < this.state.internquantity; i++) {
            if (survivingInterns[i]) {
                outputEvents = outputEvents.concat(<p> {this.state.nameslist[i] + " won!"} </p>);
            }
        }
    }

    runEncounter(survivingInterns) {
        var random = Math.floor(Math.random() * 3);
        if (random <= 1) {
            this.runNeutralEncounter(survivingInterns);
        } else {
            this.runDeadlyEncounter(survivingInterns);
        }
    }

    runDeadlyEncounter(survivingInterns) {
        var random = Math.floor(Math.random() * events.length);
        var randomA = Math.floor(Math.random() * this.state.internquantity);
        while (survivingInterns[randomA] == 0) {
            var randomA = Math.floor(Math.random() * this.state.internquantity);
        }

        var randomB = Math.floor(Math.random() * this.state.internquantity);
        while (survivingInterns[randomB] == 0 || randomB == randomA) {
            var randomB = Math.floor(Math.random() * this.state.internquantity);
        }
        survivingInterns[randomB]--;
        outputEvents = outputEvents.concat(< p > {this.state.nameslist[randomA]}  {events[random]}  {this.state.nameslist[randomB]}{eventsEnd[random]}</p >)

        if (survivingInterns[randomB] == 0) {
            outputEvents = outputEvents.concat(<p> {this.state.nameslist[randomB]} was eliminated! </p>)
        }

    }

    runNeutralEncounter(survivingInterns) {
        var random = Math.floor(Math.random() * Nevents.length);
        var randomA = Math.floor(Math.random() * this.state.internquantity);
        while (survivingInterns[randomA] == 0) {
            var randomA = Math.floor(Math.random() * this.state.internquantity);
        }

        var randomB = Math.floor(Math.random() * this.state.internquantity);
        while (survivingInterns[randomB] == 0 || randomB == randomA) {
            var randomB = Math.floor(Math.random() * this.state.internquantity);
        }
        outputEvents = outputEvents.concat(< p > {this.state.nameslist[randomA]}  {Nevents[random]}  {this.state.nameslist[randomB]}{NeventsEnd[random]}</p >)

    }

}

export default DisplayBattle;