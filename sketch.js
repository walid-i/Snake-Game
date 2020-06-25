var x = 0, y = 0;

function setup() { 
  createCanvas(1000, 800);

} 

function draw() { 
  background(0);
  Snake.update();
  Snake.show();
}

class Snake{

  constructor(){
    this.body = [];
    this.body[0] = createVector(0,0);


  }

  update(){

  }

  show(){

  }


}