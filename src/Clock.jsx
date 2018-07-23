import React, { Component } from 'react';

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

export default Clock