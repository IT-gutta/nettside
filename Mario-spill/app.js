var canvas = document.getElementById("canvas");
var c= canvas.getContext("2d");
canvas.width= window.innerWidth-20;
canvas.height= window.innerHeight-20;

// controller-objekt som brukes hele tiden
var controller={
  right: false,
  left: false,
  up: false,
  jumping: false,
}

// sjekker når man trykker på en knapp og når man slipper den. aka når man holder den inne.
function control(event){

  //hvis premisset==true, så er keyS true, ellers false
  var keyS = (event.type=="keydown")?true:false;
  //så lenge man holder en knapp inne, er også booleanen til (controller.prototype.button) true.

  switch (event.keyCode) {
    case 39: controller.right= keyS; break;
    case 68: controller.right= keyS; break;
    case 37: controller.left= keyS; break;
    case 65: controller.left= keyS; break;
    case 38: controller.up= keyS; break;
    case 87: controller.up= keyS; break;
  }
  }

  window.addEventListener("keydown", control)
  window.addEventListener("keyup", control)


//funksjon for å create et rektangel
// hvis man skriver new Rect(parametere), får man et objekt med keys og methods som er lagt inn i funksjonen

  function Rect(x, y, width, height){
    this.x = x,
    this.y = y,
    this.width = width,
    this.height = height,
    //fart i x-retning
    this.dx = 0,
    //fart i y-retning
    this.dy = 0,
    this.gravity=0,

    this.draw = function(){
      c.beginPath();
      c.fillStyle= "red";
      c.fillRect(this.x, this.y, this.width, this.height);
      c.fill();
    },

    this.update= function(){
      //alt som skal skje i animate()-funksjonen
      if(controller.right){
        this.dx=6}
      if(controller.left){
        this.dx=-6}
        else if(!controller.left&&!controller.right){
          this.dx=0}

      // kan bare hoppe hvis controlle.jumping er false, altså at man står på bakken
      if(controller.up && !controller.jumping){
        this.dy=-20; this.gravity= 0.5; controller.jumping= true;

      }
      //med en gang klossen beveger seg under starthøyden, flyttes den til den opprinnelige y-posisjonen
      // og controller.jumping gjøres til false slik at man kan hoppe på nytt etter dette
      if(this.y>canvas.height-100){
        this.y=canvas.height-100; this.dy=0; this.gravity= 0; controller.jumping= false;
      }

      this.x+=this.dx;
      this.y+=this.dy;
      this.dy+=this.gravity;
      for(var i=0; i<hinderArray.length; i++){

          if(doesHit(this, hinderArray[i])){

            if(position(this, hinderArray[i])=="over"){
              this.dy=0; this.gravity=0; controller.jumping= false;
              this.y= hinderArray[i].y-this.height;
            }
            else if(position(this, hinderArray[i])=="under"){
              this.dy=0; this.y= hinderArray[i].y+hinderArray[i].height
            }
            else if(position(this, hinderArray[i])=="høyre"){
            console.log("høyre side"); this.dx=0; this.x=hinderArray[i].x+hinderArray[i].width
            }
            else if(position(this, hinderArray[i])=="venstre"){
            console.log("venstre"); this.dx=0; this.x=hinderArray[i].x-this.width
            }
          }
          // if(this.x+this.width<hinderArray[i].x || this.x>hinderArray[i].x+hinderArray[i].width){
          //   this.gravity=0.5;
          // }



      }


      //kjører draw()-funksjonen inni update, slik at klossen blir tegnet på nytt med oppdatert plassering
      // inni animate()-funksjonen.
      this.draw();
    }
  }

  var kloss = new Rect(200, canvas.height-100, 100, 100)

  function Staticrect(x, y, width, height, farge){
    this.x=x,
    this.y=y,
    this.width=width,
    this.height=height,
    this.f=farge,

    this.draw= function(){
      c.beginPath();
      c.fillStyle= this.f;
      c.fillRect(this.x, this.y, this.width, this.height);
      c.fill();
    }
  }


var hinder= new Staticrect(700, canvas.height-200, 200, 200, "green")
var hinder2= new Staticrect(900, 450, 100, 100, "blue")
var hinder3= new Staticrect(300, 200, 200, 200, "grey")
var hinder4= new Staticrect(1200, 650, 450, 50, "orange")
var hinder5= new Staticrect(1500, 200, 50, 50, "red")

var hinderArray=[hinder, hinder2, hinder3, hinder4, hinder5];

function doesHit(rect1, rect2){

  const distX= rect1.x-rect2.x;
  const distY= rect1.y-rect2.y;
  let doesHitX= false;
  let doesHitY= false;

  if(distX<0){
    let hitX= rect1.x+rect1.width;
    if(hitX>rect2.x){
      doesHitX=true;}}
  else if(distX>0){
    let hitX= rect1.x-rect2.width;
    if(hitX<rect2.x){
      doesHitX= true;}}
  if(distY<0){
    let hitY= rect1.y+rect1.height;
    if(hitY>rect2.y && hitY< rect2.y+rect2.height){
      doesHitY=true;}}
  else if(distY>0){
    let hitY= rect1.y-rect2.height;
    if(hitY<rect2.y){
      doesHitY= true;}}
      if(doesHitX&&doesHitY){return true;}

    return false;
}


function resolveCollision(rect1, rect2){

 if(position(rect1, rect2)=="venstre"){
   rect1.x= rect2.x-rect1.width;
   rect1.dx=0;
 }
 if(position(rect1, rect2)=="høyre"){
   rect1.x= rect2.x+rect2.width;
   rect1.dx=0;
 }
}


function position(rect, hinder){
  const margin = 5;

  if(rect.dx>0){return "venstre"};
  if(rect.dx<0){return "høyre"};
  if(rect.dy<0){return "under"};
  if(rect.dy>1){return "over"};
  // if(rect.x+rect.width<hinder.x+ margin){return "venstre"};
  // if(rect.x>hinder.x+hinder.width-margin){return "høyre"};
  // if(rect.y+rect.height<hinder.y+margin){return "over"};
  // if(rect.y>hinder.y+hinder.height-margin){return "under"};

  // if(rect.x+rect.width<hinder.x+ margin){return "venstre"};
  // if(rect.x>hinder.x+hinder.width-margin){return "høyre"};
  // if(rect.y+rect.height<hinder.y+margin){return "over"};
  // if(rect.y>hinder.y+hinder.height-2*margin){return "under"};

}









// Her begynner Henrik sin drittkode for plattformer
// function Plattform(x, y, width) {
// this.x=x,
// this.y=y,
// this.width=width,
// this.heigth=heigth,
//
// this.draw = function(){
//   c.fillStyle= "black";
//   c.fillRect(this.x, this.y, this.width, 50);
// }
// }


// var pF=[]
//
// for(var k=0; k<10; k++){
//   let x=Math.random()* canvas.width;
//   let y=Math.random()* canvas.height;
//   let width = (Math.random()*50)+150
//
//   for (var i = 0; i < pF.length; i++) {
//     let nyX= x
//     y=nyY
//     if (nyY-y < 20) {
//       y=Math.random()* canvas.height;
//     }
//     if (nyY-x < 20) {
//       x=Math.random()* canvas.height;
//     }
//   }
//
//
//   pF.push(new Plattform(x, y, width))
//   console.log(pF)
// }



function animate(){
  requestAnimationFrame(animate);
  //sørger for at når klossen beveger seg, fjernes der den stod fra før, og bare den nye posisjonen vises på canvas
  c.clearRect(0, 0, canvas.width, canvas.height)
  kloss.update();
  hinder.draw();
  hinder2.draw();
  hinder3.draw();
  hinder4.draw();
  hinder5.draw();
  // for(var i=0; i<pF.length; i++){
  //   pF[i].draw();
  // }

}
animate();
