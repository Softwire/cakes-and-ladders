import React from 'react';
import './snekboard.css';

const boardSize = 15;

function Square(props){
    return(
        <button
            className= "square" value = {props.value}
            onClick = {props.onClick}
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
                onClick = {()=>this.props.onClick([i,j])}
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

class JoelGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array.from(Array(boardSize), () => new Array(boardSize)),
            snake: [[5,5]],
            food: [8,8],
            direction: 39,
            lastDirection: 38,
            highscore: 0,
            gameState: 1,
            dynamite: [10,10],
        };
        this.moveSnake = this.moveSnake.bind(this);
        this.startGame = this.startGame.bind(this);
        this.setDirection = this.setDirection.bind(this);
        this.placeFood = this.placeFood.bind(this);
        this.gameOver = this.gameOver.bind(this);
        this.gameOverDyn = this.gameOverDyn.bind(this);
        this.placeDynamite = this.placeDynamite.bind(this);
    }

    startGame(){
        this.setState({
            snake: [[5,5],[4,5]],
            direction: 39,
            gameState: 1,
        });
        this.placeFood();
        this.placeDynamite();
        this.moveSnakeInterval = setInterval(this.moveSnake,120);
    }

    moveSnake() {
        const oldSnake = this.state.snake;
        var newSnake = this.getNextMoveFromDirection(this.state.direction);
        newSnake = this.disallowReverse(newSnake,oldSnake);
        newSnake = this.shiftSnake(newSnake,oldSnake);

        if(this.invalidMove(newSnake)){ this.gameOver(); }
        else{
            this.setState({ snake: newSnake })
            this.updateBoard();
        }
    }

    getNextMoveFromDirection(direction){
        var newSnake = [];
        switch (direction) {
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
        return newSnake;
    }

    setDirection({ keyCode }) {
        let changeDirection = true;
        let lastDirection = this.state.direction;
        if(![37,38,39,40].includes(keyCode)){ return;}
        // if it's the same direction or simply reversing, ignore
        [[38, 40], [37, 39]].forEach(dir => {
            if (dir.indexOf(this.state.direction) > -1 && dir.indexOf(keyCode) > -1) {
                changeDirection = false;
            }
        });
        if (changeDirection) this.setState({
            direction: keyCode ,
            lastDirection: lastDirection,
        });
    }

    shiftSnake(newSnake, oldSnake){
        newSnake = newSnake.concat(oldSnake.slice(0,oldSnake.length-1));
        if(this.checkIfAteFood(newSnake)){
            newSnake.push(oldSnake.slice(-1)[0])
            this.placeFood();
        }
        return newSnake;
    }

    invalidMove(newSnake){
        return !this.checkInBoard(newSnake) || !this.checkNoOverlap(newSnake[0], newSnake.slice(1));
    }

    disallowReverse(newSnake,oldSnake){
        if(!this.checkNoOverlap(newSnake[0],oldSnake)){
            return this.getNextMoveFromDirection(this.state.lastDirection);
        }
        return newSnake;
    }

    gameOver(){
        clearTimeout(this.moveSnakeInterval);
        this.setState({
            gameState:0,
        });
        this.updateBoard();
    }

    gameOverDyn(){
        clearTimeout(this.moveSnakeInterval);
        this.setState({
            gameState:0,
        });
        this.updateBoard();
    }

    placeFood(){
        if (this.foodTimeout) clearTimeout(this.foodTimeout);
        var newFood;
        do{
            const x = Math.floor(Math.random()*boardSize);
            const y = Math.floor(Math.random()*boardSize);
            newFood = [x,y];}
        while(!this.checkNoOverlap(newFood,this.state.snake))
        this.setState({food:newFood});
        this.foodTimeout = setTimeout(this.placeFood,5000);
    }

    placeDynamite() {
        if (this.dynamiteTimeout) clearTimeout(this.dynamiteTimeout);
        var newDynamite;
        do {
            const x = Math.floor(Math.random() * boardSize);
            const y = Math.floor(Math.random() * boardSize);
            newDynamite = [x, y];
        }
        while (!this.checkNoOverlap(newDynamite, this.state.snake))
        this.setState({dynamite: newDynamite});
        this.dynamiteTimeout = setTimeout(this.gameOverDyn, 10000 - this.state.snake.length *100);
    }

    defuseDynamite(arr){
        if (arr[0] === this.state.dynamite[0] && arr[1] === this.state.dynamite[1]){
            this.placeDynamite();
        }
    }

    handleClick(arr){
        this.defuseDynamite(arr);
    }

    updateBoard(){
        this.updateHighScore();
        this.updateSnakeFoodDynamitePosition();
        var snakeLength= this.state.snake.length;
        if(snakeLength %5 ===0){this.updateDifficulty(snakeLength)};
    }

    updateSnakeFoodDynamitePosition(){
        var currentSquares = Array.from(Array(boardSize), () => new Array(boardSize));
        const snakeBody = this.state.gameState ? "O" : "D";
        const snakeHead = this.state.gameState ? "H" : "DH";
        const dynamite = this.state.gameState ? "DYN" : "BOOM";
        this.state.snake.forEach(x => {currentSquares[x[0]][x[1]] = snakeBody});
        var food = this.state.food;
        var Dynamite = this.state.dynamite;
        currentSquares[food[0]][food[1]] = "F";
        currentSquares[Dynamite[0]][Dynamite[1]] = dynamite;
        currentSquares[this.state.snake[0][0]][this.state.snake[0][1]] = snakeHead;
        this.setState({squares : currentSquares, });
    }

    updateHighScore(){
        var newHighscore = this.state.highscore< this.state.snake.length ?
            this.state.snake.length : this.state.highscore;
        this.setState({ highscore: newHighscore,});
    }

    updateDifficulty(length){
        clearInterval(this.moveSnakeInterval);
        if(this.state.gameState ==0){return;}
        this.moveSnakeInterval = setInterval(this.moveSnake ,Math.max(120-2*length,30));
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

    render() {
        return (
            <div className="game" onKeyDown={this.setDirection}>
                <div className="game-board">
                    <Board
                        squares = {this.state.squares}
                        onClick={x => this.handleClick(x)}
                    />
                </div>
                <ul>
                    <li> Instructions: click the dynamite to prevent it from exploding! </li>
                    <li> Highscore: {this.state.highscore} </li>
                    <li> <button onClick = {() => {this.startGame()}}> Start Game </button> </li>
                </ul>
            </div>
        );
    }
}

export default JoelGame;