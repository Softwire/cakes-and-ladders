import React, {Component} from 'react';
import {Flag} from './quiz-unit';

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

    renderFlag(flagUrl) {
        return (
            <Flag
                value={flagUrl}
            />
        )
    }

    render() {

        if (this.state.appIsReady) {
            return (
                <div className="container">
                    <div className="row mt-5">
                        <div className="col">
                            <h1>Countries Quiz</h1>
                            {this.renderFlag(this.state.countries[0].flag)}
                        </div>
                    </div>
                </div>
            );
        }
        else
            return (<p>Loading</p>);
    }
}

export default CountriesQuiz;