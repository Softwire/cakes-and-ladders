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
      let roundTens = Math.round((this.props.roundNumber-5)/10)
      let buttonTypeIndex = roundTens % 5
      let toBeAppended = buttonTypeIndex.toString()
      let buttonType = "buttonText" + toBeAppended

      return (
          <button
            onClick={this.props.action.bind(this,buttonID)}
            style = {this.buttonStyle}
            className={buttonType}
          >
          {this.props.value}
          </button>
      );
    }
  }

  export default AnswerButton