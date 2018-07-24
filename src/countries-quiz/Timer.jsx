import React from "react";

const gameState = {NOT_STARTED: 0, IN_PROGRESS: 1, OVER: 2};

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCount: props.countDownFrom,
        }
    }

    timer() {

        if (this.props.gameState !== gameState.IN_PROGRESS) {
            this.setState({
                isStopped: true,
            });
            return;
        }

        if (this.state.isStopped) {
            this.setState({
                currentCount: this.props.countDownFrom,
                isStopped: false,
            });
        }

        this.setState({
            currentCount: (this.state.currentCount - 0.1),
        });
        if (this.state.currentCount < 0.1) {
            this.setState({
                currentCount: 0,
                isStopped: true,
            });
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

        let textStyle = null;
        let currentCount = this.state.currentCount;

        if (currentCount < 5)
            textStyle = "text-danger";
        else if (currentCount < 10)
            textStyle = "text-warning";
        else
            textStyle = "text-primary";

        return (
            <h1 className={"col timer text-right " + textStyle}>
                {this.state.currentCount.toFixed(1)}
            </h1>
        );
    }
}

export default Timer