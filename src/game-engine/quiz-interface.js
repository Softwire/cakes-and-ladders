import React, {Component} from 'react';

function Flag(props) {
    return (
        <img className="flag-image" src={props.value}/>
    );
}

function OptionButton(props) {
    return (
        <button type="button" className="col btn btn-primary">{props.value}</button>
    );
}

class QuizInterface extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <Flag value={this.props.currentCountry.flag} />
                </div>
                <div className="row">
                    <OptionButton value={this.props.currentCountry.name} />
                    <OptionButton value={this.props.currentCountry.name} />
                </div>
                <div className="row">
                    <OptionButton value={this.props.currentCountry.name} />
                    <OptionButton value={this.props.currentCountry.name} />
                </div>
            </React.Fragment>
        )
    }
}

export default QuizInterface;