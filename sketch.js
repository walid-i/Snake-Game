var x = 0, y = 0, xSpeed = 10, ySpeed = 0, partCount = 0;
var snakeParts = [];
var randX, randY;
var flag = false;

function setup() { 
  
  snakeParts[0] = new Snake(30, 30);
  createCanvas(1000, 800);
  frameRate(20);

  

} 

function draw() { 
  background(100);
  
  createFood();
  rect(randX, randY, 10, 10);

  for(let i = 0; i < snakeParts.length; i++){
    snakeParts[partCount].update();
    snakeParts[partCount].show();
  }

  
  rectMode(CENTER);
  rect(100, 100, 30, 30)
}

class Snake{

  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  update(){
    this.x += xSpeed;
    this.y += ySpeed;
  }

  show(){
    fill(255);
    rect(this.x, this.y, 10, 10);
  }


}

function keyPressed(){ //TODO: add WASD
  if(keyCode === LEFT_ARROW && xSpeed != 10){
    xSpeed = -10;
    ySpeed = 0;
  }
  if(keyCode === RIGHT_ARROW && xSpeed != -10){
    xSpeed = 10;
    ySpeed = 0;
  }
  if(keyCode === UP_ARROW && ySpeed != 10){
    ySpeed = -10;
    xSpeed = 0;
  }
  if(keyCode === DOWN_ARROW && ySpeed != -10){
    ySpeed = 10;
    xSpeed = 0;
  }
  
}

 function createFood(){ //TODO: make food not appear on existing body
   if(randX == null){
    randX = random(10,990), randY = random(10, 790);
   }
   else if(dist(snakeParts[0].x, snakeParts[0].y, randX, randY) < 20){
     randX = random(10, 990);
     randY = random(10, 790);
     grow();
   }
 }

 function grow(){
  // get coords of previous body part
  let preX = snakeParts[snakeParts.length - 1].x;
  let preY = snakeParts[snakeParts.length - 1].y;

  // create new body part 10 px away from previous
  if(xSpeed == -10){
    snakeParts[snakeParts.length] = new Snake(preX + 10, preY);
  }
  else if(xSpeed == 10){
    snakeParts[snakeParts.length] = new Snake(preX - 10, preY);
  }
  else if(ySpeed == -10){
    snakeParts[snakeParts.length] = new Snake(preX, preY + 10);
  }
  else if(ySpeed == 10){
    snakeParts[snakeParts.length] = new Snake(preX, preY - 10);
  }
 }