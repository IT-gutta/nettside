var canvas = document.getElementById("canvas");
var c= canvas.getContext("2d");
canvas.width= window.innerWidth-20;
canvas.height= window.innerHeight-20;


var controller={
  right: false,
  left: false,
  up: false,
  jumping: false,
}


function control(event){
  var keyS = (event.type=="keydown")?true:false;
  console.log(event.keyCode);
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

  function Rect(x, y, width, height){
    this.x = x,
    this.y = y,
    this.width = width,
    this.height = height,
    this.dx = 0,
    this.dy = 0,
    this.gravity=0.5,

    this.draw = function(){
      c.beginPath();
      c.fillStyle= "orange";
      c.fillRect(this.x, this.y, this.width, this.height);
      c.fill();
    },

    this.update= function(){
      if(controller.right){
        this.dx=6}
      if(controller.left){
        this.dx=-6}
        else if(!controller.left&&!controller.right){
          this.dx=0}

      if(controller.up && !controller.jumping){
        this.dy=-20; controller.jumping= true;

      }
      if(this.y>canvas.height-100){
        this.y=canvas.height-100; this.dy=0; controller.jumping= false;
      }

      this.x+=this.dx;
      this.y+=this.dy;
      this.dy+=this.gravity;
      this.draw();
    }
  }

  var kloss = new Rect(200, canvas.height-100, 100, 100)


function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height)
  kloss.update();

}
animate();
