/**
Game class
  HAS 2 players
    Players class
      have a mark symbol
      Mark a square
      
      Human IS a player
        has a mark symbol
        mark a square in the player way
      Computer IS a player
        has a mark symbol
        mark a square in the computer 'way
  Has a winner
  Has turns
  HAS a board class
    Board HAS rows - 8 rows  class
      rows HAVE squares class
        rows have a winning state
        rows have a immidiate threat state
        squares HAVE a state class
          Empty, player mark, computer mark
  Has rules
    Possible Marks
    turn order
 */

const RLS = require('readline-sync');

class Player {
  constructor(name, game) {
    this.name = name;
    // this.wins = 0;
    // this.losses = 0
    this.mark = null;
    this.game = game; //collaborator
  }
  getName() {
    return this.name;
  }
  setName(name) {
    this.name = name;
  }
  getMark() {
    return this.mark;
  }
  setMark(mark) {
    this.mark = mark;
  }
}
class Human extends Player {
  constructor(game) {
    super(null, game);
  }
  chooseSquare() {
    let board = this.game.board;
    board.displayBoard();

    let chosenSquare = RLS.keyInSelect(board.getAvailablePositions(),'Pick an open Square.');
  
    // ensure an available square is chosen
    while(board.getAvailablePositions()[chosenSquare] === 'TAKEN') {
      board.displayBoard();
      console.log(`Error! The ${Board.positions[chosenSquare]} square is already taken. Try again!`);
      chosenSquare = RLS.keyInSelect(board.getAvailablePositions(),'Pick an open Square.');
    }

    //update board marker and positions remaining
    board.placeMark(chosenSquare, this.getMark());
  
    //display new board state
    board.displayBoard();
  }
}
class Computer extends Player {
  constructor(game) {
    super('SuperComputer 5000', game);
  }
  chooseSquare() {
    let board = this.game.board;

    let availableIndiciesArr = board.getAvailableSquareIndicies();

    let randomChoice = Math.floor(Math.random() * availableIndiciesArr.length);

    board.placeMark(availableIndiciesArr[randomChoice], this.getMark());

    // board.displayBoard();
  }
  choiceLogic() {
    //random
    // let availableIndicies = board.getAvailableSquareIndicies();
  }
}

class Board {
  constructor(game) {
    this.game = game; //collaborator
    this.squares = new Array(9).fill(Board.marks.initial);
  }
  static positions = ['Top Left', 'Top Center', 'Top Right',
  'Middle Left', 'Middle Center', 'Middle Right',
  'Bottom Left', 'Bottom Center', 'Bottom Right'];
  static marks = {initial : ' ', player1 : 'X', player2 : 'O'};
  static winningIndices = [
    [0, 1, 2], //top row
    [3, 4, 5], //middle row
    [6, 7, 8], //bottom row
    [0, 4, 8], //top left to bottom right diagonal
    [2, 4, 6], //top right to bottom left diagonal
    [0, 3, 6], //left column
    [1, 4, 7], //middle column
    [2, 5, 8]  //right column
  ];
  displayBoard() {
    console.clear();
    console.log(`${this.game.player1.getName()} : ${this.game.player1.getMark()}'s | ${this.game.player2.getName()} : ${this.game.player2.getMark()}'s`);
    console.log('');
    console.log(`     |     |`);
    console.log(`  ${this.squares[0]}  |  ${this.squares[1]}  |  ${this.squares[2]}`); 
    console.log(`     |     |`);
    console.log(`-----+-----+-----`);
    console.log(`     |     |`);
    console.log(`  ${this.squares[3]}  |  ${this.squares[4]}  |  ${this.squares[5]}`);
    console.log(`     |     |`);
    console.log(`-----+-----+-----`);
    console.log(`     |     |`);
    console.log(`  ${this.squares[6]}  |  ${this.squares[7]}  |  ${this.squares[8]}`);
    console.log(`     |     |`);
    console.log('');
  }
  //returns an array of available and TAKEN board positions on the calling board.
  getAvailablePositions() {
    return Board.positions.slice().map((position, idx) => {
      if(this.getAvailableSquareIndicies().includes(idx)) return position;
      else return 'TAKEN';
    });
  }
  //returns an array of the current available squares indicies on the calling board
  getAvailableSquareIndicies() {
    return this.squares.map((element,idx) => element === Board.marks.initial ? idx : null)
                       .filter(element => element !== null);
  }
  //places a player's mark in the squares array of the calling board.
  placeMark(chosenSquare, playerMark) {
    this.squares[chosenSquare] = playerMark;
  }
}

class Game {
  constructor() {
    this.board = new Board(this);
    this.human = new Human(this);
    this.computer = new Computer(this);
    this.winner = null;
    this.player1 = null;
    this.player2 = null;
    this.turns = 0;
    Game.gamesPlayed.push(this);
  }
  static gamesPlayed = [];
  static getGamesPlayed() {
    console.log(`Number of games played: ${this.gamesPlayed.length}`);
  }
  static next(message = 'Hit Enter To Continue:') {
    RLS.question(`\n\n${message}\n\n`);
  }

  /****** - Getters and Setters - ******/
  getTurns() {
    return this.turns;
  }
  setWinner(winner) {
    this.winner = winner;
  }
  getWinner() {
    return this.winner;
  }

 /****** - GamePlay Operations - Bottom Level - ******/
  requestHumanName() {
    console.clear();
    this.human.setName(RLS.question('Welcome to Tic Tac Toe!\n\n What is your name? \n\n'));
  }
  displayPersonalGreeting() {
    console.clear();
    console.log(`Excellent! Welcome ${this.human.getName()}. Today you are matched up against ${this.computer.getName()}.`);
    Game.next();
  }
  requestTurnOrder() {
    //returns 0 if the user wants to go first, 1 if the user wants to go second.
    console.clear();
    return RLS.keyInSelect(['First', 'Second'], `${this.human.getName()}, would you like to go First, or Second?`);
  }
  setTurnOrder(humanTurnChoice) {
    if (humanTurnChoice === 0) {
      this.player1 = this.human;
      this.player2 = this.computer;
    } else {
      this.player1 = this.computer;
      this.player2 = this.human;
    }
  }
  setPlayerMarks() {
    this.player1.setMark(Board.marks.player1);
    this.player2.setMark(Board.marks.player2);
  }
  displayTurnOrder() {
    console.clear();
    console.log(`Perfect! ${this.player1.getName()} is Player 1 and ${this.player2.getName()} is Player 2.`);
    Game.next();
  }
  determineCurrentPlayer() {
    return this.turns % 2 === 0 ? this.player1 : this.player2;
  }
  incrementTurns() {
    this.turns ++;
  }
  determineWinner() {   
    //Return the current winner - a player, a tie, null(no winner determined)
    if(Board.winningIndices.some(subArr => subArr.every(square => this.board.squares[square] === Board.marks.player1))) {
      return this.player1; 
    } else if (Board.winningIndices.some(subArr => subArr.every(square => this.board.squares[square] === Board.marks.player2))) {
      return this.player2;
    } else if (Board.winningIndices.every(subArr => subArr.every(square => this.board.squares[square] !== Board.marks.initial))) {
      return "tie";
    } else return null; //no winner yet.
  }
  displayWinner() {
    console.clear();
    this.board.displayBoard();
    if (this.winner === 'tie') console.log("The game ended with a tie.");
    else console.log(`${this.winner.getName()} is the winner!`);
    Game.next('Hit enter to proceed the game summary.');
  }
  displayGameSummary() {
    console.clear();
    console.log(`Game Summary`);
    console.log(`Winner : ${this.winner.getName()}`);
    console.log(`Turns : ${this.getTurns()}`);
    console.log(`Player1 : ${this.player1.name}`);
    console.log(`Player2 : ${this.player2.name}`);
    Game.next('Hit Enter to exit.');
  }
  displayGoodbyeMessage() {
    console.clear();
    console.log(`\nGoodbye, ${this.human.getName()}! Thanks for playing!\n`);
  }

  /****** - Grouped Gameplay Running Functions - Mid Level - ******/
  setupGame() {
    this.requestHumanName();
    this.displayPersonalGreeting()
    this.setTurnOrder(this.requestTurnOrder());
    this.setPlayerMarks();
    this.displayTurnOrder();
  }
  playTurns() {
    while (true) {
      this.determineCurrentPlayer().chooseSquare();
      this.incrementTurns();
      this.setWinner(this.determineWinner()); 
      if (this.winner) break;
    }
  }
  endGame() {
    this.displayWinner();
    this.displayGameSummary()
    this.displayGoodbyeMessage();
  }
/****** - PLAY GAME - Top Level - ******/
  play() {
    this.setupGame();
    this.playTurns();
    this.endGame();
  }
}

let game = new Game();
game.play();