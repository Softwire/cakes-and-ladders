import React, {Component} from 'react';

class LeechDeepFryer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDeepFrying: false,
            buttonStyle: "btn-primary",
            message: "Deep fryer ready for leeches",
        };

        this.initDeepFry = this.initDeepFry.bind(this);
    }

    initDeepFry() {
        if (!this.state.isDeepFrying) {
            this.startDeepFry();
        }
    };

    startDeepFry = () => {

        this.setState({
            isDeepFrying: true,
            buttonStyle: "btn-secondary",
            message: "Deep frying in progress...",
        });
        setTimeout(() => {
            this.completeDeepFry();

        }, 3000);


    };

    completeDeepFry() {
        this.setState({
            isDeepFrying: false,
            buttonStyle: "btn-primary",
            message: "Deep frying complete. Enjoy your deep fried leech!"
        });

        alert("Complete!")
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="col">
                        <h1>Leech Factory</h1>
                        <p className="mt-5">{this.state.message}</p>
                        <button type="button" className={"btn " + this.state.buttonStyle} onClick={this.initDeepFry}>Deep Fry</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default LeechDeepFryer;