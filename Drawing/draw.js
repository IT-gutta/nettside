canvas.width= window.innerWidth
canvas.height= window.innerHeight
posX = 0
posY = 0
size = 2
colorIndex = 1
let shapeIndex = 0
let shape
let lineMode = false
let grad, pointOne, pointTwo
color = "white"
map = []
drawing = false
var colorEl = document.querySelector("#color")
var shapeEl = document.querySelector("#shape")
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
shapeEl.addEventListener("change", newShape)


function erase(){
    c.clearRect(0,0,canvas.width,canvas.height)
    slider.update()
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
        case 11:
            grad = c.createLinearGradient(0, 0, canvas.width, canvas.height)
            grad.addColorStop(0.1, "magenta")
            grad.addColorStop(0.4, "blue")
            grad.addColorStop(0.9, "red")
            color = grad
            break;
    }
    console.log(color);
}

function newShape(){
    shapeIndex = shapeEl.selectedIndex
    if(shapeIndex==0){
        lineMode =false
    }
    else if(shapeIndex==1){
        lineMode = true
    }
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
}
function draw(){
    if(lineMode){
        pointOne = {x: posX, y:posY}
    }
    else{
        drawing = true
        anim()}
}
function drawLine(){
    c.beginPath()
    c.moveTo(pointOne.x, pointOne.y)
    c.lineTo(pointTwo.x, pointTwo.y)
    c.lineWidth = size
    c.strokeStyle = color
    c.stroke()
    c.closePath()
}
function notDraw(){
    if(lineMode){
        pointTwo = {x: posX, y:posY}
        drawLine()
    }
    drawing = false
}
for(i=0; i<canvas.height; i++){
    map.push([])
    for (j = 0; j<canvas.width; j++){
        map[i].push(0)
    }
}


function anim(){
    if(drawing){
        cCirc(posX, posY, size, color)
        slider.update()
        setTimeout(anim, 0.1)
    }
}   



let slider = {
    x: 200, 
    y: 50,
    r: 20,
    draw: function(){
        c.beginPath()
        c.arc(this.x, this.y, this.r, 0, 2*Math.PI)
        c.fillStyle=`hsla(${560-this.x}, 100%, 50%, 1)`
        c.fill()
        c.font = "20px sans-serif"
        c.fillStyle = "black"
        c.clearRect(200, 90, 100, 50)
        c.fillText("Colorpicker", 200, 90)
    },
    update: function(){
        this.draw()
        color = `hsla(${560-this.x}, 100%, 50%, 1)`
    } 
}
let mouse = {x: undefined, y: undefined}
function inRange(){
    console.log(mouse, Math.sqrt(Math.pow(mouse.x-slider.x, 2) + Math.pow(mouse.y-slider.y, 2)))
    if(Math.sqrt(Math.pow(mouse.x-slider.x, 2) + Math.pow(mouse.y-slider.y, 2)) < slider.r){
        return true
    }
    return false
}
let sliderState = false
function mDown(e){
    mouse.x = e.clientX-(window.innerWidth-canvas.width)/2
    mouse.y = e.clientY-(window.innerHeight-canvas.height)/2
    if (inRange()){
        sliderState = true
    }    
}
function mUp(){
    sliderState = false
}

function moveSlider(e){
    mouse.x = e.clientX-(window.innerWidth-canvas.width)/2
    mouse.y = e.clientY-(window.innerHeight-canvas.height)/2
    if(sliderState){
        c.beginPath()
        c.fillStyle = "white"
        c.arc(slider.x, slider.y, slider.r, 0, 2*Math.PI)
        c.fill()
        c.closePath()
        slider.x = mouse.x
        if(slider.x > 560){
            slider.x = 560
        }
        if(slider.x < 200){
            slider.x = 200
        }
        slider.update()
    }
}
slider.draw()
window.addEventListener("mousedown", mDown)
window.addEventListener("mouseup", mUp)
window.addEventListener("mousemove", moveSlider)