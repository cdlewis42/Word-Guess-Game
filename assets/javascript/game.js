var possibleWords = [
    "Bulbasaur",
    "Squirtle",
    "Charmander",
    "Pikachu",
    "Mankey",
    "Onix"
    
  ];
  
  var guessedLetters = [];
  var guessingWord = [];
  var usedGuessingwWords = [];
  var wordToMatch;
  var numGuess = 15;
  var wins = 0;
  var pause = false;
  var loseSound = new Audio("./assets/sounds/ahahah.mp3");
  var winSound = new Audio("./assets/sounds/clever.wav");
  var championSound = new Audio("./assets/sounds/crazysob.mp3");
  
  function initializeGame() {
  
    wordToMatch = possibleWords[Math.floor(Math.random() * possibleWords.length)].toUpperCase();
  
    for (var i=0; i < wordToMatch.length; i++){
      if (wordToMatch[i] === " ") {
        guessingWord.push(" ")
      } 
      else {
        guessingWord.push("_");
      }
    }
    updateDisplay();
  };
  
  function resetGame() {
    if (usedGuessingwWords.length === possibleWords.length) {
      usedGuessingwWords = []
      wins = 0
      setTimeout(resetGame, 6000); 
    }
    else {
      pause = false;
      document.getElementById('welcome').className = 'blink';
      
      wordToMatch = possibleWords[Math.floor(Math.random() * possibleWords.length)].toUpperCase();
      console.log(wordToMatch)
  
      guessedLetters = [];
      guessingWord = [];
  
      for (var i=0; i < wordToMatch.length; i++){
        if (wordToMatch[i] === " ") {
          guessingWord.push(" ")
        } 
        else {
          guessingWord.push("_");
        }
      }
      updateDisplay();
    }
  };
  
  function updateDisplay () {
    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentWord").innerText = guessingWord.join("");
    document.getElementById("remainingGuesses").innerText = numGuess;
    document.getElementById("guessedLetters").innerText =  guessedLetters.join(" ");
  };
  
  document.onkeydown = function(event) {
    if (isLetter(event.key) && pause === false) {
    checkForLetter(event.key.toUpperCase());
    }
    document.getElementById('welcome').className = 'noBlink';
  };
  

  var isLetter = function(ch){
    return typeof ch === "string" && ch.length === 1
    && (ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z");
  };
  
  function checkForLetter(letter) {
    var foundLetter = false;
  

    for (var i=0; i < wordToMatch.length; i++) {
      if (letter === wordToMatch[i]) {
        guessingWord[i] = letter
        foundLetter = true
        if (guessingWord.join("") === wordToMatch) {
          wins++
          usedGuessingwWords.push(wordToMatch)
          console.log(usedGuessingwWords);
          numGuess=15;
          pause = true;
          winSound.play();
          updateDisplay();
          setTimeout(resetGame, 4000);
        }
      }
    }
    if (foundLetter === false) {
      
      if (guessedLetters.includes(letter) === false) {
        
        guessedLetters.push(letter)
        
        numGuess--
      }
      if (numGuess === 0) {
        
        
        usedGuessingwWords.push(wordToMatch);
        numGuess=15;
        guessingWord = wordToMatch.split();
        pause = true;
        loseSound.play();
        setTimeout(resetGame, 4000);
      }
    }
    updateDisplay();
  };
  
  initializeGame();