import React, {Component} from 'react';

function Flag(props) {
    return (
        <img className="flag-image" src={props.value}/>
    );
}

function OptionButton(props) {
    return (
        <button
            type="button"
            className="col btn btn-primary m-2 p-4 flex-0 option-button"
            key={props.value.alpha3Code}
            onClick={() => props.handleClick(props.value.alpha3Code)}>
            {props.value.name}
        </button>
    );
}

class QuizInterface extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <Flag value={this.props.answerCountry.flag}/>
                </div>
                <div className="row">
                    <OptionButton value={this.props.optionCountries[0]}
                                  handleClick={this.props.handleClick}/>
                    <OptionButton value={this.props.optionCountries[1]}
                                  handleClick={this.props.handleClick}/>
                </div>
                <div className="row">
                    <OptionButton value={this.props.optionCountries[2]}
                                  handleClick={this.props.handleClick}/>
                    <OptionButton value={this.props.optionCountries[3]}
                                  handleClick={this.props.handleClick}/>
                </div>
            </React.Fragment>
        )
    }
}

export default QuizInterface;