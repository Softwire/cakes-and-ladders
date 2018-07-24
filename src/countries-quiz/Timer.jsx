import React from "react";

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentCount: props.countdownFrom}
    }

    timer() {
        this.setState({
            currentCount: (this.state.currentCount - 0.01).toFixed(2)
        });
        if (this.state.currentCount < 0.01) {
            clearInterval(this.intervalId);
            this.props.gameEnded()
        }
    }

    componentDidMount() {
        this.intervalId = setInterval(this.timer.bind(this), 10);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        return (
            <div
                className="clockText"
            >
                Time remaining:{this.state.currentCount}
            </div>
        );
    }
}

export default Timer