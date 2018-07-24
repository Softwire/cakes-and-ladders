import React, { Component } from 'react';

var arrayDimensions = 4;

var cardPairs = ["1", "2", "3", "4", "5", "6", "7", "8"];

function Card(props) {
    return (
        <button className="Card" onClick={props.onClick} >
            {props.value}
        </button>
    );

}

class Board extends React.Component {
    constructor(props) {
        super(props);

        var cards = Array(arrayDimensions ^ 2).fill(null);
        var cardsplaced = 0;

        while (cardsplaced < arrayDimensions ^ 2) {
            var random = Math.floor(Math.random() * arrayDimensions ^ 2);

            if (cards(random) == ! null) {
                cards(random).value = cardPairs(Math.floor(cardsplaced / 2));
                cardsplaced++;
            }
        }

        this.state = {
            firstCardTurned: false,
        };
    }

    renderCard(i) {
        return <Card value={this.state.cards[i]} />;
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderCard(0)}
                    {this.renderCard(1)}
                    {this.renderCard(2)}
                    {this.renderCard(3)}
                </div>
                <div className="board-row">
                    {this.renderCard(5)}
                    {this.renderCard(6)}
                    {this.renderCard(7)}
                    {this.renderCard(8)}
                </div>
                <div className="board-row">
                    {this.renderCard(9)}
                    {this.renderCard(10)}
                    {this.renderCard(11)}
                    {this.renderCard(12)}
                </div>
                <div className="board-row">
                    {this.renderCard(13)}
                    {this.renderCard(14)}
                    {this.renderCard(15)}
                    {this.renderCard(16)}
                </div>
            </div>
        );
    }
}

class minigame extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
            </div>
        );
    }
}

export default minigame;
