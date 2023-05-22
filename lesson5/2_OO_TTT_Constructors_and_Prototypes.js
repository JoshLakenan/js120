const RLS = require('readline-sync');

function Player(name, game) {
  this.name = name;
  this.game = game;
  this.mark = null;
}
//Player Prototype Setup
let PlayerProto = {
  getName() {
    return this.name;
  },
  setName(name) {
    this.name = name;
  },
  getMark() {
    return this.mark;
  },
  setMark(mark) {
    this.mark = mark;
  }
}
Player.prototype = PlayerProto;
Player.prototype.constructor = Player;





function Human(game) {
  Player.call(this, null, game); //implement class / type inheritance from Player to Human
}
Human.prototype = Object.create(Player.prototype); //implement prototype inheritance
Human.prototype.constructor = Human; //reset constructor
Human.prototype.chooseSquare = function() {
  let board = this.game.board;

  this.game.displayBoard();
  
  let chosenSquare = RLS.keyInSelect(board.getAvailablePositions(),'Pick an open Square.');

  // ensure an available square is chosen
  while(board.getAvailablePositions()[chosenSquare] === 'TAKEN') {
    this.game.displayBoard();
    // console.log(`Error! The ${Board.positions[chosenSquare]} square is already taken. Try again!`);
    chosenSquare = RLS.keyInSelect(board.getAvailablePositions(),`Error! The ${Board.positions[chosenSquare]} square is already taken. Try again!`);
  }

  //update board marker and positions remaining
  board.placeMark(chosenSquare, this.getMark());

  //display new board state
  // this.game.displayBoard();

} //assign Human prototype method




function Computer(game) {
  Player.call(this,'Intelligent Computer Ian', game);
}
Computer.prototype = Object.create(Player.prototype);
Computer.prototype.constructor = Computer;
Computer.prototype.chooseSquare = function() {
  let board = this.game.board;

  let availableIndiciesArr = board.getAvailableSquareIndicies();

  let randomChoice = Math.floor(Math.random() * availableIndiciesArr.length);

  board.placeMark(availableIndiciesArr[randomChoice], this.getMark());
}




function Board() {
  this.squares = new Array(9).fill(Board.marks.initial);
}
//static properties
Board.positions = [
  'Top Left', 'Top Center', 'Top Right',
  'Middle Left', 'Middle Center', 'Middle Right',
  'Bottom Left', 'Bottom Center', 'Bottom Right'
];
Board.marks = {initial : ' ', player1 : 'X', player2 : 'O'};
Board.winningIndices = [
  [0, 1, 2], //top row
  [3, 4, 5], //middle row
  [6, 7, 8], //bottom row
  [0, 4, 8], //top left to bottom right diagonal
  [2, 4, 6], //top right to bottom left diagonal
  [0, 3, 6], //left column
  [1, 4, 7], //middle column
  [2, 5, 8]  //right column
];
//set prototype methods / constructor
let BoardProto = {
  threeInARow(playerMark) {
    return Board.winningIndices.some(subArr => subArr.every(square => this.squares[square] === playerMark));
  },
  isFull() {
    return this.squares.every(square => square !== Board.marks.initial);
  },
  //returns an array of available and TAKEN board positions on the calling board.
  getAvailablePositions() {
    return Board.positions.slice().map((position, idx) => {
      if(this.getAvailableSquareIndicies().includes(idx)) return position;
      else return 'TAKEN';
    });
  },
  //returns an array of the current available squares indicies on the calling board
  getAvailableSquareIndicies() {
    return this.squares.map((element,idx) => element === Board.marks.initial ? idx : null)
                       .filter(element => element !== null);
  },
  //places a player's mark in the squares array of the calling board.
  placeMark(chosenSquare, playerMark) {
    this.squares[chosenSquare] = playerMark;
  }
}
Board.prototype = BoardProto;
Board.prototype.constructor = Board;





function Game() {
  this.board = new Board();
  this.human = new Human(this);
  this.computer = new Computer(this);
  this.winner = null;
  this.player1 = null;
  this.player2 = null;
  this.turns = 0;
  Game.gamesPlayed.push(this);
};
//static Game properties
Game.gamesPlayed = [];
Game.displayGamesPlayed = function() {
  console.log(`Number of games played: ${this.gamesPlayed.length}`);
}
Game.next = function(message = 'Hit Enter To Continue:') {
  RLS.question(`\n\n${message}\n\n`);
}
//Game prototype
let GameProto = {
  /****** - Getters and Setters - ******/
  getTurns() {
    return this.turns;
  },
  setWinner(winner) {
    this.winner = winner;
  },
  getWinner() {
    return this.winner;
  },

  /****** - GamePlay Operations - Bottom Level - ******/
  requestHumanName() {
    console.clear();
    this.human.setName(RLS.question('Welcome to Tic Tac Toe!\n\n What is your name? \n\n'));
  },
  displayPersonalGreeting() {
    console.clear();
    console.log(`Excellent! Welcome ${this.human.getName()}. Today you are matched up against ${this.computer.getName()}.`);
    Game.next();
  },
  requestTurnOrder() {
    //returns 0 if the user wants to go first, 1 if the user wants to go second.
    console.clear();
    return RLS.keyInSelect(['First', 'Second'], `${this.human.getName()}, would you like to go First, or Second?`);
  },
  setTurnOrder(humanTurnChoice) {
    if (humanTurnChoice === 0) {
      this.player1 = this.human;
      this.player2 = this.computer;
    } else {
      this.player1 = this.computer;
      this.player2 = this.human;
    }
  },
  setPlayerMarks() {
    this.player1.setMark(Board.marks.player1);
    this.player2.setMark(Board.marks.player2);
  },
  displayTurnOrder() {
    console.clear();
    console.log(`Perfect! ${this.player1.getName()} is Player 1 and ${this.player2.getName()} is Player 2.`);
    Game.next();
  },
  determineCurrentPlayer() {
    return this.turns % 2 === 0 ? this.player1 : this.player2;
  },
  displayBoard() {
    console.clear();
    console.log(`${this.player1.getName()} : ${this.player1.getMark()}'s | ${this.player2.getName()} : ${this.player2.getMark()}'s`);
    console.log('');
    console.log(`     |     |`);
    console.log(`  ${this.board.squares[0]}  |  ${this.board.squares[1]}  |  ${this.board.squares[2]}`); 
    console.log(`     |     |`);
    console.log(`-----+-----+-----`);
    console.log(`     |     |`);
    console.log(`  ${this.board.squares[3]}  |  ${this.board.squares[4]}  |  ${this.board.squares[5]}`);
    console.log(`     |     |`);
    console.log(`-----+-----+-----`);
    console.log(`     |     |`);
    console.log(`  ${this.board.squares[6]}  |  ${this.board.squares[7]}  |  ${this.board.squares[8]}`);
    console.log(`     |     |`);
    console.log('');
  },
  incrementTurns() {
    this.turns ++;
  },
  determineWinner() {   
    //Return the current winner - a player, a tie, null(no winner determined)
    if(this.board.threeInARow(this.player1.getMark())) return this.player1; 
    else if (this.board.threeInARow(this.player2.getMark())) return this.player2;
    else if (this.board.isFull()) return {name : 'Tie', getName() {return this.name}};
    else return null; //no winner yet.
  },
  displayWinner() {
    this.displayBoard();
    if (this.winner.getName() === 'Tie') console.log("The game ended with a tie.");
    else console.log(`${this.winner.getName()} is the winner!`);
    Game.next('Hit enter to proceed the game summary.');
  },
  displayGameSummary() {
    this.displayBoard();
    console.log(`\nGame Summary`);
    console.log(`Winner : ${this.winner.getName()}`);
    console.log(`Turns : ${this.getTurns()}`);
    console.log(`Player1 : ${this.player1.name}`);
    console.log(`Player2 : ${this.player2.name}`);
    Game.next('Hit Enter to exit.');
  },
  displayGoodbyeMessage() {
    console.clear();
    console.log(`\nGoodbye, ${this.human.getName()}! Thanks for playing!\n`);
  },

  /****** - Grouped Gameplay Running Functions - Mid Level - ******/
  setupGame() {
    this.requestHumanName();
    this.displayPersonalGreeting()
    this.setTurnOrder(this.requestTurnOrder());
    this.setPlayerMarks();
    this.displayTurnOrder();
  },
  playTurns() {
    while (true) {
      this.determineCurrentPlayer().chooseSquare();
      this.incrementTurns();
      this.setWinner(this.determineWinner()); 
      if (this.winner) break;
    }
  },
  endGame() {
    this.displayWinner();
    this.displayGameSummary()
    this.displayGoodbyeMessage();
  },
/****** - PLAY GAME - Top Level - ******/
  play() {
    this.setupGame();
    this.playTurns();
    this.endGame();
  }
}
Game.prototype = GameProto;
Game.prototype.constructor = Game;


let game = new Game();

game.play();