import React, {Component} from 'react';
import QuizInterface from "./quiz-interface";

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

        if (this.state.appIsReady) {

            let currentCountry = this.getRandomCountry();

            return (
                <div className="container">
                    <div className="row mt-5">
                        <div className="col">
                            <h1>Countries Quiz</h1>
                        </div>
                    </div>
                    <QuizInterface
                        currentCountry={currentCountry}
                    />
                </div>
            );
        }
        else
            return (<p>Loading</p>);
    }

    getRandomCountry() {
        return this.state.countries[Math.floor(Math.random() * this.state.countries.length)];
    }
}

export default CountriesQuiz;