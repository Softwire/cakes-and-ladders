import React, { Component } from 'react';
import './Snake.css';

const numRows = 20;
const numCols = 20;
const initLength = 4;
const directions = {37: [-1, 0], 38: [0, -1], 39: [1, 0], 40: [0, 1]};
var nextDir = 39;

class Snake extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board : Array(numRows*numCols).fill('empty'),
      snake : [],
      dir : 39,
      walls : [],
      food : 0,
    };
    // var snakeHead = ((numRows+1)/2)*numCols;
    // var row = parseInt(snakeHead/numCols)
    // var col = snakeHead % numCols;
    // for(var i=0; i<initLength; i++) {
    //     var snakeIndex = row * numCols + (col - i);
    //     this.state.snake.push(snakeIndex);
    //     this.state.board[snakeIndex] = 'body';
    // }
    //
    // let food = this.newFood(this.state.board);
    //
    // this.state.board[food] = 'food';
    // let walls = this.makeWalls(this.state.board, this.state.walls);
    // for(let i=0; i<walls.length; i++) {
    //     this.state.board[walls[i]] = 'wall';
    // }

    this._resume = this._resume.bind(this);
    this.makeWalls = this.makeWalls.bind(this);
    this._tick = this._tick.bind(this);
    this._handleKey = this._handleKey.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.setupBoard = this.setupBoard.bind(this);
  }

  // componentDidMount() {
  //   this._resume();
  // }

    setupBoard() {
      let board = Array(numRows*numCols).fill('empty');
      let snake = [];
      let dir = 39;
      let walls = [];

      let snakeHead = ((numRows+1)/2)*numCols;
      let coord = this.to2d(snakeHead);

      for(let i=0; i<initLength; i++) {
          let snakeIndex = coord[1] * numCols + (coord[0] - i);
          snake.push(snakeIndex);
          board[snakeIndex] = 'body';
      }

      let food = this.newFood(board);
      board[food] = 'food';

      walls = this.makeWalls(board, walls);

      for(let i=0; i<walls.length; i++) {
        board[walls[i]] = 'wall';
      }

      nextDir = dir;

      this.setState({
          board : board,
          snake : snake,
          dir : dir,
          walls : walls,
          food : food,
      });
    }

  makeWalls(board, walls) {
    let numWalls = parseInt(Math.random() * 5 + 2);

    for (let i=0; i<numWalls; i++) {

      let start = parseInt(Math.random() * (numRows*numCols));
      let direction = Math.random();
      let length = parseInt(Math.random() * 6 + 2);
      if(direction < 0.5) {
        for(let j=0; j<length; j++) {
          if(board[(start+j)] === 'empty') walls.push(start+j);
        }
      } else {
        for(let j=0; j<length; j++) {
          if(board[(start+j*numCols)%(numCols*numRows)] === 'empty') walls.push((start + j * numCols) % (numCols * numRows));
        }
      }
    }
    return walls;
  }

  _resume() {
      this._tick();
  }

  newFood(board) {
      let food = parseInt(Math.random() * numRows * numCols);
      while(board[food] !== 'empty') {
          food = parseInt(Math.random() * numRows * numCols);
      }
      return food;
  }

  to2d(coord) {
    let coord2d = [];

    coord2d[0] = coord%numCols;
    coord2d[1] = parseInt(coord/numCols);

    return coord2d;
  }

  gameOver(snake, board) {
    for(let i=0; i<snake.length; i++) {
      board[snake[i]] = 'dead';
    }
  }

  _tick() {
    let snake = this.state.snake;
    let board = this.state.board;
    let walls = this.state.walls;
    let snakehead = snake[0];
    let food = this.state.food;

    let move = directions[nextDir];
    let coord2d = this.to2d(snakehead);
    let nextCol = (coord2d[0]+move[0]);
    let nextRow = (coord2d[1]+move[1]);

    // if(nextCol < 0 || nextCol >= numCols) nextCol = (this.state.dir == 37) ? numCols-1 : 0;
    // if(nextRow < 0) nextRow = numRows -1;

      let next = [(nextRow * numCols + nextCol)];

      let len;
      if (next[0] === food) {
          len = snake.length;
          food = this.newFood(board);
          board[food] = 'food';
      } else {
          len = snake.length - 1;
      }

      let isDead = false;

      if(nextCol < 0 || nextCol >= numCols || nextRow < 0 || nextRow >= numRows || walls.indexOf(next[0]) >= 0 || (snake.indexOf(next[0]) >=0 && snake.indexOf(next[0]) < len)) {
        isDead = true;
      } else {
          for (let i = 0; i < len; i++) {
              next.push(snake[i]);
          }
      }
    
    if(!isDead) {
      board[snake[snake.length-1]] = 'empty';
      board[next[0]] = 'body';
    } else {
      this.gameOver(snake, board);
    }

    this.setState({
      snake : next,
      board : board,
      dir : nextDir,
      food : food,
    });
  
    if(!isDead) setTimeout(this._tick.bind(this), 100);
  }

  _handleKey(props) {
    let direction = props.nativeEvent.keyCode;

    let diff = Math.abs(this.state.dir - direction);

    if(directions[direction] && diff !== 0 && diff !== 2) nextDir = direction;
  }

  render() {
    let cells = [];
    let cellSize = 20;

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        cells.push(<div className={this.state.board[row * numCols + col] + '-square'} />)
      }
    }

    return (
      <div className="snake-game">
        <h1 className="snake-score">Length: {this.state.snake.length}</h1>
        <div
          ref="board"
          tabIndex={0}
          onKeyDown={this._handleKey.bind(this)}
          style={{width: numCols * cellSize, height: numRows * cellSize}}>
          {cells}
            <ul>
                <button onClick = {() => {this.setupBoard()}}> Setup Board </button>
                <button onClick = {() => {this._resume()}}> Start Game </button>
            </ul>
        </div>
      </div>
    );
  }
}

export default Snake;
