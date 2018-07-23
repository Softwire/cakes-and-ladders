import React, {Component} from 'react';
import '../css/countries-quiz.css';
import QuizInterface from "./quiz-interface.jsx";

class CountriesQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allCountries: null,
            answerOptions: null,
            answerIndex: -1,
            isShowingAnswer: false,
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
                this.loadNewQuestion();
            });
    }

    render() {

        if (this.state.answerIndex === -1) return (<p className="m-5">Loading...</p>);

        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="col">
                        <h1>Countries Quiz</h1>
                    </div>
                </div>
                <QuizInterface
                    answerOptions={this.state.answerOptions}
                    answerIndex={this.state.answerIndex}
                    handleClick={this.selectOption}
                />
            </div>
        );
    }

    loadNewQuestion() {
        let answerOptions = this.getNRandomCountries(4);
        let answerIndex = Math.floor(Math.random() * answerOptions.length);

        this.setState({
            answerOptions: answerOptions,
            answerIndex: answerIndex,
        });
    }

    selectOption(buttonKey) {
        let answerCountry = this.state.answerOptions[this.state.answerIndex];
        if (buttonKey === answerCountry.alpha3Code)
            alert("Correct!");
        else
            alert("Wrong, the correct answer is " + answerCountry.name);

        setTimeout(() => {
            this.loadNewQuestion();
        }, 3000);
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