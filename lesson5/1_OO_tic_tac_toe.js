/**
Game (n)
Board (n)
Row (n)
Square (n)
Marker (n)
Player (n)
  Mark (v)
  Play (v)
  Human (n)
  Computer (n)
 */



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





Match Class
 - games played 

Game Class
 - static game number 
 - static game tracker / display results of past games
 Board class
   
   8 rows
   row class
     row name
     3 quares per row
    square class
      marker state - empty, X or O
     
Player Class
   - Name
   - Wins
   - Losses
   Human class extends player
       choose square
   computer class extends player
       choose square
   

play game

 */


const RLS = require('readline-sync');

class Board {
  constructor() {
    this.squares = new Array(9).fill(Board.marks.initial);
    this.availablePositions = Board.positions.slice();
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
    console.log('');
    console.log(`     |     |`);
    console.log(`  ${this.squares['0']}  |  ${this.squares['1']}  |  ${this.squares['2']}`); 
    console.log(`     |     |`);
    console.log(`-----+-----+-----`);
    console.log(`     |     |`);
    console.log(`  ${this.squares['3']}  |  ${this.squares['4']}  |  ${this.squares['5']}`);
    console.log(`     |     |`);
    console.log(`-----+-----+-----`);
    console.log(`     |     |`);
    console.log(`  ${this.squares['6']}  |  ${this.squares['7']}  |  ${this.squares['8']}`);
    console.log(`     |     |`);
    console.log('');
  }
  getAvailablePositions() {
    return this.availablePositions;
  }
  getAvailableSquareIndicies() {
    return this.squares.map((element,idx) => element === Board.marks.initial ? idx : null)
                       .filter(element => element !== null);
  }
  placeMark(chosenSquare, playerMark) {
    this.availablePositions[chosenSquare] = 'TAKEN';
    this.squares[chosenSquare] = playerMark;
  }
  getWinner() {
    if(Board.winningIndices.some(subArr => subArr.every(square => this.squares[square] === Board.marks.player1))) {
      return 'player1';
    } else if (Board.winningIndices.some(subArr => subArr.every(square => this.squares[square] === Board.marks.player2))) {
      return 'player2'
    } else if (Board.winningIndices.every(subArr => subArr.every(square => this.squares[square] !== Board.marks.initial))) {
      return "tie";
    } else return null; //no winner yet.
  }
}

class Player {
  constructor(name) {
    this.name = name;
    // this.wins = 0;
    // this.losses = 0
    this.mark = null;
  }
  getName() {
    return this.name;
  }
  setMark(mark) {
    this.mark = mark;
  }
  getMark() {
    return this.mark;
  }
}
class Human extends Player {
  constructor(name) {
    super(name);
  }
  chooseSquare(board) {
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
  constructor() {
    super('SuperComputer 5000');
  }
  chooseSquare(board) {
    let availableIndiciesArr = board.getAvailableSquareIndicies();

    let randomChoice = Math.floor(Math.random() * availableIndiciesArr.length);

    board.placeMark(availableIndiciesArr[randomChoice], this.getMark());

    board.displayBoard();
  }
  choiceLogic() {
    //random
    // let availableIndicies = board.getAvailableSquareIndicies();
  }
}

class Game {
  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
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
  getTurns() {
    return this.turns;
  }
  incrementTurns() {
    this.turns ++;
  }
  displayUserGreeting() {
    this.human.name = RLS.question('Welcome to Tic Tac Toe!\n\n What is your name? \n\n');
    console.clear();
    RLS.question(`Excellent! Welcome ${this.human.name}. Today you are matched up against ${this.computer.name}.\n\nHit enter to begin!\n\n`);
  }
  setPlayerMarks() {
    this.player1.setMark(Board.marks.player1);
    this.player2.setMark(Board.marks.player2);
  }
  determineTurnOrder() {
    console.clear();
    let humanTurnChoice = RLS.keyInSelect(['First', 'Second'], `${this.human.getName()}, would you like to go First, or Second?`);
    
    if (humanTurnChoice === 0) {
      this.player1 = this.human;
      this.player2 = this.computer;
    } else {
      this.player1 = this.computer;
      this.player2 = this.human;
    }

    this.setPlayerMarks();

    RLS.question(`Exellent! ${this.human.getName()}, you are ${this.human.getMark()}'s\n\n${this.computer.getName()} is ${this.computer.getMark()}'s. \n Press Enter to continue:\n`);

    //console.clear();
  }
  getCurrentPlayer() {
    return this.turns % 2 === 0 ? this.player1 : this.player2;
  }
  setWinner(winner) {
    this.winner = winner;
  }
  getWinner() {
    return this.winner;
  }
  assignWinner(winner) {
    if (winner === null) this.setWinner(null);
    else if (winner === 'tie') this.setWinner('tie');
    else this.setWinner(winner === 'player1' ? this.player1 : this.player2);
  }
  displayWinner() {
    console.clear();
    this.board.displayBoard();
    if (this.winner === 'tie') console.log("The game ended with a tie.");
    else console.log(`${this.winner.getName()} is the winner!`);
    RLS.question('\n\nHit enter to proceed the game summary.')
  }
  displayGameSummary() {
    console.clear();
    console.log(`Game Summary`);
    console.log(`Turns : ${this.getTurns()}`);
    console.log(`Player1 : ${this.player1.name}`);
    console.log(`Player2 : ${this.player2.name}`);
    RLS.question('\n\nHit Enter to exit.\n\n');


  }
  displayGoodbyeMessage() {
    console.clear();
    console.log(`\nGoodbye, ${this.human.getName()}! Thanks for playing!\n`);
  }
  playTurns() {
    while (true) {
      this.getCurrentPlayer().chooseSquare(this.board);
      this.incrementTurns();
      this.assignWinner(this.board.getWinner()); 
      if (this.winner) break;
    }
  }
  setupGame() {
    this.displayUserGreeting();
    this.determineTurnOrder();
  }
  endGame() {
    this.displayWinner();
    this.displayGameSummary()
    this.displayGoodbyeMessage();
  }
  play() {
    this.setupGame();
    this.playTurns();
    this.endGame();
  }
}

let game = new Game();

game.play();

