import React, {Component} from 'react';
import './css/countries-quiz.css';
import QuizInterface from "./QuizInterface.jsx";

const optionCount = 4;
const questionsPerLevel = 5;
const timePerLevel = 30;
const buttonState = {UNSELECTED: 0, CORRECT: 1, WRONG: 2, SELECTED: 3};
const gameState = {NOT_STARTED: 0, IN_PROGRESS: 1,};

class CountriesQuiz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allCountries: null,
            answerOptions: null,
            answerIndex: -1,
            isLoadingNewQuestion: false,
            levelScore: 0,
            gameState: gameState.NOT_STARTED,
        };

        this.selectOption = this.selectOption.bind(this);
        this.endGame = this.endGame.bind(this);
        this.onContinueButtonClick = this.onContinueButtonClick.bind(this);
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
        let progress = (this.state.levelScore / questionsPerLevel * 100) + "%";

        return (
            <QuizInterface
                answerOptions={this.state.answerOptions}
                answerIndex={this.state.answerIndex}
                handleClick={this.selectOption}
                timePerLevel={timePerLevel}
                endGame={this.endGame}
                progress={progress}
                showContinueButton={this.showContinueButton()}
                onContinueButtonClick={this.onContinueButtonClick}
            />
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

        let answerIndex = this.state.answerIndex;
        let answerOptions = this.getAnswerOptionsWithNewButtonStates(this.state.answerOptions, selectIndex, answerIndex);

        let levelScore = this.getNewLevelScore(selectIndex, answerIndex);

        this.setState({
            answerOptions: answerOptions,
            isLoadingNewQuestion: true,
            levelScore: levelScore,
        });

        setTimeout(() => {
            this.loadNewQuestion();
        }, 2500);
    }

    getNewLevelScore(selectIndex, answerIndex) {
        let levelScore = this.state.levelScore;
        if (selectIndex === answerIndex) {
            levelScore++;
        }
        return levelScore;
    }

    getAnswerOptionsWithNewButtonStates(answerOptions, selectIndex, answerIndex) {
        answerOptions = answerOptions.map(option => {
            option.buttonState = buttonState.WRONG;
            return option;
        });
        answerOptions[selectIndex].buttonState = buttonState.SELECTED;
        answerOptions[answerIndex].buttonState = buttonState.CORRECT;
        return answerOptions;
    }

    endGame() {
    }

    onContinueButtonClick() {
        switch (this.state.gameState) {
            case gameState.NOT_STARTED:
                this.loadNewQuestion();
                this.setState({
                    gameState: gameState.IN_PROGRESS,
                });
                break;
        }
    }

    showContinueButton() {
        return this.state.gameState !== gameState.IN_PROGRESS;
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