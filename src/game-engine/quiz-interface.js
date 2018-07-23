import React, {Component} from 'react';

function Flag(props) {
    return (
        <img src={props.value}/>
    );
}

class QuizInterface extends Component {
    render() {
        return (
            <div className="row">
                <Flag
                    value={this.props.currentCountry.flag}
                />
            </div>
        )
    }
}

export default QuizInterface;