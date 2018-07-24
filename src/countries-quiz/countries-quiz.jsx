import React, {Component} from 'react';
import './css/countries-quiz.css';
import QuizInterface from "./quiz-interface.jsx";

const optionCount = 4;
const buttonState = {UNSELECTED: 0, CORRECT: 1, WRONG: 2, SELECTED: 3 };

class CountriesQuiz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allCountries: null,
            answerOptions: null,
            answerIndex: -1,
            isLoadingNewQuestion: false,
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
        let randomCountries = this.getNRandomCountries(optionCount);
        let answerOptions = randomCountries.map(country => {
            let answerOption = {};
            answerOption.content = country;
            answerOption.buttonState = buttonState.UNSELECTED;
            return answerOption;
        });
        let answerIndex = Math.floor(Math.random() * optionCount);

        this.setState({
            answerOptions: answerOptions,
            answerIndex: answerIndex,
            isLoadingNewQuestion: false,
        });
    }

    selectOption(selectIndex) {

        if (this.state.isLoadingNewQuestion) return;

        let answerOptions = this.state.answerOptions;
        let answerIndex = this.state.answerIndex;

        answerOptions = answerOptions.map(option => {
            option.buttonState = buttonState.WRONG;
            return option;
        });
        answerOptions[selectIndex].buttonState = buttonState.SELECTED;
        answerOptions[answerIndex].buttonState = buttonState.CORRECT;

        this.setState({answerOptions: answerOptions, isLoadingNewQuestion: true});

        setTimeout(() => {
            this.loadNewQuestion();
        }, 2500);
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