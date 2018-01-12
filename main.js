
// Inquirer Package
var inquirer = require('inquirer');

// list of random words
var guessWordList = require('./game.js');

// word tester
var checkForLetter = require('./word.js');

// letters to display
var lettersToDisplay = require('./letter.js');

// Global Variables
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var lettersAlreadyGuessed = [];
var lettersCorrectlyGuessed = [];      
var displayHangman;

// Game Object

var game = {
  wordBank : guessWordList, 
  guessesRemaining : 10, 
  currentWrd : null, 


  startGame : function(){
    // user gets 12 guesses
    this.guessesRemaining = 12;

    // pull a random word from the list of words
    var j = Math.floor(Math.random() * this.wordBank.length);
    this.currentWrd = this.wordBank[j];

    // tell the user to start
    console.log('Guess the country. How worldly are you?');

    // show empty spaces and whatever the user guesses
    displayHangman = new lettersToDisplay(this.currentWrd);
    displayHangman.parseDisplay();
    console.log('Remaining Guesses: ' + game.guessesRemaining);

    // prompt for a letter
    keepPromptingUser();
  }

};


// User Prompt Function

function keepPromptingUser(){

  // gap between inputs
  console.log('');

  // prompt for another letter if guesses are still remaining
  if(game.guessesRemaining > 0){
    inquirer.prompt([
      {
        type: "value",
        name: "letter",
        message: "Guess a Letter: "
      }
    ]).then(function(userInput){

      // Letter Input
      var inputLetter = userInput.letter.toLowerCase();
      
      // Valid input
      if(alphabet.indexOf(inputLetter) == -1){

        // inform user they did not guess right
        console.log('Sorry! "' + inputLetter + '" is not a letter. Try again!');
        console.log('Guesses Left: ' + game.guessesRemaining);
        console.log('Letters already guessed: ' + lettersAlreadyGuessed);
        keepPromptingUser();

      }
      else if(alphabet.indexOf(inputLetter) != -1 && lettersAlreadyGuessed.indexOf(inputLetter) != -1){

        // Tell user they already guessed that letter
        console.log('Hey, you already guessed "' + inputLetter + '". Try again!');
        console.log('Guesses Left: ' + game.guessesRemaining);
        console.log('Letters already guessed: ' + lettersAlreadyGuessed);
        keepPromptingUser();

      }
      else{

        // Remove the entry from the list of possible inputs
        lettersAlreadyGuessed.push(inputLetter);


        // Is the letter in the word?
        var letterInWord = checkForLetter(inputLetter, game.currentWrd);

        // then update the letter object
        if(letterInWord){

          // Add to correct letters list
          lettersCorrectlyGuessed.push(inputLetter);

          // Show the empty letters ( _ _ _ _) and guesses
          displayHangman = new lettersToDisplay(game.currentWrd, lettersCorrectlyGuessed);
          displayHangman.parseDisplay();


          // See if the user has won
          if(displayHangman.winner){
            console.log('Congrats, you won! You are quite worldly, indeed!')
            return;
          }
          // Not a win yet, then ask for another input and decrement guesses
          else{
            console.log('Guesses Left: ' + game.guessesRemaining);
            console.log('Letters already guessed: ' + lettersAlreadyGuessed);
            keepPromptingUser();
          }

        }
        // Otherwise, decrement guesses and re-prompt the hangman object
        else{
          game.guessesRemaining--;

          displayHangman.parseDisplay();
          console.log('Guesses Left: ' + game.guessesRemaining);
          console.log('Letters already guessed: ' + lettersAlreadyGuessed);
          keepPromptingUser();
        }
        
      }

    });
    
  }
  // If not enough guesses left, user loses game
  else{
    console.log('Sorry, you lost! I guess you really are not the worldly type, afterall.');
    console.log('If you are feeling more confident then try again.');
    console.log('The correct word was actually: "' + game.currentWrd + '".');
  }

}


// Create a new game object using the constructor and begin playing
game.startGame();