// Create variables for the game state
const gameModulo = 2
let turnCount = 0
let player1Score = 0
let player2Score = 0
let player1Turn = true
let player1Leads = true

// Create variables to store references to the necessary DOM nodes
const player1Dice = document.getElementById("player1Dice")
const player2Dice = document.getElementById("player2Dice")
const player1Scoreboard = document.getElementById("player1Scoreboard")
const player2Scoreboard = document.getElementById("player2Scoreboard")
const message = document.getElementById("message")
const rollBtn = document.getElementById("rollBtn")
const resetBtn = document.getElementById("resetBtn")
const luckyBtn = document.getElementById("luckyBtn")

function showResetButton() {
    rollBtn.style.display = "none"
    luckyBtn.style.display = "none"
    resetBtn.style.display = "block"
}

/* Hook up a click event listener to the Roll Dice Button. */
 rollBtn.addEventListener("click", function() {    
    const randomNumber = Math.floor(Math.random() * 6) + 1
    
    turnCount++
    console.log(turnCount)
    
    executeTurn(randomNumber, player1Turn)
})
 
resetBtn.addEventListener("click", reset)

luckyBtn.addEventListener("click", lucky)

function reset() {
    player1Score = 0
    player2Score = 0
    player1Turn = true
    turnCount = 0
    player1Scoreboard.textContent = 0
    player2Scoreboard.textContent = 0
    player1Dice.textContent = "-"
    player2Dice.textContent = "-"
    message.textContent = "Player 1 Turn"
    resetBtn.style.display = "none"
    rollBtn.style.display = "block"
    luckyBtn.style.display = "block"
    player2Dice.classList.remove("active")
    player1Dice.classList.add("active")
}

function lucky() {
    const randomSeed = Math.random()
    let randomNumber = Math.floor(Math.random() * 6) + 1
    
    turnCount++
    console.log(turnCount)
    
    if (randomSeed >= 0.75) {
        randomNumber *= 2
    } else {
        randomNumber = -randomNumber
    }
    
    executeTurn(randomNumber, player1Turn)
}

function executeTurn(randNum, turn) {
    if (turn) {
        player1Score += randNum
        player1Scoreboard.textContent = player1Score
        player1Dice.textContent = randNum
        player1Dice.classList.remove("active")
        player2Dice.classList.add("active")
        message.textContent = "Player 2 Turn"
    } else {
        player2Score += randNum
        player2Scoreboard.textContent = player2Score
        player2Dice.textContent = randNum
        player2Dice.classList.remove("active")
        player1Dice.classList.add("active")
        message.textContent = "Player 1 Turn"
    }
    
    if (player1Score > player2Score) {
        player1Leads = true
    } else {
        player1Leads = false
    }
    
    if (turnCount % 2 === 0) {
        if (player1Score >= 20) {
            message.textContent = "Player 1 Won 🥳"
            showResetButton()
        }  else if (player2Score >= 20) {
            message.textContent = "Player 2 Won 🎉"
            showResetButton()
        }
    }
    
    player1Turn = !player1Turn
}