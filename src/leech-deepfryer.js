import React, {Component} from 'react';

class LeechDeepFryer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "Deep fryer ready for leeches"
        };

        this.StartDeepFry = this.StartDeepFry.bind(this);
    }

    StartDeepFry = () => {

        this.setState({
            message: "Deep frying in progress..."
        });
        setTimeout(() => {

            this.setState({
                message: "Deep frying complete. Enjoy your deep fried leech!"
            });

            alert("Complete!")

        }, 3000);


    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Leech Factory</h1>
                        <p>{this.state.message}</p>
                        <button type="button" className="btn btn-primary" onClick={this.StartDeepFry}>Deep Fry</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default LeechDeepFryer;