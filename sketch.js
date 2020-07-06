var snakeHead, snakeParts = [];
var randX, randY;
var flag = false;

function setup() { 
  snakeHead = new Snake(30, 30, 0, 0);
  createCanvas(1000, 800);
  frameRate(10);
} 

function draw() { 
  background(100);
  rect(randX, randY, 10, 10);
  createFood();

  console.log(snakeParts.length + " snake length");
  for(let i = snakeParts.length; i >= 1; i--){
    follow(i);
  }
  snakeHead.update();
  snakeHead.show();
 
  
  rectMode(CENTER);
  rect(100, 100, 30, 30)
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
    rect(this.x, this.y, 10, 10);
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
    randX = random(10,990), randY = random(10, 790);
   }
   else if(dist(snakeHead.x, snakeHead.y, randX, randY) < 20){
     randX = random(10, 990);
     randY = random(10, 790);
     console.log("grow about to be called");
     grow();
     flag = true;
   }
 }

 function grow(){

  if(snakeParts.length == 0){ // Create new body part 10 px away from head if body doesn't exist
    let preX = snakeHead.x;
    let preY = snakeHead.y;
  console.log("Before else before growth " + snakeParts.length);
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
    console.log("Before else after growth " + snakeParts.length);
  }

  else{ // Create new body part 10px away from newest body part
    let preX = snakeParts[snakeParts.length - 1].x;
    let preY = snakeParts[snakeParts.length - 1].y;
    console.log("After else before growth " + snakeParts.length);
    console.log("my xspeed is " + snakeParts[snakeParts.length-1].xSpeed);
    console.log("my yspeed is " + snakeParts[snakeParts.length-1].ySpeed);
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
    console.log("after else after growth " + snakeParts.length);
  }
 }

 function follow(index){
   console.log(index + " index in follow before if");
  if(index == 1){
    snakeParts[index-1].x = snakeHead.x;
    snakeParts[index-1].y = snakeHead.y;
    snakeParts[index-1].show();
    console.log("Here in follow 1");
  }
  else if(index > 1){
    console.log(index + " index in follow after else");
    snakeParts[index-1].x = snakeParts[index - 2].x
    snakeParts[index-1].y = snakeParts[index - 2].y
    snakeParts[index-1].show();
    console.log("Here in follow 2");
  }
}
 