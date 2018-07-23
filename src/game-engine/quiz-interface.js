import React, {Component} from 'react';

function Flag(props) {
    return (
        <img className="flag-image" src={props.value}/>
    );
}

function OptionButton(props) {
    return (
        <button type="button" className="col btn btn-primary m-2">{props.value}</button>
    );
}

class QuizInterface extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <Flag value={this.props.answerCountry.flag} />
                </div>
                <div className="row">
                    <OptionButton value={this.props.answerOptions[0]} />
                    <OptionButton value={this.props.answerOptions[1]} />
                </div>
                <div className="row">
                    <OptionButton value={this.props.answerOptions[2]} />
                    <OptionButton value={this.props.answerOptions[3]} />
                </div>
            </React.Fragment>
        )
    }
}

export default QuizInterface;