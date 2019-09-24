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

  }


  window.addEventListener("keydown", control)
  window.addEventListener("keyup", control)
