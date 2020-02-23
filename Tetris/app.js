const canvas = document.createElement("CANVAS");
const c = canvas.getContext("2d");
const scoreEl = document.querySelector("#div");
document.querySelector("body").appendChild(canvas);
canvas.width = 250;
canvas.height = canvas.width*2.4;

let startGame = false


//prøver å disable scrolling på tlf
// window.blockMenuHeaderScroll = true
// const bodyEl = document.querySelector("body")
// let music = new Audio()
// music.src = "Sprut.mp3"
// music.volume = 0.5

// music.addEventListener("end", ()=>{
//   music.pause()
//   music.currentTime = 0
//   music.play()
// })
// function startMusic(){
//   if(music.currentTime == 0) music.play()
// }
// window.addEventListener("click", startMusic)

let skalering
if(/Mobi|Android/i.test(navigator.userAgent)){
  // c.scale(50, 50)
  canvas.width*=2
  canvas.height*=2
  skalering = 50
}
else{
  // c.scale(25, 25)
  skalering = 25
}

const cols = 10;
const rows = 24;

let player;
let tid = 990;
let dropping = false;
let testbool = true;

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
  if(doesCollide(o, arena, player.y)){
    rotate(o)

  }
}


function drawMatrix(matrix, offsetX, offsetY, colorOption){
  c.beginPath();
  c.fillStyle = matrix.color
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if(value!=0){
        c.beginPath()
        if(colorOption == "preview") c.globalAlpha = 0.4
        else c.globalAlpha = 1
        c.fillStyle = colorArr[value-1]
        c.strokeStyle = "white"
        c.rect((x+offsetX)*skalering, (y+offsetY)*skalering, skalering, skalering)
        c.fill()
        if(c.globalAlpha == 1) {
          c.globalAlpha = 0.7
          c.stroke()
        }
        c.closePath()
      }
    })
  })
}

function updateScore(){
  if(score > highscore){highscore = score}
    scoreEl.innerHTML = `Score: ${score}<br><br>Highscore: ${highscore}`
}
updateScore()

function background(){
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.strokeStyle = "white";
  c.lineWidth = skalering/25
  for(var i = 0; i <= cols; i++){
    c.moveTo(i*skalering, 0);
    c.lineTo(i*skalering, canvas.height)
  }
  for(var j = 0; j <= rows; j++){
    c.moveTo(0, j*skalering);
    c.lineTo(canvas.width, j*skalering)
  }
  c.stroke();
}

createMatrix(randomMatrix());
let testy = player.y


function draw(){
  background();
  drawMatrix(arena, 0, 0)
  drawMatrix(player.matrix, player.x, player.y, "standard")
  // console.log(, player.x, testy)
  drawMatrix(player.matrix, player.x, testy, "preview")
}

function drop(){
  player.y++;
  dCount = 0
  if(doesCollide(player.matrix, arena, player.y)){
    player.y--;
    merge(player, arena)

    resetPlayer()
  }
}

function testDrop(){
  testy++
  if(doesCollide(player.matrix, arena, testy)){
    testy--
    testbool = false
  }
}

let elapsedTime = 0
let lastTime = 0;
let dCount = 0;
function animate(time = 0){
  elapsedTime = time
  const deltaTime = time-lastTime;
  lastTime = time;
  dCount += deltaTime;
  if(dCount > tid){
    drop();
  }
  draw()
  preview()

  requestAnimationFrame(animate)
}



function move(dir){
    player.x += dir;
    if(doesCollide(player.matrix, arena, player.y)){
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

let touchStartTime = undefined
let touchStartX = undefined
let touchStartY = undefined
// let swipeX = 0
let swipeY = true
let isMoving = false
window.addEventListener("touchstart", (e)=>{
  e.preventDefault()
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
  touchStartY2 = e.touches[0].clientY
  touchStartTime = elapsedTime
  // swipeX = -1
  swipeY = true
  isMoving = false
})
window.addEventListener("touchend", (e)=>{
  e.preventDefault()
  if(!isMoving){
    rotate(player.matrix)
    startMusic()
  }
})
window.addEventListener("touchmove", (e)=>{
  isMoving = true
  // swipeX++
  let deltaX = touchStartX-e.touches[0].clientX
  let deltaY = e.touches[0].clientY-touchStartY
  let deltaY2 = e.touches[0].clientY-touchStartY2
  if(deltaY2 > 30){
    drop()
    touchStartY2 = e.touches[0].clientY
  }
  // if(deltaY > 200 && swipeY){
  //   hardDrop()
  //   swipeY = false
  // }
  if(Math.abs(deltaX) > 40){
    touchStartX = e.touches[0].clientX

     if(deltaX > 0) move(-1)

     else move(1)
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



function doesCollide(matrix, arena, y){
  const [m, oX, oY] = [matrix, player.x, y]

  for(let y = 0; y<m.length; y++){
    for(let x=0; x<m[y].length; x++){
      if(m[y][x] !== 0 && (arena[y+oY] && arena[y+oY][x+oX]) !== 0){
        return true;
      }
    }
  }
  return false
}



function resetPlayer(){
  sweep(arena);
  createMatrix(randomMatrix());
  dropping = false;
  testbool = true;
  if(doesCollide(player.matrix, arena, player.y)){
    // Legger inn player-score i databasen
    new_rating(name, score)
    resetGame();
  }
  testy = player.y
}

function resetGame(){
  createArena();
  resetPlayer();
  score= 0;
  tid = 990;
  updateScore();
  // Hver gang den resettes legges scores i scoreboarden
  setTimeout(populate_scoreboard, 400)
}

function preview(){
  testy = player.y
  testbool = true
  let temp = JSON.parse(JSON.stringify(arena))
  while(testbool){
    testDrop()
  }
}

function hardDrop(){
  dropping = true;
  while (dropping){
    drop();
  }
}



// Henrik, snakker med API-en jeg har laga: https://nettside-api-v2.herokuapp.com/
const sb = document.getElementById('scoreBoard')
const form = document.getElementById('login-form')
const login_text = document.getElementById('login-text')
const errors = document.querySelector(".errors")

const URL = "https://nettside-api-v2.herokuapp.com"

// Tre endpoints: 
// Bruker js fetch for å snakke med API-et

// "/ratings" har method GET, og gir ut alle users med sine ratings

function populate_scoreboard() {
    fetch(URL + '/highscore')
    .then(res => res.json())
    .then(data => {
    
    
    sb.innerHTML = ""
    for (let i = 0; i < data.length; i++) {
      sb.innerHTML += `
      <tr>
        <td><b>${i+1} ${data[i].name}</b></td><td>${data[i].score}</td>
      </tr>`
    }
    })}

  


// "/new_user" har method POST, og brukes for å legge til ny bruker
function new_user(currNavn) {
  fetch(URL + "/new_user", {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: currNavn})
  }).then(res=>res.text())
    .then(res => console.log(res));
}

// "/new_rating" har method POST, og brukes for å legge til ny rating. Trenger id-en til brukeren for å legge til score til brukeren, så må querye to ganger
function new_rating(curr_name, curr_score) {
  fetch(URL + "/new_rating", {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: curr_name, score: curr_score})
  }).then(res=>res.text())
    .then(res => console.log(res));
}


let name = ""


form.addEventListener('submit', e=>{
  e.preventDefault()
  name = login_text.value

  if (name.length>20){
      errors.style = "display: block"
      errors.innerHTML = "<li>Ingen har så langt navn</li>"
      login_text.value = ""
      return false
  }
  
  fetch(URL + '/ratings')
    .then(res => res.json())
    .then(data => {
      let name_available = true
      scores = data.data
      scores.map(item=>{
        if(item.name == name){
          name_available = false
        }
      })
  
    if(name_available){
      new_user(name)
    }
      document.body.removeChild(document.querySelector('#login'))
      scoreEl.style = "display: block;"
      document.getElementById('scoreBoardDiv').style = "display: block;"
        // Hver gang den resettes legges scores i scoreboarden
      populate_scoreboard()
      animate()

    // else {
    //   login_text.value = ""
      
    //   errors.style = "display: block"
    //   errors.innerHTML = "<li>Navnet er allerede brukt</li>"
    // }

})})
