import React from 'react';
import './Clock.css';

class Clock extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      countdownFrom: props.countdownFrom,
      currentCount: props.countdownFrom
    }
    this.timer = this.timer.bind(this)
  }

  timer() {
    if (this.state.countdownFrom != this.props.countdownFrom) {
      this.setState({ 
        countdownFrom : this.props.countdownFrom,
        currentCount : this.props.countdownFrom
      })
    }
    this.setState({
      currentCount: (this.state.currentCount - 0.01).toFixed(2)
    })
    if(this.state.currentCount < 0.01) { 
      this.props.action()
      clearInterval(this.intervalId)
    }
  }

  componentDidMount() {
    this.intervalId = setInterval(this.timer, 10);
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