import React, {Component} from 'react';

class LeechDeepFryer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonStyle: "btn-primary",
            message: "Deep fryer ready for leeches",
        };

        this.startDeepFry = this.startDeepFry.bind(this);
    }

    startDeepFry = () => {

        this.setState({
            buttonStyle: "btn-secondary",
            message: "Deep frying in progress...",
        });
        setTimeout(() => {
            this.completeDeepFry();

        }, 3000);


    };

    completeDeepFry() {
        this.setState({
            buttonStyle: "btn-primary",
            message: "Deep frying complete. Enjoy your deep fried leech!"
        });

        alert("Complete!")
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Leech Factory</h1>
                        <p>{this.state.message}</p>
                        <button type="button" className={"btn " + this.state.buttonStyle} onClick={this.startDeepFry}>Deep Fry</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default LeechDeepFryer;