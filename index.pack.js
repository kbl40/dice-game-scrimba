/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Create variables for the game state
var gameModulo = 2;
var turnCount = 0;
var player1Score = 0;
var player2Score = 0;
var player1Turn = true;
var player1Leads = true;

// Create variables to store references to the necessary DOM nodes
var player1Dice = document.getElementById("player1Dice");
var player2Dice = document.getElementById("player2Dice");
var player1Scoreboard = document.getElementById("player1Scoreboard");
var player2Scoreboard = document.getElementById("player2Scoreboard");
var message = document.getElementById("message");
var rollBtn = document.getElementById("rollBtn");
var resetBtn = document.getElementById("resetBtn");
var luckyBtn = document.getElementById("luckyBtn");

function showResetButton() {
    rollBtn.style.display = "none";
    luckyBtn.style.display = "none";
    resetBtn.style.display = "block";
}

/* Hook up a click event listener to the Roll Dice Button. */
rollBtn.addEventListener("click", function () {
    var randomNumber = Math.floor(Math.random() * 6) + 1;

    turnCount++;
    console.log(turnCount);

    executeTurn(randomNumber, player1Turn);
});

resetBtn.addEventListener("click", reset);

luckyBtn.addEventListener("click", lucky);

function reset() {
    player1Score = 0;
    player2Score = 0;
    player1Turn = true;
    turnCount = 0;
    player1Scoreboard.textContent = 0;
    player2Scoreboard.textContent = 0;
    player1Dice.textContent = "-";
    player2Dice.textContent = "-";
    message.textContent = "Player 1 Turn";
    resetBtn.style.display = "none";
    rollBtn.style.display = "block";
    luckyBtn.style.display = "block";
    player2Dice.classList.remove("active");
    player1Dice.classList.add("active");
}

function lucky() {
    var randomSeed = Math.random();
    var randomNumber = Math.floor(Math.random() * 6) + 1;

    turnCount++;
    console.log(turnCount);

    if (randomSeed >= 0.75) {
        randomNumber *= 2;
    } else {
        randomNumber = -randomNumber;
    }

    executeTurn(randomNumber, player1Turn);
}

function executeTurn(randNum, turn) {
    if (turn) {
        player1Score += randNum;
        player1Scoreboard.textContent = player1Score;
        player1Dice.textContent = randNum;
        player1Dice.classList.remove("active");
        player2Dice.classList.add("active");
        message.textContent = "Player 2 Turn";
    } else {
        player2Score += randNum;
        player2Scoreboard.textContent = player2Score;
        player2Dice.textContent = randNum;
        player2Dice.classList.remove("active");
        player1Dice.classList.add("active");
        message.textContent = "Player 1 Turn";
    }

    if (player1Score > player2Score) {
        player1Leads = true;
    } else {
        player1Leads = false;
    }

    if (turnCount % 2 === 0) {
        if (player1Score >= 20) {
            message.textContent = "Player 1 Won 🥳";
            showResetButton();
        } else if (player2Score >= 20) {
            message.textContent = "Player 2 Won 🎉";
            showResetButton();
        }
    }

    player1Turn = !player1Turn;
}

/***/ })
/******/ ]);