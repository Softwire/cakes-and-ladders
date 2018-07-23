import React, {Component} from 'react';

const buttonState = {UNSELECTED: 0, CORRECT: 1, WRONG: 2, SELECTED: 3 };

function Flag(props) {
    return (
        <img className="flag-image" src={props.value}/>
    );
}

function OptionButton(props) {

    let buttonStyle = getButtonStyle(props.value.buttonState);

    return (
        <button
            type="button"
            className={"col btn m-2 p-4 flex-0 option-button " + buttonStyle}
            key={props.value.alpha3Code}
            onClick={props.handleClick}>
            {props.value.name}
        </button>
    );
}

function getButtonStyle(state) {
    switch (state) {
        case buttonState.UNSELECTED:
            return "btn-primary";
        case buttonState.WRONG:
            return "btn-secondary";
        case buttonState.CORRECT:
            return "btn-success";
        case buttonState.SELECTED:
            return "btn-danger";
    }
}

class QuizInterface extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <Flag value={this.props.answerOptions[this.props.answerIndex].flag}/>
                </div>
                <div className="row">
                    <OptionButton value={this.props.answerOptions[0]}
                                  handleClick={() => this.props.handleClick(0)}
                                  isShowingAnswer={this.props.isShowingAnswer}/>
                    <OptionButton value={this.props.answerOptions[1]}
                                  handleClick={() => this.props.handleClick(1)}
                                  isShowingAnswer={this.props.isShowingAnswer}/>
                </div>
                <div className="row">
                    <OptionButton value={this.props.answerOptions[2]}
                                  handleClick={() => this.props.handleClick(2)}
                                  isShowingAnswer={this.props.isShowingAnswer}/>
                    <OptionButton value={this.props.answerOptions[3]}
                                  handleClick={() =>this. props.handleClick(3)}
                                  isShowingAnswer={this.props.isShowingAnswer}/>
                </div>
            </React.Fragment>
        )
    }
}

export default QuizInterface;