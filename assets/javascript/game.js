// create an array of words
var animals = ["cat", "dog", "pig", "horse", "lion", "duck"];
var animalPictures = ["assets/images/cat.png","assets/images/dog.jpg","assets/images/pig.gif","assets/images/horse.jpg","assets/images/lion.jpeg","assets/images/duck.jpg"];
var animalAudio = ["assets/audio/cat.wav","assets/audio/dog.wav","assets/audio/pig.wav","assets/audio/horse.wav","assets/audio/lion.wav","assets/audio/duck.wav"];

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
    createUnderscores (chosenWordLength);
    document.getElementById("theWord").textContent = underScores.join(" ");
    //update guesses to new starting value
    document.getElementById("guessesRemain").textContent = guesses;

    document.getElementById("guessed").textContent = "";
    
}

function showPicture () {

    chosenWordIndex = animals.indexOf(chosenWord);
    pictureURL = animalPictures[chosenWordIndex];            
    //change the html to show the image
    var img = new Image();
    var div = document.getElementById('picture');
    
    img.onload = function() {
        div.appendChild(img);
    };
    
    img.src = pictureURL;
}

function playSound () {

    chosenWordIndex = animals.indexOf(chosenWord);
    audioURL = animalAudio[chosenWordIndex];            
    var audio = new Audio(audioURL);
    audio.play();

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
            //show picture
            showPicture();
            //play sound
            playSound ();
        }
            
    }
   // if they key is wrong, add the letter to the wrong guesses and reduce the number of guesses remaining
    else {
        // if they already typed a key that they've typed before, it shouldn't reduce their guesses
       if (wrongLetters.indexOf(userKey) === -1) {
            //reduce guesses by 1
            guesses--;
            //update the HTML with the guesses
            document.getElementById("guessesRemain").textContent = guesses;
            wrongLetters.push(userKey);
            document.getElementById("guessed").textContent = wrongLetters.join(",");
        };
       
    // if they have no more guesses, it will show an alert with the correct word and a message to try again. After they dismiss it, it resets for a new word
        if (guesses === 0){
            alert("The word was: " + chosenWord + ". Try Again!");
            newWord ();
        };
    }
};


function createUnderscores (length) {
//create the underscores based on the length of the chosen word
    for (var i=0; i < length; i++) {
        underScores.push("_");
    }
}

function resetGameStats() {
// if the users clicks the Next Word it resets the fields and chooses a new word

    document.getElementById("picture").innerHTML = "";
    guesses=10;
    underScores=[];
    wrongLetters=[];
    rightLetters=[];
}

newWord ();