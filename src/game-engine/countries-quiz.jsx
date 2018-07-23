import React, {Component} from 'react';
import '../css/countries-quiz.css';
import QuizInterface from "./quiz-interface.jsx";

class CountriesQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allCountries: null,
            optionCountries: null,
            answerCountry: null,
        };

        this.selectOption = this.selectOption.bind(this);
    }

    componentDidMount() {
        fetch('https://restcountries.eu/rest/v2/all?fields=alpha3Code;name;flag')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    allCountries: data,
                });
                this.updateCurrentQuestion();
            });
    }

    render() {

        if (this.state.answerCountry == null) return (<p className="m-5">Loading...</p>);

        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="col">
                        <h1>Countries Quiz</h1>
                    </div>
                </div>
                <QuizInterface
                    optionCountries={this.state.optionCountries}
                    answerCountry={this.state.answerCountry}
                    handleClick={this.selectOption}
                />
            </div>
        );
    }

    updateCurrentQuestion() {
        let optionCountries = this.getNRandomCountries(4);
        let answerCountry = CountriesQuiz.getRandomFrom(optionCountries);

        this.setState({
            optionCountries: optionCountries,
            answerCountry: answerCountry,
        });
    }

    selectOption(buttonKey) {
        if (this.state.answerCountry != null)
            alert(buttonKey === this.state.answerCountry.alpha3Code)
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