import React, {Component} from 'react';
import OptionButton from "./OptionButton";


function Flag(props) {
    return (
        <img className="flag-image" src={props.value}/>
    );
}

class QuizInterface extends Component {
    render() {
        return (
            <React.Fragment>
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
            </React.Fragment>
        )
    }
}

export default QuizInterface;