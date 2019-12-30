function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }




var pokemonArray = ["Bulbasaur", "Squirtle", "Charmander"]
var answer = pokemonArray[getRandomInt(pokemonArray.length)]
var guess;
var turns=20


for(i=0;i<turns;i++){
    guess=prompt("What is your guess");
    if (answer[0] == guess){
        alert("You guessed correctly");
        turns--;
        
    } else{
        alert("Sorry try again");
        turns--;
    }
}