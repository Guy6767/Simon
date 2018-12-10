// initalizing the game pattern array
buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];

for (var i = 0; i <= 50; i++) {
  gamePattern.push(buttonColours[Math.floor(Math.random() * 4)]);
}

////////////////////////////////////////////////////////////////////////////////

// makes the gamePattern sound sequence
function gamePatternSequence(length) {

  var delay = 100;
  for (i = 0; i < length; ++i) {
    gamePatternSequenceTemp(i);
  }

  function gamePatternSequenceTemp(i) {
    setTimeout(function() {
      var color = gamePattern[i];
      makeSound(color);
      $("#" + color).fadeOut(100).fadeIn(100);
    }, delay);
    delay += 800;
  }
}


////////////////////////////////////////////////////////////////////////////////

// makes the user pattern array + creates sounds for user clicks

function userPatternSequence() {
  userPattern = [];
  $(".btn").click(function() {
    $(this).fadeOut(100).fadeIn(100);
    makeSound(this.id);
    userPattern.push(this.id);
  });
}

userPatternSequence();

////////////////////////////////////////////////////////////////////////////////

// start the game function
$(document).keydown(function() {
  gameCycle();
  $(document).unbind("keydown");
});



// the game cycle
$(".playAgainButton").hide();
var level = 0;

function gameCycle() {
  level += 1;
  $(".playAgainButton").hide();
  $("h1").text("Level " + level);
  gamePatternSequence(level);
  countClicks(level);
}

// a function to count the clicks on each level
var clicks;

function countClicks(level) {
  clicks = 0;
  $(".btn").on("click", function clicking() {
    clicks += 1;
    if (clicks == level) {
      $(".btn").off("click", clicking);
      setTimeout(checkingForMistakes, 800);
    }
  });
}

function checkingForMistakes() {
  var mistake = false;
  for (var i = 0; i < level; i++) {
    if (gamePattern[i] != userPattern[i]) {
      $("h1").text("You lost!");
      $("body").addClass("body-lost");
      $(".playAgainButton").show();
      userPattern.length = 0;
      mistake = true;
      break;
    }
  }

  if (mistake == false) {
    userPattern.length = 0;
    levelUp();
  }
}


// play again button
$(".playAgainButton").click(function() {
  $("h1").text("Level " + level);
  $("body").removeClass("body-lost");
  level = 0;
  gameCycle();
});


// levelUpning the game
function levelUp() {
  if (level == 99) {
    $("h1").text("You won!");
    $("body").removeClass("body-lost");
    $(".playAgainButton").show();
  } else {
    gameCycle();
  }
}



///////////////////////////////////////////////////////////////////////////////

// chooses what sound to make based on the button color
function makeSound(colorClass) {

  switch (colorClass) {

    case "yellow":
      var audioYellow = new Audio("sounds/yellow.mp3");
      audioYellow.play();
      break;

    case "blue":
      var audioBlue = new Audio("sounds/blue.mp3");
      audioBlue.play();
      break;

    case "red":
      var audioRed = new Audio("sounds/red.mp3");
      audioRed.play();
      break;

    case "green":
      var audioGreen = new Audio("sounds/green.mp3");
      audioGreen.play();
      break;

  }
}

/////////////////////////////////////////////////////////////

$(".btnTheme").click(function() {
  $("body").toggleClass(" dark-body ");
  $(".red").toggleClass(" red-dark ");
  $(".blue").toggleClass(" blue-dark ");
  $(".yellow").toggleClass(" yellow-dark ");
  $(".green").toggleClass(" green-dark ");
  $(".btn").toggleClass(" btn-dark ");
  $(".btnTheme").toggleClass(" btnTheme-dark ");

});
