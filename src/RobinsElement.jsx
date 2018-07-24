import React from 'react';
import AnswerButton from './AnswerButton.jsx'
import Clock from './Clock.jsx'
import './RobinsElement.css';

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
        rightButtonValue: 50,
        hasClicked: false,
        lastClick: null
      };
      this.updateRounds = this.UpdateRounds.bind(this);
      this.updateButtonValue = this.UpdateButtonValue.bind(this);
      this.buttonClicked = this.ButtonClicked.bind(this);
      this.gameEnded = this.EndGame.bind(this);
      this.MainDisplay = this.MainDisplay.bind(this);
      this.handleClick = this.StartNewGame.bind(this);
      this.handlerAnswerButton = this.handlerAnswerButton.bind(this);
      this.handlerClock = this.handlerClock.bind(this);
      this.StartClock = this.StartClock.bind(this)
    }

    render() {
      return (
      <div>
        <h1>50/50</h1>
          <this.MainDisplay />
      </div>
      );
    }

    MainDisplay() {
      if(this.state.firstRunning === true)
        return this.InitialDisplay()
      while(this.state.gameRunning === true)
        return this.GameRunningDisplay()
      while(this.state.gameRunning === false)
        return this.GameEndedDisplay()
    }

    InitialDisplay() {
    return(
      <div>
        <p>
          In this game, you will have {this.state.timeAllowed} seconds to complete as many rounds as possible. <br/>
          In each round, all you need to do is click the bigger number. <br/>
          See how far you can get in this monstrously exciting game! 
        </p>
        <button
            onClick={this.StartNewGame.bind(this)}
            className = "startButton"
            >
            Start
        </button>
      </div>
    )}

    GameRunningDisplay() {
    return(
      <div>
        <p>Click the button displaying the higher number. </p>
        <p><i> The current high score is round {this.state.highScore} </i></p>
        <p>You have completed {this.state.completedRounds} round{this.state.completedRounds === 1 ? '':'s'}.</p>
        <AnswerButton
          action = {this.handlerAnswerButton}
          type = 'left'
          value = {this.state.leftButtonValue}
        />
        <AnswerButton
          action = {this.handlerAnswerButton}
          type = 'right'
          value = {this.state.rightButtonValue}
        />
        <this.StartClock
          countdownFrom = {this.state.timeAllowed}
          completedRounds = {this.state.completedRounds}
        />
      </div>
    )}

    handlerAnswerButton(buttonID) {
        this.ButtonClicked(buttonID)
      }

    StartClock(props) {
      if(props.completedRounds >0)
        return <Clock 
          countdownFrom={props.countdownFrom}
          gameEnded = {props.gameEnded}
          action = {this.handlerClock}
         />
      else
        return null
    }

    handlerClock() {
      this.EndGame()
    }

    ButtonClicked(buttonID) {
      if(this.IsWrongAnswer(buttonID))
        this.EndGame();
      else {
        this.GenerateNewQuestionAndUpdateButtonValues();
        this.UpdateTimer();
      }
    }

    IsWrongAnswer(buttonID) {
      return ((buttonID === 'right' && this.state.rightButtonValue < this.state.leftButtonValue) 
      || (buttonID === 'left' && this.state.leftButtonValue < this.state.rightButtonValue))
    }

    EndGame() {
      this.setState({gameRunning : false})
      if(this.state.completedRounds > this.state.highScore)
        this.setState({highScore: this.state.completedRounds})
    }

    GenerateNewQuestionAndUpdateButtonValues() {
      const min = 1;
      const max = 100;
      const randLeft = Math.round(min + Math.random() * (max - min));
      var randRight = Math.round(min + Math.random() * (max - min));
      while(randRight === randLeft)
        randRight = Math.round(min + Math.random() * (max - min));
      this.UpdateRounds();
      this.UpdateButtonValue('left', randLeft);
      this.UpdateButtonValue('right', randRight);
    }

    UpdateTimer() {
      let currentScore = Math.max(this.state.completedRounds,1)
      let new_time = 5/(Math.sqrt(currentScore));
      this.setState({timeAllowed:new_time})
      console.log("new time is " + new_time)
    }

    UpdateRounds() {
      this.setState(prevState => (
        {completedRounds : prevState.completedRounds +1}
      ))
    }
  
    UpdateButtonValue(buttonID, value) {
      if(buttonID === 'left')
        this.setState({leftButtonValue : value})
      else 
        this.setState({rightButtonValue: value})
    }
  
    GameEndedDisplay() {
      return(
        <div>
          <this.EndMessage
            yourScore = {this.state.completedRounds}
            highScore = {this.state.highScore}
          />
          <button
            onClick={this.StartNewGame.bind(this)}
            className = "startButton"
          >Play again</button>
        </div>
      )}

    EndMessage(props) {
      return(
          <div>
              <p> GAME OVER. You got to round {props.yourScore}. </p>
              <p> The current high score is round {props.highScore}. </p>
          </div>
      );
      }

    StartNewGame() {
      this.setState(
        { firstRunning: false,
          gameRunning: true,
          completedRounds: 0,
          timeAllowed: 5,
          leftButtonValue: 50,
          rightButtonValue: 50}
      )
    }
  
  }
  
  export default RobinsElement