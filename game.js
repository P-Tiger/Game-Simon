var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$('#startgame').click(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence(); // start game 
        started = true;
    }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text('Press "START GAME" to start again');
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4); // 1 - 4
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // fadeOunt Hide the matched elements by fading them to transparent.
    $("#" + randomChosenColour).fadeIn(100).fadeOut(500).fadeIn(200); // fadeIn Display the matched elements by fading them to opaque. 
    playSound(randomChosenColour);
}

function playSound(nameColor) {
    var audio = new Audio("sounds/" + nameColor + ".mp3");
    audio.play();
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}