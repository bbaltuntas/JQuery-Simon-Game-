function nextSequence() {
    userClickedPattern = []
    level++;
    $("#level-title").text("Level " + level)

    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColor = buttonColors[randomNumber]

    gamePattern.push(randomChosenColor)


    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColor)


}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play()
}

function animateButton(currentColor) {
    $("." + currentColor).addClass("pressed")
    setTimeout(function () {
        removeAnimation(currentColor)
    }, 100)

}

function removeAnimation(currentColor) {
    $("." + currentColor).removeClass("pressed")
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence()
            }, 1000)
        }
    } else {
        var audio = new Audio("sounds/wrong.mp3")
        audio.play()
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200)
        $("#level-title").text("Game Over,Press any Key to Start")
        startOver()
    }


}

function startOver() {
    gameStarted = false;
    gamePattern = [];
    level = 0
}

var gamePattern = []
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"]
var gameStarted = false;
var level = 0

$(".btn").on("click", function (event) {
        userClickedPattern.push(this.id)
        playSound(this.id)
        animateButton(this.id)

        checkAnswer(userClickedPattern.length - 1)


    }
)
$(document).on("keydown", function () {
    if (gameStarted === false) {
        nextSequence()
        $("#level-title").text("Level " + level)
        gameStarted = true
    }
})
