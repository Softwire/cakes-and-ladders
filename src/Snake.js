import React, { Component } from 'react';
import './Snake.css';

var numRows = 20;
var numCols = 20;
var initLength = 4;
var directions = {37: [-1, 0], 38: [0, -1], 39: [1, 0], 40: [0, 1]};
var nextDir = 39;
var food = parseInt(Math.random() * numRows * numCols);;

class Snake extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board : Array(numRows*numCols).fill('empty'),
      snake : [],
      dir : 39,
      nextDir : 39,
    }
    var snakeHead = ((numRows+1)/2)*numCols;
    var row = parseInt(snakeHead/numCols)
    var col = snakeHead % numCols;
    for(var i=0; i<initLength; i++) {
      var snakeIndex = row * numCols + (col-i);
      this.state.snake.push(snakeIndex);
      this.state.board[snakeIndex] = 'body';
    }
    this.state.board[food] = 'food';
  }

  componentDidMount() {
    this._resume();
  }

  _resume() {
    this._tick();
  }
  
  newFood(board) {
    while(true) {
        food = parseInt(Math.random() * numRows * numCols);
        if(board[food] != 'body') {
            board[food] = 'food';
            break;
        }
    }
  }

  to2d(coord) {
    var coord2d = []
    coord2d[0] = coord%numCols;
    coord2d[1] = parseInt(coord/numCols);
    return coord2d;
  }

  gameOver(snake, board) {
    alert('Game over, please refresh')
    for(var i=0; i<snake.length; i++) {
      board[snake[i]] = 'dead';
    }
  }

  _tick() {
    var snake = this.state.snake;
    var board = this.state.board;
    var snakehead = snake[0];

    var move = directions[nextDir];
    var coord2d = this.to2d(snakehead);
    var nextCol = (coord2d[0]+move[0]);
    var nextRow = (coord2d[1]+move[1]);

    if(nextCol < 0 || nextCol >= numCols) nextCol = (this.state.dir == 37) ? numCols-1 : 0;
    if(nextRow < 0) nextRow = numRows -1;

    var next = [(nextRow*numCols + nextCol)%400];

    var len;
    if(next == food) {
      len = snake.length;
      this.newFood(board);
    } else {
      len = snake.length-1;
    }
    
    var isDead = false;

    for(var i=0; i<len; i++) {
      if(snake[i] == next[0]){
        this.gameOver(snake, board)
        isDead = true;
        break;
      }
      next.push(snake[i]);
    }
    
    if(!isDead) {
      board[snake[snake.length-1]] = 'empty';
      board[next[0]] = 'body';
    }

    this.setState({
      snake : next,
      board : board,
      dir : nextDir,
    })
  
    if(!isDead) setTimeout(this._tick.bind(this), 100);
  }

  _handleKey(props) {
    console.log('handling key');
    var direction = props.nativeEvent.keyCode;
    console.log('init: ' + this.state.dir + ' next: ' + direction);
    var diff = Math.abs(this.state.dir - direction)
    if(directions[direction] && diff != 0 && diff != 2) {
      nextDir = direction;
    }
  }

  // renderRow(numRow)
  // {
  //   var row = [];
  //   for (var i = 0; i < numCols; i++) {
  //     row.push(<div className={this.state.board[numRow * numCols + i] + '-square'}/>);
  //   }
  //   return (
  //       <div className="board-row">
  //           {row}
  //           </div>);
  // }

   render() {
    var cells = [];
    var cellSize = 20;

    for (var row = 0; row < numRows; row++) {
      for (var col = 0; col < numCols; col++) {
        cells.push(<div class={this.state.board[row * numCols + col] + '-square'} />)
      }
    }

    return (
      <div class="snake-game">
        <h1 class="snake-score">Length: {this.state.snake.length}</h1>
        <div
          ref="board"
          tabIndex={0}
          onKeyDown={this._handleKey.bind(this)}
          style={{width: numCols * cellSize, height: numRows * cellSize}}>
          {cells}
        </div>
      </div>
    );
    //
    //   var rows = [];
    //   for (var i = 0; i < numRows; i++) {
    //     rows.push(this.renderRow(i))
    //   }
    //   return (
    //       <div
    //           className="snake-game"
    //           onKeyDown={this._handleKey.bind(this)}
    //       >
    //           <h1 className="snake-score">Length: {this.state.snake.length}</h1>
    //       <div
    //         ref="board">
    //         {rows}
    //       </div>
    //       </div>);
  }
}

export default Snake;
