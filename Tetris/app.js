const canvas = document.createElement("CANVAS");
const c = canvas.getContext("2d");
const scoreEl = document.querySelector("div");
document.querySelector("body").appendChild(canvas);
canvas.width = 250;
canvas.height = canvas.width*2.4;

c.scale(25, 25);

const cols = 10;
const rows = 24;

let player;
let tid = 990;
let dropping = false;
let score = 0;
let highscore = 0;

let colorArr = ["red", "orange", "purple", "blue", "lightgreen", "yellow", "pink"]

let nameArr = ["T", "L", "J", "I", "Z", "S", "K"];
let randomMatrix = () => nameArr[Math.floor(Math.random()*nameArr.length)]

let arena;

function createArena(){
arena = []
for(var i = 0; i<rows; i++){arena.push(new Array(cols).fill(0))}
}
createArena()

function merge(player, arena){
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if(value!=0){
        arena[player.y + y][player.x + x] = value;
      }
    })
  })
}




function createMatrix(matrix){
player = {x:3, y:0}

switch(matrix){
    case "T": player.matrix = [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ]; break;
    case "L" : player.matrix = [
      [0, 0, 0],
      [2, 2, 2],
      [2, 0, 0],
    ]; break;
    case "J" : player.matrix = [
      [0, 0, 0],
      [3, 3, 3],
      [0, 0, 3],
    ]; break;
    case "Z" : player.matrix = [
      [0, 0, 0],
      [4, 4, 0],
      [0, 4, 4],
    ]; break;
    case "S" : player.matrix = [
      [0, 0, 0],
      [0, 5, 5],
      [5, 5, 0],
    ]; break;
    case "K": player.matrix = [
      [6, 6],
      [6, 6]
    ]; break;
    case "I" : player.matrix = [
      [0, 7, 0, 0],
      [0, 7, 0, 0],
      [0, 7, 0, 0],
      [0, 7, 0, 0]
    ]; break;
  }
}



function rotate(o){
  if(o.length == 3){
    [o[0][0], o[0][1], o[0][2], o[1][0], o[1][1], o[1][2], o[2][0], o[2][1], o[2][2]]
    = [o[0][2], o[1][2], o[2][2], o[0][1], o[1][1], o[2][1], o[0][0], o[1][0], o[2][0]]
  }
  else if(o.length == 4){
    [o[0][0], o[0][1], o[0][2], o[0][3], o[1][0], o[1][1], o[1][2], o[1][3], o[2][0], o[2][1], o[2][2], o[2][3], o[3][0], o[3][1], o[3][2], o[3][3]]
    = [o[0][3], o[1][3], o[2][3], o[3][3], o[0][2], o[1][2], o[2][2], o[3][2], o[0][1], o[1][1], o[2][1], o[3][1], o[0][0], o[1][0], o[2][0], o[3][0]]
  }
  if(doesCollide(o, arena)){
    rotate(o)

  }
}


function drawMatrix(matrix, offsetX, offsetY){
  c.beginPath();
  c.fillStyle = matrix.color
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if(value!=0){
        c.fillStyle = colorArr[value-1]
        c.fillRect(x+offsetX, y+offsetY, 1, 1)
      }
    })
  })
}

function updateScore(){
  if(score > highscore){highscore = score}
    scoreEl.innerHTML = "Score: " +score + "         Highscore: " + highscore
}
updateScore()

function background(){
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.strokeStyle = "white";
  c.lineWidth = 1/25
  for(var i = 0; i <= cols; i++){
    c.moveTo(i, 0);
    c.lineTo(i, canvas.height)
  }
  for(var j = 0; j <= rows; j++){
    c.moveTo(0, j);
    c.lineTo(canvas.width, j)
  }
  c.stroke();
}

createMatrix(randomMatrix());


function draw(){
  background();
  drawMatrix(arena, 0, 0)
  drawMatrix(player.matrix, player.x, player.y)
}

function drop(){
  player.y++;
  dCount = 0
  if(doesCollide(player.matrix, arena)){
    player.y--;
    merge(player, arena)
    resetPlayer()
  }
}


let lastTime = 0;
let dCount = 0;
function animate(time = 0){
  const deltaTime = time-lastTime;
  lastTime = time;
  dCount += deltaTime;
  if(dCount > tid){
    drop();
  }
  draw()

  requestAnimationFrame(animate)
}
animate()


function move(dir){
    player.x += dir;
    if(doesCollide(player.matrix, arena)){
      player.x += -dir;
    }
}


window.addEventListener("keydown", function(e){
  switch(e.keyCode){
    case 37: move(-1); break
    case 39: move(1); break
    case 40: drop(); break
    case 32: hardDrop(); break
    case 82: rotate(player.matrix); break
    case 38: rotate(player.matrix); break
  }
})

function sweep(arena){
  let sweepCount = 0;
  outer:
   for(let y = 0; y<arena.length; y++){
     for(let x = 0; x<arena[y].length; x++){
       if(arena[y][x] == 0){continue outer
       }
     }
     arena.splice(y, 1);
     arena.unshift(new Array(cols).fill(0))
     sweepCount++
   }
  switch(sweepCount){
    case 1: score+=100; tid -= 200/10; break;
    case 2: score+=300; tid -= 600/10; break;
    case 3: score+=600; tid -= 1200/10; break;
    case 4: score+=1000; tid -= 2000/10; break;
    default: break;
  }
  updateScore();
}



function doesCollide(matrix, arena){
  const [m, oX, oY] = [matrix, player.x, player.y]

  for(let y = 0; y<m.length; y++){
    for(let x=0; x<m[y].length; x++){
      if(m[y][x] !== 0 && (arena[y+oY] && arena[y+oY][x+oX]) !== 0){
        return true; console.log("hei")
      }
    }
  }
  return false
}



function resetPlayer(){
  sweep(arena);
  createMatrix(randomMatrix());
  dropping = false;
  if(doesCollide(player.matrix, arena)){
    resetGame();
  }
}

function resetGame(){
  createArena();
  resetPlayer();
  score= 0;
  tid = 990;
  updateScore();
}

function hardDrop(){
  dropping = true;
  while (dropping){
    drop();
  }
}

window.addEventListener("touchmove", function(e){
  scoreEl.innerHTML += e.changedTouches
})


