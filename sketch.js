let cnv = null; // canvas variable
let ball = null; // ball variable
let barPlayer1 = null; // bar for first player
let barPlayer2 = null; // bar for second player
let gameOver = false; // condition of the game, we take the game score to 10, and then terminate -> gameOver = true

let AIBarMoveDirection = null;
let isPlayingAgainsAI = false;
let isInPause = false;
let wasJustPaused = false;

let player1Score = 0;
let player2Score = 0;
let maxScore = 10; // max score is set to zero

let barHitSound = null;
let wallHitSound = null;
let scoreSound = null;

let shouldUpdate = true;

function checkForBallCollisions(barPlayer1, barPlayer2, ball) { // check for collisions with bar
  if(barPlayer1.x + barPlayer1.width >=  ball.x + ball.xSpeed && barPlayer1.y <= ball.y + ball.length && barPlayer1.y + barPlayer1.length >= ball.y) { // check for collision with the first bar
    ball.xSpeed = ball.xSpeed * (-1);
  }
  if(barPlayer2.x <= ball.x + ball.length + ball.xSpeed && barPlayer2.y <= ball.y + ball.length && barPlayer2.y + barPlayer2.length >= ball.y) {
    ball.xSpeed = ball.xSpeed * (-1);
  }
}

// center canvas when the window is resized
function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

// setup called only once
function setup() {
  cnv = createCanvas(800, 600);
  centerCanvas(); // centering the canvas
  background(0); // setting the background to black
  barPlayer1 = new BarPlayer1();
  barPlayer2 = new BarPlayer2();
  ball = new Ball();
  isPlayingAgainsAI = confirm('Would you like to play against AI?')
}


// draw the dashed middle partition
function drawMiddlePartition() {
  for(let i = 5; i <= height; i+=30) {
    rect(400, i, 5, 20);
    fill(255, 255, 255);
  }
}

function drawPauseIcon() {
  for(let i = 770; i < 790; i+=10) {
    rect(i, 10, 5, 20);
    fill(255, 255, 255);
  }
}

function update() {
  if(shouldUpdate == true) {
    if(gameOver == false) {
        background(0);
        drawMiddlePartition();
        barPlayer1.update();
        barPlayer2.update();
        ball.update();
        checkForBallCollisions(barPlayer1, barPlayer2, ball);
    }

    else {
      shouldUpdate = false;
      if(player1Score == maxScore ) {
        var person = prompt("Player 1 wins, enter name", "Enter name");
        alert(person + " wins!");
      }
      else {
        if (isPlayingAgainsAI) {
          alert("AI wins!");
        } else {
          var person = prompt("Player 2 wins, enter name", "Enter name");
          alert(person + " wins!");
        }
      }
    }
  }
}

// draw happens continuously
function draw() {
  drawMiddlePartition();
  if (!wasJustPaused) {
    if(keyIsDown(32)) {
      wasJustPaused = true;
      isInPause = !isInPause;
      this.setTimeout(() => wasJustPaused = false, 200);
    }
  }
  if (isInPause) return drawPauseIcon();

  if(keyIsDown(87)) {
    barPlayer1.moveUpFirst();
  }
  if(keyIsDown(83)) {
    barPlayer1.moveDownFirst();
  }

  if (isPlayingAgainsAI) {
    // let player use whichever controls he prefers if he plays agains AI
    if(keyIsDown(38)) barPlayer1.moveUpFirst();
    if(keyIsDown(40)) barPlayer1.moveDownFirst();

    if (ball.y < barPlayer2.y) {
      AIBarMoveDirection = 'up'
    } else if (ball.y > barPlayer2.y + 55) {
      AIBarMoveDirection = 'down'
    }

    if (AIBarMoveDirection === 'up' && ball.y < barPlayer2.y + 50) {
      barPlayer2.moveUpSecond();
    } else if (AIBarMoveDirection === 'down' && ball.y > barPlayer2.y - 5) {
      barPlayer2.moveDownSecond();
    } else {
      AIBarMoveDirection = null;
    }
  } else {
    // playing against Player 2
    if(keyIsDown(38)) {
      barPlayer2.moveUpSecond();
    }
    if(keyIsDown(40)) {
      barPlayer2.moveDownSecond();
    }
  }
  update(); // update the screen
  // writing the scores
  fill(255);
  textSize(50);
  text(player1Score.toString(), 100, 100);

  fill(255);
  textSize(50);
  text(player2Score.toString(), 675, 100);
}

// positions the canvas when resized
function windowResized() {
  centerCanvas();
}
