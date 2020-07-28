// Variables Declaration
var buttonColours = ["green", "red", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Detect Keydown Action
$(document).keydown(function(e) {
  if (!started) {
    // Start Game
    $("#level-title").text("Level" + level);
    nextSequence();
    started = true;
  }
});

// Detect Button Click Action
$(".btn").on("click", function() {

  var userChosenColour = $(this).attr('id');
  // Add to user clicked pattern
  userClickedPattern.push(userChosenColour);
  // Play sound & animation
  playSound(userChosenColour);
  animatePress(userChosenColour);
  // Check user cliked button with sequence
  checkAnswer(userClickedPattern.length - 1);
});

// Reset level, sequence
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// Check user clicked answer with sequence
function checkAnswer(currentLevel) {
  // Check latest clicked button with pattern
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    // If matches all sequence, then load next pattern
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    // Wrong click & reset game
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

// Add new pattern to sequence
function nextSequence() {
  // Reset user pattern & increase level
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  // Random a new pattern
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Show new pattern
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
}

// Play sound when clicked
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animate button when clicked
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
