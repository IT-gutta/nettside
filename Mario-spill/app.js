var canvas = document.getElementById("canvas");
var c= canvas.getContext("2d");
canvas.width= window.innerWidth-20;
canvas.height= window.innerHeight-20;


var controller={
  right:false,
  left:false,
  up:false,
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
