import React, { Component } from 'react';
import AnswerButton from './AnswerButton.jsx'
import Clock from './Clock.jsx'

class RobinsElement extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        highScore: 0,
        firstRunning: true,
        gameRunning: false,
        completedRounds: 0,
        timeAllowed: 5,
        leftButtonValue: 50,
        rightButtonValue: 50
      };
      this.updateRounds = this.updateRounds.bind(this);
      this.updateButtonValue = this.updateButtonValue.bind(this);
      this.buttonClicked = this.buttonClicked.bind(this);
      this.gameEnded = this.gameEnded.bind(this);
      this.MainDisplay = this.MainDisplay.bind(this);
      this.handleClick = this.handleClick.bind(this);
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
  
    buttonClicked(buttonID) {
      if((buttonID == 'right' && this.state.rightButtonValue < this.state.leftButtonValue) 
      || (buttonID == 'left' && this.state.leftButtonValue < this.state.rightButtonValue))
        this.gameEnded();
      else {
        const min = 1;
        const max = 100;
        const randLeft = Math.round(min + Math.random() * (max - min));
        var randRight = Math.round(min + Math.random() * (max - min));
        while(randRight == randLeft)
          randRight = Math.round(min + Math.random() * (max - min));
        this.updateRounds();
        this.updateButtonValue('left', randLeft);
        this.updateButtonValue('right', randRight);
      }
    }
  
    handleClick() {
      this.setState(
        { firstRunning: false,
          gameRunning: true,
          completedRounds: 0,
          timeAllowed: 5,
          leftButtonValue: 50,
          rightButtonValue: 50}
      )
    }
  
    MainDisplay() {
      if(this.state.firstRunning == true)
        return(<div>
            <p> In this game, you will have {this.state.timeAllowed} seconds to complete as many rounds as possible.
            In each round, all you need to do is click the bigger number. See how far you can get in this monstrously exciting game! </p>
        <button onClick={this.handleClick.bind(this)}>Start</button>
        </div>)
      while(true) {
        while(this.state.gameRunning == true)
          return(
          <div>
            <p>Click the button displaying the higher number. </p>
            <p><i> The furthest round anyone has reached is round {this.state.highScore} </i></p>
            <p>You have completed {this.state.completedRounds} round{this.state.completedRounds == 1 ? '':'s'}.</p>
            <AnswerButton
            buttonClicked = {this.buttonClicked}
            type = 'left'
            value = {this.state.leftButtonValue}
            />
  
            <AnswerButton
            buttonClicked = {this.buttonClicked}
            type = 'right'
            value = {this.state.rightButtonValue}
            />
            
            <this.startClock
            countdownFrom = {this.state.timeAllowed}
            completedRounds = {this.state.completedRounds}
            gameEnded = {this.gameEnded}
            />

          </div>
          );
        
        while(this.state.gameRunning == false)
          {
            let newRecord = false;
            if(this.state.completedRounds > this.state.highScore) {
                this.setState({highScore: this.state.completedRounds})
                newRecord = true;
            }
            return(
                <div>
                <this.EndMessage
                yourScore = {this.state.completedRounds}
                highScore = {this.state.highScore}
                newRecord = {newRecord}
                />
                <button onClick={this.handleClick.bind(this)}>Play again</button>
                </div>
            );
        }
      }
    }
  
    EndMessage(props) {
    return(
        <div>
            <p> GAME OVER. You got to round {props.yourScore}! </p>
            <p> The current high score is round {props.highScore} </p>
        </div>
    );
    }


    startClock(props) {
      if(props.completedRounds >0)
        return <Clock 
        countdownFrom={props.countdownFrom}
        gameEnded = {props.gameEnded}
         />;
      else
        return null;
    }
  
  
    gameEnded() {
      this.setState({gameRunning : false})
    }
  
    render() {
      return (
      <div>
        <h2>Hello, and welcome to Robin's component of fun and glory</h2>
          <this.MainDisplay />
      </div>
      );
    }
  }

  export default RobinsElement