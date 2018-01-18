let roundStarted = false;

let Ball = function() { // constructor for ball
  this.x = 400;
  this.y = 300;
  this.length = 15;
  this.speed = 5.0;
  this.xSpeed = 0;
  this.ySpeed = 0;

  rect(this.x, this.y, this.length, this.length);

  this.update = function() {
    if(roundStarted == false) {
      roundStarted = true;

      let randomAngle1 = random( -PI / 4.0, -3.0 * PI / 4.0);
      let randomAngle2 = random( PI / 4.0, 3.0 * PI / 4.0);
      let angles = [randomAngle1, randomAngle2];
      let randomAngle = random(angles);
      this.ySpeed = this.speed * cos(randomAngle);
      this.xSpeed = this.speed * sin(randomAngle);

      this.x = 400;
      this.y = 300;

      this.y += this.ySpeed;
      this.x += this.xSpeed;

    }

    else {
      this.x += this.xSpeed;
      this.y += this.ySpeed;

      // handling upper and lower edge collisions
      if(this.y >= height - this.length || this.y <= 0) {
        this.ySpeed = this.ySpeed * (-1);
      }

      if(this.x + this.xSpeed <= 0) { // this means that player 2 has scored a point
        roundStarted = false;
        this.xSpeed = this.xSpeed * (-1);
        player2Score = player2Score + 1;
        if(player2Score == maxScore) {
          gameOver = true;
        }
      }

      if(this.x + this.xSpeed >= width - this.length) { // this means that player 1 has scored a point
        roundStarted = false;
        this.xSpeed = this.xSpeed * (-1);
        player1Score = player1Score + 1;
        if(player1Score == maxScore) {
          gameOver = true;
        }
      }
    }

    // console.log(roundStarted);
    rect(this.x, this.y, this.length, this.length);
  }
}

let BarPlayer1 = function() { // constructor for bar1
  this.x = 20;
  this.y = 265;
  this.width = 15;
  this.length = 70;
  rect(this.x, this.y, this.width, this.length);

  this.moveUpFirst = function() {
    this.y -= 4;
    if(this.y < 0) {
      this.y = 0;
    }
  }

  this.moveDownFirst = function() {
    this.y += 4;
    if(this.y > height - this.length) {
      this.y = height - this.length;
    }
  }

  this.update = function() {
    if(roundStarted == false) {
      this.x = 20;
      this.y = 265;
    }

    rect(this.x, this.y, this.width, this.length);
  }
}

let BarPlayer2 = function() { // constructor for bar 2;
  this.x = 765;
  this.y = 265;
  this.width = 15;
  this.length = 70;
  rect(this.x, this.y, this.width, this.length);

  this.moveUpSecond = function() {
    this.y -= 4;
    if(this.y < 0) {
      this.y = 0;
    }
  }

  this.moveDownSecond = function() {
    this.y += 4;
    if(this.y > height - this.length) {
      this.y = height - this.length;
    }
  }

  this.update = function() {
    if(roundStarted == false) {
      this.x = 765;
      this.y = 265;
    }
    rect(this.x, this.y, this.width, this.length);
  }
}
