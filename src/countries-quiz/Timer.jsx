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
                {this.state.currentCount}
            </h1>
        );
    }
}

export default Timer