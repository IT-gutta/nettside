var player;
var block;
var blockArray=[]
var tileArr=[]
var kart, cols, rows;
var tileSize= 32;
var farge;
var img;
function setup() {
  createCanvas(innerWidth-20, innerHeight-40);
  player = new Rect(20,  28*tileSize-50, 20, 50);
  frameRate(60)


img = loadImage("grassTop.png")

// console.log(image)





  newMap([
              [0, 0, 1, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 1, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 1, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 1, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 1, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 1, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 1, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 1, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 1, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 1, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 1, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 1, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 1, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 1, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 1, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 1, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 1, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 1, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
              [0, 0, 1, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 1, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 1, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 1, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 1, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 1, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 1, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 1, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 1, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 1, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    ]
)


}





function draw() {
  background(220);
  translate(-player.pos.x+700, -player.pos.y+500);




 for(var i = 0; i<tileArr.length; i++){
    tileArr[i].draw()
 if(isColliding(player, tileArr[i])){
      if(player.beforeBottom < player.sides.bottom && player.beforeBottom<tileArr[i].sides.top+0.5 && !keyIsDown(DOWN_ARROW) && tileArr[i].f == "yellow") {
      player.pos.y = tileArr[i].sides.top - player.h-0.1;
      player.vel.y=0; player.jumping = false;
      }
   }

  if(isColliding(player, tileArr[i]) && tileArr[i].f== "blue"
    && !keyIsDown(DOWN_ARROW)) {
  if(player.vel.y>-5){player.vel.y-=2} ;
  }



}
  fill("red")
  push()
  stroke("green")
   line(0, 28*tileSize, 2000, 28*tileSize);
  pop()
  player.update()
  image(img, 0, 0, 32, 32, 0, 0, 32, 32)

}






function Rect(x, y, w, h){
  this.pos = createVector(x, y),
  this.vel = createVector(),
  this.acc = createVector(0, 1),
  this.w = w,
  this.h = h,
  this.jumping = false,


  this.sides =  {
    top : this.pos.y,
    bottom : this.pos.y+this.h,
    left : this.pos.x,
    right : this.pos.x+this.w
 }



  this.draw = function(){
   rect(this.pos.x, this.pos.y, this.w, this.h)
  }



  this.update = function(){
    this.pos.x+=this.vel.x;
    this.pos.y+=this.vel.y;
    this.vel.x+=this.acc.x;
    this.vel.y+=this.acc.y;



  this.beforeTop = this.sides.top;
  this.beforeBottom = this.sides.bottom;
  this.beforeLeft = this.sides.left;
  this.beforeRight = this.sides.right;




    this.sides =  {
    top : this.pos.y,
    bottom : this.pos.y+this.h,
    left : this.pos.x,
    right : this.pos.x+this.w
 };










    if(keyIsDown(RIGHT_ARROW)){
      this.vel.x=5}
    else if(keyIsDown(LEFT_ARROW)){
      this.vel.x=-5}
   else{this.vel.x*=0.9}


    if(keyIsDown(32) && this.jumping==false){jump(this, 18)}

    if(keyIsDown(DOWN_ARROW) && this.jumping==false){this.h*=0.5}
    else{this.h=h}



    if(this.pos.y+this.h> 28*tileSize){this.vel.y=0;
      this.pos.y= 28*tileSize-this.h; this.jumping=false }




  this.draw();
 }
}



function Block(x, y, w, h, f){
  this.x = x,
  this.y = y,
  this.w = w,
  this.h = h,
  this.f = f,


  this.sides =  {
    top : this.y,
    bottom : this.y+this.h,
    left : this.x,
    right : this.x+this.w
 }

  this.draw = function(){
    fill(this.f)
    rect(this.x, this.y, this.w, this.h);
  }
}


function isColliding(rect1, rect2){
  if(rect1.sides.right<rect2.sides.left || rect1.sides.left>rect2.sides.right || rect1.sides.bottom<rect2.sides.top || rect1.sides.top>rect2.sides.bottom){return false}

  return true;
}




function bottom(rect){
  return createVector(rect.pos.x+(rect.w/2), rect.y+rect.h)}


function jump(person, amp){
person.vel.y=-amp; person.jumping=true
}



function Tiles(){
this.image = new Image(),
this.image.src = "grassTop.png",

this.draw = function(){
   image(this.image, 0, 0, 32, 32, 0, 0, 32, 32)

 }
}

function newMap(kart){
  tileArr=[];
  for(var i = 0; i<kart.length; i++){
    console.log(i)
    for(var j = 0; j<kart[0].length; j++){

     if(kart[i][j] === 0){farge = "grey"}
      else if(kart[i][j] === 1){farge = "blue"}
      else if(kart[i][j] === 2){farge = "yellow"}

    tileArr.push(new Block(j*tileSize, i*tileSize, tileSize, tileSize, farge))


      }
    }
  return tileArr}