import React from 'react';
import './snekboard.css';
import Dynamite from "./Dynamite";

const boardSize = 15;

function Square(props){
    return(
        <button
            className= "square" value = {props.value}
        >
            {props.value}
        </button>
    )
}

class Board extends React.Component {
    renderSquare(i,j) {
        return (
            <Square
                value={this.props.squares[i][j]}
            />
        );
    }

    renderRow(numRow)
    {
        var row = [];
        for (var i = 0; i < boardSize; i++) {
            row.push(this.renderSquare(numRow,i));
        }
        return (
            <div className="board-row">
                {row}
            </div>);
    }

    render()
    {
        var rows = [];
        for (var i = 0; i < boardSize; i++) {
            rows.push(this.renderRow(i))
        }
        return (<div> {rows}</div>);
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array.from(Array(boardSize), () => new Array(boardSize)),
            snake: [[5,5]],
            food: [8,8],
            direction: 39,
            highscore: 0,
        };
        this.moveSnake = this.moveSnake.bind(this);
        this.startGame = this.startGame.bind(this);
        this.setDirection = this.setDirection.bind(this);
        this.moveFood = this.moveFood.bind(this);

        this.startGame();
    }


    setDirection({ keyCode }) {
        // if it's the same direction or simply reversing, ignore
        let changeDirection = true;
        [[38, 40], [37, 39]].forEach(dir => {
            if (dir.indexOf(this.state.direction) > -1 && dir.indexOf(keyCode) > -1) {
                changeDirection = false;
            }
        });

        if (changeDirection) this.setState({ direction: keyCode });
    }


    startGame(){
        this.setState({
            snake: [[5,5],[4,5]],
            direction: 39,
        });
        this.moveFood();
        setInterval(this.moveSnake,150);
    }

    moveSnake() {
        var newSnake = [];
        switch (this.state.direction) {
            // down
            case 40:
                newSnake[0] = [this.state.snake[0][0]+1, this.state.snake[0][1] ];
                break;
            // up
            case 38:
                newSnake[0] = [this.state.snake[0][0]- 1, this.state.snake[0][1] ];
                break;
            // right
            case 39:
                newSnake[0] = [this.state.snake[0][0], this.state.snake[0][1] + 1];
                break;
            // left
            case 37:
                newSnake[0] = [this.state.snake[0][0], this.state.snake[0][1] - 1];
                break;
        }
        // now shift each "body" segment to the previous segment's position

        const oldSnake = this.state.snake;
        newSnake = newSnake.concat(oldSnake.slice(0,oldSnake.length-1));
        if(this.checkIfAteFood(newSnake)){
            newSnake.push(oldSnake.slice(-1)[0])
            this.moveFood();
        }
        this.setState({ snake: newSnake });

        if(!this.checkInBoard(newSnake) || !this.checkNoOverlap(newSnake[0], newSnake.slice(1))){
            alert("Game Ova");
            this.setState({
                snake:[[5,5]],
            });
            this.moveFood();
        }




        this.updateBoard();
    }

    checkIfAteFood(newSnake){
        var head = newSnake[0];
        return head[0] === this.state.food[0] && head[1] === this.state.food[1];
    }

    checkInBoard(newSnake){
        return newSnake[0][0]> -1 &&
            newSnake[0][0] < boardSize &&
            newSnake[0][1]> -1 &&
            newSnake[0][1] < boardSize  }

    checkNoOverlap(head, snake){
        var bool = true;
        snake.forEach(x => {if(x[0] == head[0] && x[1] == head[1]){ bool = false}})
        return bool;
    }

    moveFood(){
        if (this.moveFoodTimeout) clearTimeout(this.moveFoodTimeout);
        var newFood;
        do{
            const x = Math.floor(Math.random()*boardSize);
            const y = Math.floor(Math.random()*boardSize);
            newFood = [x,y];}
        while(!this.checkNoOverlap(newFood,this.state.snake))
        this.setState({food:newFood});
        this.moveFoodTimeout = setTimeout(this.moveFood,5000);
    }

    updateBoard(){
        var currentSquares = Array.from(Array(boardSize), () => new Array(boardSize));
        this.state.snake.forEach(x => {currentSquares[x[0]][x[1]] = "O"});
        var food = this.state.food;
        currentSquares[food[0]][food[1]] = "X";
        currentSquares[this.state.snake[0][0]][this.state.snake[0][1]] = "H";
        var newHighscore = this.state.highscore< this.state.snake.length ?
            this.state.snake.length : this.state.highscore;
        this.setState({
            squares : currentSquares,
            highscore: newHighscore,
        });
    }


    render() {
        return (
            <div className="game" onKeyDown={this.setDirection}>
                <div className="game-board"  >
                    <Board
                        squares = {this.state.squares}
                    />
                </div>
                <ul>Highscore: {this.state.highscore}</ul>
            </div>
        );
    }
}

export default Game;