// create an array of words
var animals = ["cat", "dog", "pig", "horse", "lion", "duck"];
var animalPictures = ["images/cat.jpg","images/dog.jpg","images/pig.jpg","images/horse.jpg","images/lion.jpg","images/duck.jpg"];
var animalAudio = ["audio/cat.wav","audio/dog.wav","audio/pig.wav","audio/horse.wav","audio/lion.wav","audio/duck.wav"];

// create starting variables
var score = 0;
var wrongLetters = [];
var chosenWord;
var chosenWordLength;
var chosenWordIndex;
var underScores = [];
var guesses = 10;
var pictureUrl = "";
var player = new Audio();

function newWord () {
    //reset game stats
    resetGameStats ();
    // choose word randomly
    chosenWord = animals[Math.floor(Math.random() * animals.length)];
    console.log(chosenWord);
    chosenWordLength = chosenWord.length;
    // print underscores with the length of the chosen word
    createUnderscores ();
    document.getElementById("theWord").textContent = underScores.join(" ");
    //update guesses to new starting value
    document.getElementById("guessesRemain").textContent = guesses;
    
}

// listen for key strokes and check if wrong or right
document.onkeyup = function(event) {
    userKey = event.key;
    console.log(userKey);

    // if the key is right, update the underscores
    if (chosenWord.indexOf(userKey) > -1 ) {
        // if the key is found in the word, loop to find all the places in the array that needs replacing from _ to the user key
        for (var i = 0; i < chosenWord.length; i++ ) {
            if (chosenWord[i] === userKey) {
                underScores[i] = userKey;
            }
        }
        //update the HTML with the letters
        document.getElementById("theWord").textContent = underScores.join(" ");


        // if the user gets all the letters correct, show image and load sound
        //check if chosen word equals the underscores string
        if (chosenWord === underScores.join("")) {
            //update score
            score++;
            //update the HTML with the score
            document.getElementById("score").textContent = score;
            //find the right image
            chosenWordIndex = animals.indexOf(chosenWord);
            pictureURL = animalPictures(chosenWordIndex);
            //change the html to show the image
            document.getElementById("picture").innerHTML="";
            //find the right sound file
        // audioURL = animalAudio(chosenWordIndex);
            //change the html to load the right sound
        // player.src = audioURL;
            //player.play;

        }
            
    }
   // if they key is wrong, add the letter to the wrong guesses and reduce the number of guesses remaining
    else {
        //reduce guesses by 1
        guesses--;
        //update the HTML with the guesses
        document.getElementById("guessesRemain").textContent = guesses;
        wrongLetters.push(userKey);
        document.getElementById("guessed").textContent = wrongLetters.join(",");
    // if they already typed a key that they've typed before, it shouldn't reduce their guesses
    

    // if they have no more guesses, the word and the image should appear and an alert that says 'try again', after they dismiss it it resets for a new word
    if (guesses === 0){
        alert("Try Again!")
        newWord ()
        
    }
    }




}

    

// if the users clicks the Next Word it resets the fields and chooses a new word


function createUnderscores () {
    for (var i=0; i < chosenWordLength; i++) {
        underScores.push("_");
    }
}

function resetGameStats() {
    document.getElementById("picture").innerHTML = "";
    guesses=10;
    underScores=[];
    wrongLetters=[];
    rightLetters=[];
}

newWord ();