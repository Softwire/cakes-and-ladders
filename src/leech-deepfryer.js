import React, { Component } from 'react';

class LeechDeepFryer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "Deep fryer ready for leeches"
        };

        this.StartDeepFry = this.StartDeepFry.bind(this);
    }

    StartDeepFry=()=>{

        this.setState( {
            message: "Deep frying in progress..."
        });
        setTimeout( () => {

            this.setState( {
                message: "Deep frying complete. Enjoy your deep fried leech!"
            });

            alert("Complete!")

        }, 3000);


    };

    render() {
        return (
            <div className="main-container">
                <p>{this.state.message}</p>
                <button onClick={this.StartDeepFry}>DEEP FRY</button>
            </div>
        );
    }
}

export default LeechDeepFryer;