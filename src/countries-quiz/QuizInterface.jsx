import React, {Component} from 'react';
import OptionButton from "./OptionButton";
import Timer from "./Timer";

const gameState = {NOT_STARTED: 0, IN_PROGRESS: 1, OVER: 2, CONTINUE: 3};

function Flag(props) {
    return (
        <img className="flag-image" src={props.value}/>
    );
}

function Level(props) {
    return (
        <div className="col">
            <h2 className="levels">1</h2>
        </div>
    );
}

class QuizInterface extends Component {
    render() {
        return (
            <div className="container">
                <div className="progress">
                    <div className="progress-bar progress-bar-striped bg-success progress-bar-animated"
                         style={{width: this.props.progress}}/>
                </div>
                <div className="row mt-4 align-items-center align-content-center justify-content-center">
                    <div className="col flex-shrink-0">
                        <h1 id="title">Countries Quiz</h1>
                    </div>
                    <div className="col">
                        <h2 className="levels">Level</h2>
                    </div>
                    <Level/>
                    <Level/>
                    <Level/>
                    <Level/>
                    <Level/>
                    <Timer
                        countDownFrom={this.props.timePerLevel}
                        endGame={this.props.endGame}
                        gameState={this.props.gameState}
                    />
                </div>
                <div className="row">
                    <Flag value={this.props.answerOptions[this.props.answerIndex].content.flag}/>
                </div>
                {this.getOptionButtons()}
            </div>
        )
    }

    getOptionButtons() {

        switch(this.props.gameState) {
            case gameState.NOT_STARTED:
                return (
                    <div className="row">
                        <button
                            type="button"
                            className="col btn m-2 p-4 flex-0 option-button btn-success"
                            onClick={this.props.onContinueButtonClick}>
                            Ready
                        </button>
                    </div>
                );
            case gameState.OVER:
                return (
                    <div className="row">
                        <button
                            type="button"
                            className="col btn m-2 p-4 flex-0 option-button btn-danger"
                            onClick={this.props.onContinueButtonClick}>
                            Restart
                        </button>
                    </div>
                );
            case gameState.CONTINUE:
                return (
                    <div className="row">
                        <button
                            type="button"
                            className="col btn m-2 p-4 flex-0 option-button btn-success"
                            onClick={this.props.onContinueButtonClick}>
                            Continue
                        </button>
                    </div>
                );
            case gameState.IN_PROGRESS:
                return (
                    <React.Fragment>
                        <div className="row">
                            <OptionButton value={this.props.answerOptions[0]}
                                          handleClick={() => this.props.handleClick(0)}/>
                            <OptionButton value={this.props.answerOptions[1]}
                                          handleClick={() => this.props.handleClick(1)}/>
                        </div>
                        <div className="row">
                            <OptionButton value={this.props.answerOptions[2]}
                                          handleClick={() => this.props.handleClick(2)}/>
                            <OptionButton value={this.props.answerOptions[3]}
                                          handleClick={() => this.props.handleClick(3)}/>
                        </div>
                    </React.Fragment>
                )
        }
    }
}

export default QuizInterface;