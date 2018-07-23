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
                    value={this.props.countries[0].flag}
                />
            </div>
        )
    }
}

export default QuizInterface;