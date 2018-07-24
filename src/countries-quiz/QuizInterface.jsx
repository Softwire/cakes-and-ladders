import React, {Component} from 'react';
import OptionButton from "./OptionButton";
import Timer from "./Timer";


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
                <div className="row mt-2 align-items-center align-content-center justify-content-center">
                    <div className="col flex-shrink-0">
                        <h1 id="title">Countries Quiz</h1>
                    </div>
                    <div className="col">
                        <h2 className="levels">Level</h2>
                    </div>
                    <Level />
                    <Level />
                    <Level />
                    <Level />
                    <Level />
                    <Timer
                        countDownFrom={this.props.timePerLevel}
                        endGame={this.props.endGame}
                    />
                </div>
                <div className="row">
                    <Flag value={this.props.answerOptions[this.props.answerIndex].content.flag}/>
                </div>
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
            </div>
        )
    }
}

export default QuizInterface;