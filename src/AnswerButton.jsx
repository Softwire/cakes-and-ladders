import React, { Component } from 'react';
import './AnswerButton.css';

class AnswerButton extends React.Component {

    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick() {
      this.props.buttonClicked(this.props.type)
    }
  
    buttonStyle = {
      width: 200,
      height: 90,
      };
  
    render() {
      return (
          <button
            onClick={this.handleClick.bind(this)}
            style = {this.buttonStyle}
            className="buttonText"
          >
          {this.props.value}
          </button>
      );
    }
  }

  export default AnswerButton