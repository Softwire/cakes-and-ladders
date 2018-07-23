import React, {Component} from 'react';
import QuizInterface from "./quiz-interface.jsx";

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

            let optionCountries = this.getNRandomCountries(4);
            let answerCountry = this.getRandomFrom(optionCountries);

            return (
                <div className="container">
                    <div className="row mt-5">
                        <div className="col">
                            <h1>Countries Quiz</h1>
                        </div>
                    </div>
                    <QuizInterface
                        optionCountries={optionCountries}
                        answerCountry={answerCountry}
                    />
                </div>
            );
        }
        else
            return (<p>Loading</p>);
    }

    getNRandomCountries(numberOfCountries) {
        let randomCountries = []
        while (numberOfCountries > 0) {
            let country = this.getRandomFrom(this.state.countries);
            if (!randomCountries.includes(country)) {
                randomCountries.push(country);
                numberOfCountries--;
            }
        }
        return randomCountries
    }

    getRandomFrom(array) {
        return array[Math.floor(Math.random() * array.length)]
    }
}

export default CountriesQuiz;