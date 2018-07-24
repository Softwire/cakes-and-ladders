import React from 'react';
import './Clock.css';

class Clock extends React.Component {
  constructor(props){
    super(props);
    this.state = {currentCount: props.countdownFrom}
    this.timer = this.timer.bind(this)
  }
  timer() {
    this.setState({
      currentCount: (this.state.currentCount - 0.01).toFixed(2)
    })
    if(this.state.currentCount < 0.01) { 
      this.props.action()
      clearInterval(this.intervalId)
    }
  }
  componentDidMount() {
    this.intervalId = setInterval(this.timer.bind(this), 10);
  }

  componentWillUnmount(){
    clearInterval(this.intervalId);
  }

  render() {
    return(
      <div
      className = "clockText"
      >
      Time remaining:{this.state.currentCount}
      </div>
    );
  }
}

export default Clock