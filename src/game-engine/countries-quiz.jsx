import React, {Component} from 'react';
import '../css/countries-quiz.css';
import QuizInterface from "./quiz-interface.jsx";

class CountriesQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appIsReady: false,
            allCountries: null,
            answerCountry: null,
        };
    }

    componentDidMount() {
        fetch('https://restcountries.eu/rest/v2/all?fields=alpha3Code;name;flag')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    allCountries: data,
                    appIsReady: true,
                })
            });
    }

    render() {

        if (this.state.appIsReady) {

            let optionCountries = this.getNRandomCountries(4);
            let answerCountry = CountriesQuiz.getRandomFrom(optionCountries);

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
                        handleClick={this.selectOption}
                    />
                </div>
            );
        }
        else
            return (<p className="m-5">Loading...</p>);
    }

    selectOption(buttonKey) {
        alert(buttonKey)
    }

    getNRandomCountries(numberOfCountries) {
        let randomCountries = [];
        while (numberOfCountries > 0) {
            let country = CountriesQuiz.getRandomFrom(this.state.allCountries);
            if (!randomCountries.includes(country)) {
                randomCountries.push(country);
                numberOfCountries--;
            }
        }
        return randomCountries
    }

    static getRandomFrom(array) {
        return array[Math.floor(Math.random() * array.length)]
    }
}

export default CountriesQuiz;