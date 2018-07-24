import React from 'react';
import './AnswerButton.css';

class AnswerButton extends React.Component {

    constructor(props) {
      super(props);
    }
  
    buttonStyle = {
      width: 200,
      height: 90,
      };
  
    render() {
      let buttonID = this.props.type
      return (
          <button
            onClick={this.props.action.bind(this,buttonID)}
            style = {this.buttonStyle}
            className="buttonText"
          >
          {this.props.value}
          </button>
      );
    }
  }

  export default AnswerButton