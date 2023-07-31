import { arr as aArr } from "../animalsList.js";
import { arr as cArr } from "../countryList.js";

let inputLetter = "";
let imageNum = 0;
let dashesArray = [];
let wordsArr = [];
let word = "";

const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

if (category === "animals") {
  document.querySelector(".categoryname").innerHTML = "CATEGORY : ANIMALS";
  wordsArr = aArr.map((val) => val.toLowerCase());
} else {
  document.querySelector(".categoryname").innerHTML = "CATEGORY : COUNTRIES";
  wordsArr = cArr.map((val) => val.toLowerCase());
}

function resetGame() {
  imageNum = 0;
  word = chooseWord();
  document.querySelector(".game-body").style.display = "flex";
  document.querySelector(".gameOver").style.display = "none";
  displayImage(0);
  convertToDashes(word);
  displayKeyboard();
}

function chooseWord() {
  var word = wordsArr[Math.floor(Math.random() * wordsArr.length)];
  return word;
}

function displayKeyboard() {
  document.querySelector(".keyboard").innerHTML = "";
  for (let i = 65; i < 91; i++) {
    let alphabet = document.createElement("button");
    alphabet.innerText = String.fromCharCode(i);
    alphabet.onclick = function () {
      alphabet.disabled = true;
      alphabet.style.backgroundColor = "lightgrey";
      inputLetter = alphabet.innerText;
      playGame(inputLetter);
    };
    document.querySelector(".keyboard").appendChild(alphabet);
  }
}

function convertToDashes(word) {
  console.log("Word:", word);
  dashesArray = [];
  for (let i = 0; i < word.length; i++) {
    dashesArray.push("_");
  }
  document.querySelector(".word-dashes").innerHTML = "";
  document.querySelector(".word-dashes").append(dashesArray.join(" "));
}

function displayImage(imageNum) {
  var pic = document.querySelector(".hangman img");
  if (!pic) {
    pic = document.createElement("img");
    document.querySelector(".hangman").append(pic);
  }
  pic.src = "hangmanImgs/" + imageNum + ".png";
}

function replaceLetters(inputLetter, word) {
  for (let i = 0; i < word.length; i++) {
    if (word[i] === inputLetter) {
      dashesArray[i] = inputLetter.toUpperCase();
    }
  }
  document.querySelector(".word-dashes").innerText = "";
  document.querySelector(".word-dashes").append(dashesArray.join(" "));
  if (!dashesArray.join("").includes("_")) {
    return true;
  }

  return false;
}

function endGame() {
  document.querySelector(".game-body").style.display = "none";
  document.querySelector(".gameOver").style.display = "flex";
  document.querySelector(".gameOver").innerText =
    "Game Over! The word was '" + word.toUpperCase() + "'";
}

function wonGame() {
  document.querySelector(".game-body").style.display = "none";
  document.querySelector(".gameOver").style.display = "flex";
  document.querySelector(".gameOver").innerText = "You Won!";
}

// ------------------------- MAIN ---------------------------------------------------------------------------------

function playGame(inputLetter) {
  if (imageNum >= 0) {
    inputLetter = inputLetter.toLowerCase();
    if (word.includes(inputLetter)) {
      var fullyGuessed = replaceLetters(inputLetter, word);
      if (fullyGuessed) {
        wonGame();
      }
    } else {
      imageNum += 1;
      if (imageNum == 6) {
        endGame();
      }
      displayImage(imageNum);
    }
  } else {
    endGame();
  }
}

resetGame();
