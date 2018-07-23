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

            let randomCountries = this.getNRandomCountries(4);
            
            let answerCountry = randomCountries[0];
            let answerOptions = randomCountries.map(country => country.name);

            return (
                <div className="container">
                    <div className="row mt-5">
                        <div className="col">
                            <h1>Countries Quiz</h1>
                        </div>
                    </div>
                    <QuizInterface
                        answerCountry={answerCountry}
                        answerOptions={answerOptions}
                    />
                </div>
            );
        }
        else
            return (<p>Loading</p>);
    }

    getNRandomCountries(numberOfCountries) {
        let result = new Array(numberOfCountries),
            len = this.state.countries.length,
            taken = new Array(len);
        if (numberOfCountries > len)
            throw new RangeError("More elements taken than available");
        while (numberOfCountries--) {
            let x = Math.floor(Math.random() * len);
            result[numberOfCountries] = this.state.countries[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }
}

export default CountriesQuiz;