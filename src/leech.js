import React, { Component } from 'react';
import './leech.css';

class Leech extends Component {
    constructor(props) {
      super(props);
      this.state = {
        leeches: 0
      };

      this.getLeech = this.getLeech.bind(this);
    }

    getLeech () {
        this.setState({
          leeches: this.state.leeches + 1
        });
    }

    render() {
      return (
        <div className="leeches">
        <p>You have {this.state.leeches} leeches.</p>
          <button onClick={this.getLeech}>get leech</button>
        </div>
      );
    }
  }

export default Leech;