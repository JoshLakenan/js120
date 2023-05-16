/**

1. Write a textual description of the problem or exercise.
    RPS is a two-player game where each player chooses one of three possible moves: rock, paper, or scissors. 
    The winner is chosen by comparing their moves with the following rules:

      Rock crushes scissors, i.e., rock wins against scissors.
      Scissors cuts paper, i.e., scissors beats paper.
      Paper wraps rock, i.e., paper beats rock.

    If the players chose the same move, the game is a tie.

    Keep score. first to three wins, WINS!

2. Extract the significant nouns and verbs from the description.
    Nouns - Player, Moves, Rules , GAME
    Verbs - choose, compare
3. Organize and associate the verbs with the nouns.
    Player : choses -> move
    Rules : compare -> player's moves

Nouns = objects or types of objects
Verbs = methods


Orchestration Engine Object
  the procedural program flow



*Practice Later*
Adjust computer choice based on history
Come up with some rules based on the history of moves to help the computer make its moves. 
For instance, if the human tends to win over 60% of his hands when the computer chooses "rock," 
then decrease the likelihood that the computer will choose "rock." First, come up with an 
appropriate rule, then implement some history analysis. Use the analysis to adjust the weight 
of each choice -- for instance, increase the weight to increase the likelihood of choosing a 
particular move. Currently, the computer has a 33% chance of making any given move -- it's 
those odds that you need to weight. Finally, have the computer consider the weight of each 
choice when choosing a move.

 */

//orchestration Engine object - the procedural program flow
const RLS = require('readline-sync');
const OUTCOMES = ['human', 'computer', 'tie'];
const MOVES = ['Rock', 'Paper', 'Scissors', 'Spock', 'Lizard'];
const LOSS_POSITIONS = [1, 3];
const WINNING_SCORE = 3;


const RPSGame = {
  human : createHuman(),
  computer : createComputer(),
  round : [],
  winner : null,

  displayWelcomeMessage() {
    console.clear();
    console.log(`Welcome to Rock Paper Scissors Spock Lizard!`);
    RLS.question('\nPress enter to play\n');
  },

  initializeRound() {
    //initialize next round
    this.round.push(null);
  },

  updateRound() {
    let roundWinner;

    if (this.human.move.at(-1) === this.computer.move.at(-1)) roundWinner = OUTCOMES.at(2);
    else if (LOSS_POSITIONS.some(position => MOVES.at(this.computer.move.at(-1)) === MOVES.at(this.human.move.at(-1) - position))) {
      roundWinner = OUTCOMES.at(0);
    } 
    else roundWinner = OUTCOMES.at(1);

    //record the current round winner in the round property's nested array value
    this.round[this.round.length - 1] = roundWinner;
  },

  updateScore() {
    let roundWinner = this.round.at(-1);

    if (roundWinner === OUTCOMES.at(0)) {
      if (this.human.recordWin() === WINNING_SCORE) {
        this.winner = OUTCOMES.at(0);
      }
    }

    if (roundWinner === OUTCOMES.at(1)) {
      if (this.computer.recordWin() === WINNING_SCORE) {
        this.winner = OUTCOMES.at(1);
      }
    }
  },

  displayRoundWinner() {
    console.log(`\nYou chose: ${MOVES.at(this.human.move.at(-1))}`);
    console.log(`The computer chose: ${MOVES.at(this.computer.move.at(-1))}\n`);

    switch (this.round.at(-1)) {
      case OUTCOMES.at(0) :
        console.log('You Win the round!\n');
        break;
      case OUTCOMES.at(1) :
        console.log(`The Computer won the round.\n`);
        break;
      case OUTCOMES.at(2) :
        console.log(`This round was a tie.\n`);
        break;
      default : console.log('error');
    }
  },

  displayGameStatus() {
    console.clear();
    console.log(`Round: ${this.round.length}`);
    console.log(`Human Score : ${this.human.score}`);
    console.log(`Computer Score : ${this.computer.score}`);
  },

  continue(query) {
    return RLS.keyInYNStrict(query);
  },

  displayGoodbyeMessage() {
    console.log(`\nThanks for playing!\n`);
  },

  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.initializeRound();
      this.displayGameStatus();
      this.human.choose();
      this.computer.choose();
      this.updateRound();
      this.updateScore();
      this.displayRoundWinner();
      if(this.winner) {
        this.displayGameStatus();
        this.displayRoundWinner();

        //add displayGameWinner() - include summary move data - 
        console.log(`${this.winner} won the game!`);

        console.log('\n***Human Moves***\n');
        this.human.move.forEach(move => console.log(MOVES[move]));

        console.log('\n***Computer Moves***\n');
        this.computer.move.forEach(move => console.log(MOVES[move]));
        break;

        // end
      }
      if (!this.continue(`Would you like to continue the match?`)) break;
    }
    this.displayGoodbyeMessage();
  },
};

function createPlayer() {
  return {
    move : [],
    score : 0,

    recordWin () {
      this.score += 1;
      return this.score;
    }
  };
}

function createComputer() {
  let playerObject = createPlayer();
  let computerObject = {
    choose() {
      let randomChoiceIndex = Math.floor(Math.random() * MOVES.length);
      this.move.push(randomChoiceIndex);
    }
  };
  
  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      this.move.push(RLS.keyInSelect(MOVES, `Pick Your Move!`));
    }
  };

  return Object.assign(playerObject, humanObject);
}

//bonus features....perhaps?
// function createMove() {
//   return {
//     // possible state: type of move (paper, rock, scissors)
//   };
// }

// function createRule() {
//   return {
//     // possible state? not clear whether Rules need state
//   };
// }

// // Since we don't yet know where to put `compare`, let's define
// // it as an ordinary function.
// let compare = function(move1, move2) {
//   // not yet implemented
// };

RPSGame.play(); 