
var lettersToDisplay = function(word, goodGuesses){

  this.gameWord = word;
  this.goodLetters = goodGuesses;
  this.displayText = '';

  // winner is false to start
  this.winner = false;

  // displays hangman word
  this.parseDisplay = function(){

    // shows user the word
    var shown = '';

    // If no goodGuesses yet then do this for Loop
    if(this.goodLetters == undefined){
     for(var i = 0; i < this.gameWord.length; i++){
        // If not the letter
        shown += ' _ ';
      }
    }
    // otherwise check all letters in loop below
    else{

      // loop through the word itself and then each possible correct letter
      for(var i = 0; i < this.gameWord.length; i++){

        // determines if blank space is needed
        var letterWasFound = false;

        for(var j = 0; j < this.goodLetters.length; j++){
          // if yes then show letter
          if(this.gameWord[i] == this.goodLetters[j]){
            shown += this.goodLetters[j];
            letterWasFound = true;
          }
        }
        // if not found
        if(!letterWasFound){
          shown += ' _ ';
        }
      }
    }

    // get rid of first and last spaces then console log
    this.displayText = shown.trim();
    console.log(this.displayText);

    // If winner then show word without any blank spaces)
    if(this.displayText == this.gameWord){
      this.winner = true;
    }

  }
};

// export to use in word.js
module.exports = lettersToDisplay;