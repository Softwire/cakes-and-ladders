import React, {Component} from 'react';

class CountriesQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: null,
            appIsReady: false,
        };
    }

    componentDidMount() {
        fetch('https://restcountries.eu/rest/v2/all?fields=alpha2Code;name;flag')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    countries: data,
                    appIsReady: true,
                })
            });
    }

    render() {

        let message = this.state.appIsReady ? this.state.countries.length: "Loading...";

        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="col">
                        <h1>Leech Factory</h1>
                        <p className="mt-5">{message}</p>
                        <button type="button" className={"btn " + this.state.buttonStyle}
                                onClick={this.componentDidMount}>Fetch
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CountriesQuiz;