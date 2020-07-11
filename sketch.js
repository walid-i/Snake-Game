var snakeHead, snakeParts = [];
var randX, randY;
var gameover = false;

function setup() { 
  var gameWindowX = windowWidth / 3, gameWindowY = windowHeight * 2 / 3;
  snakeHead = new Snake(30, 30, 0, 0);
  //createCanvas(1000, 800);
  createCanvas(gameWindowX, gameWindowY);
  frameRate(20);
} 

function draw() { 
  background(100);
  rect(randX, randY, 10, 10);
  createFood();
  detectCollision();
  for(let i = snakeParts.length; i >= 1; i--){
    follow(i);
  }
  snakeHead.update();
  snakeHead.show();
}

class Snake{

  
  constructor(x, y, xSpeed = 0, ySpeed = 0){
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
  }

  update(){
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  show(){
    fill(255);
    // if gameover, don't show rectangles
    if(!gameover){
      rect(this.x, this.y, 10, 10);
    }
    else if(gameover){
      rect(this.x, this.y, 0, 0);
    }
  }


}

function keyPressed(){ //TODO: add WASD
  if(keyCode === LEFT_ARROW && snakeHead.xSpeed != 10){
    snakeHead.xSpeed = -10;
    snakeHead.ySpeed = 0;
  }
  if(keyCode === RIGHT_ARROW && snakeHead.xSpeed != -10){
    snakeHead.xSpeed = 10;
    snakeHead.ySpeed = 0;
  }
  if(keyCode === UP_ARROW && snakeHead.ySpeed != 10){
    snakeHead.ySpeed = -10;
    snakeHead.xSpeed = 0;
  }
  if(keyCode === DOWN_ARROW && snakeHead.ySpeed != -10){
    snakeHead.ySpeed = 10;
    snakeHead.xSpeed = 0;
  }
  
}

  function createFood(){ //TODO: make food not appear on existing body
    if(randX == null){
      randX = random(10, windowWidth / 3), randY = random(10, windowHeight * 2 / 3);
    }
    else if(dist(snakeHead.x, snakeHead.y, randX, randY) < 10){
      randX = random(10, windowWidth / 3);
      randY = random(10, windowHeight * 2 / 3);
      grow();
   }
 }

 function grow(){

  if(snakeParts.length == 0){ // Create new body part 10 px away from head if body doesn't exist
    let preX = snakeHead.x;
    let preY = snakeHead.y;
    if(snakeHead.xSpeed == -10){
      snakeParts[snakeParts.length] = new Snake(preX + 10, preY);
    }
    else if(snakeHead.xSpeed == 10){
      snakeParts[snakeParts.length] = new Snake(preX - 10, preY);
    }
    else if(snakeHead.ySpeed == -10){
      snakeParts[snakeParts.length] = new Snake(preX, preY + 10);
    }
    else if(snakeHead.ySpeed == 10){
      snakeParts[snakeParts.length] = new Snake(preX, preY - 10);
    }
  }

  else{ // Create new body part 10px away from newest body part
    let preX = snakeParts[snakeParts.length - 1].x;
    let preY = snakeParts[snakeParts.length - 1].y;
    if(snakeHead.xSpeed == -10){
      snakeParts[snakeParts.length] = new Snake(preX + 10, preY, -10, 0);
    }
    else if(snakeHead.xSpeed == 10){
      snakeParts[snakeParts.length] = new Snake(preX - 10, preY, 10, 0);
    }
    else if(snakeHead.ySpeed == -10){
      snakeParts[snakeParts.length] = new Snake(preX, preY + 10, 0, -10);
    }
    else if(snakeHead.ySpeed == 10){
      snakeParts[snakeParts.length] = new Snake(preX, preY - 10, 0, 10);
    }
  }
 }

 function follow(length){
  if(length == 1){
    snakeParts[length-1].x = snakeHead.x;
    snakeParts[length-1].y = snakeHead.y;
    snakeParts[length-1].show();
  }
  else if(length > 1){
    snakeParts[length-1].x = snakeParts[length - 2].x
    snakeParts[length-1].y = snakeParts[length - 2].y
    snakeParts[length-1].show();
  }
}

function detectCollision(){
  for(let i = 0; i < snakeParts.length; i++){
    if(dist(snakeParts[i].x, snakeParts[i].y, snakeHead.x, snakeHead.y) < 10){
      gameover = true;
      //console.log("part " + i + " collide with head. Their distance is " + dist(snakeParts[i].x, snakeParts[i].x, snakeHead.x, snakeHead.y));
    }
  }
  if(snakeHead.x < 0 || snakeHead.x > windowWidth / 3 || snakeHead.y < 0 || snakeHead.y > windowWidth * 2 / 3){
    gameover = true;
  }
}
 