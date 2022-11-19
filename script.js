var currentLevel = 0
var levelText = 'Level '
var buttonsPressed = []
var buttonColors = ['red', 'green', 'yellow', 'blue']
var hasGameStarted = true
var gameOver = false
var userClickCounter = 0
var initialTitle = $('#level-title').text()
var wrongInputAlarm = new Audio('sounds/alarm.mp3')

$('.action-btn').on('click', function (event) {
  if (!gameOver) {
    console.log("start codes are executed.");
    $('#level-title').text(levelText + currentLevel)
    if (hasGameStarted) {
      $('.action-btn').hide()
      pressButton()
    }
  } else {
    console.log('Game over.')
  }
})

function pressButton () {
  var randomNumber = Math.floor(Math.random() * 4)
  var prsdBtnClr = buttonColors[randomNumber]
  buttonsPressed.push(prsdBtnClr)
  makeSound(prsdBtnClr)
  animatePress(prsdBtnClr)
  hasGameStarted = false
}
$('.btn').on('click', function (event) {
  if (!gameOver) {
    console.log('click button got executed.');
    var userChosedColor = this.id
    makeSound(userChosedColor)
    animatePress(userChosedColor)
    compareSequence(userChosedColor)
  } else {
    console.log('Game over.')
  }
})

function makeSound (btnClr) {
  var audioPath = 'sounds/' + btnClr + '.mp3'
  var audio = new Audio(audioPath)
  audio.play()
}

function animatePress (btnClr) {
  $('.' + btnClr).addClass('pressed')
  setTimeout(function () {
    $('.' + btnClr).removeClass('pressed')
  }, 100)
}

function compareSequence (clickedColor) {
  if (clickedColor != buttonsPressed[userClickCounter]) {
    wrongSequence()
  } else if (userClickCounter == buttonsPressed.length - 1) {
    nextLevel()
  } else {
    userClickCounter++
  }
}

function nextLevel () {
  userClickCounter = 0
  currentLevel++
  hasGameStarted = true
  setTimeout(function () {
    pressButton()
    $('#level-title').text(levelText + currentLevel)
  }, 500)
}

function wrongSequence () {
  wrongInputAlarm.play()
  $('body').addClass('game-over')
  gameOver = true
  $('#level-title').html('Wrong Color <br><br>GAME OVER <br><br>refresh to play again.');
}

