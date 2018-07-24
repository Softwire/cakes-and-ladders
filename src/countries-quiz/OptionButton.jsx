import React, {Component} from 'react';
import QuizInterface from "./QuizInterface";

const buttonState = {UNSELECTED: 0, CORRECT: 1, WRONG: 2, SELECTED: 3 };

class OptionButton extends Component {

    render() {
        let buttonStyle = OptionButton.getButtonStyle(this.props.value.buttonState);

        return (
            <button
                type="button"
                className={"col btn m-2 p-4 flex-0 option-button " + buttonStyle}
                key={this.props.value.content.alpha3Code}
                onClick={this.props.handleClick}>
                {this.props.value.content.name}
            </button>
        );
    }

    static getButtonStyle(state) {
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
}

export default OptionButton;