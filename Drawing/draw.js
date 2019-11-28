canvas.height = 400
canvas.width = 400
posX = 0
posY = 0
size = 2
colorIndex = 1
color = "white"
map = []
drawing = false
console.log(canvas)
var colorEl = document.querySelector("select")
var sizeEl = document.querySelector("input")
var widEl = document.getElementById("wid")
var heiEl = document.getElementById("hei")
var clearEl = document.querySelector("button")
colorEl.addEventListener("change", newColor)
sizeEl.addEventListener("change", newSize)
canvas.addEventListener("mousedown", draw)
canvas.addEventListener("mouseup", notDraw)
canvas.addEventListener("mousemove", pos)
heiEl.addEventListener("change", scale)
widEl.addEventListener("change", scale)
clearEl.addEventListener("click", erase)
function erase(){
    c.clearRect(0,0,canvas.width,canvas.height)
}
function newColor(){
    colorIndex = colorEl.selectedIndex
    switch (colorIndex) {
        case 0:
            color = "white"
            break;
        case 1:
            color = "black"
            break;
        case 2:
            color = "blue"
            break;
        case 3:
            color = "red"
            break;
        case 4:
            color = "yellow"
            break;
        case 5:
            color = "green"
            break;
        case 6:
            color = "orange"
            break;
        case 7:
            color = "purple"
            break;
        case 8:
            color = "pink"
            break;
        case 9:
            color = "brown"
            break;
        case 10:
            color = "gray"
            break;
    }
    console.log(color);
}
function newSize(){
    size = Number(sizeEl.value)
    console.log(size)
}
function scale(){
    if(widEl.value>100){
        canvas.width = widEl.value
    }
    if(heiEl.value>100){
        canvas.height = heiEl.value
    }
    
}
function pos(e){
    posX = (e.clientX-(window.innerWidth-canvas.width)/2)
    posY = (e.clientY-(window.innerHeight-canvas.height)/2)
    // console.log(posX, posY)
}
function draw(){
    drawing = true
    anim()
}
function notDraw(){
    drawing = false
}
for(i=0; i<canvas.height; i++){
    map.push([])
    for (j = 0; j<canvas.width; j++){
        map[i].push(0)
    }
}
console.log(map)
// function loop(){
//     requestAnimationFrame(loop)
    
// }
// loop()

function anim(){
    console.log(drawing)
    console.log(color)
    console.log(posX, posY)
    console.log(size)
    if(drawing){
        cCirc(posX, posY, size, color)
        setTimeout(anim, 0.1)
    }
}