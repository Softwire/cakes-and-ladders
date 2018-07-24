import React from "react";

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentCount: props.countDownFrom}
    }

    timer() {
        this.setState({
            currentCount: (this.state.currentCount - 0.1).toFixed(1)
        });
        if (this.state.currentCount < 0.1) {
            clearInterval(this.intervalId);
            this.props.endGame();
        }
    }

    componentDidMount() {
        this.intervalId = setInterval(this.timer.bind(this), 100);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        return (
            <div className="col">
                {this.state.currentCount}
            </div>
        );
    }
}

export default Timer