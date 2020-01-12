const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

canvas.width = window.innerWidth-400
canvas.height = window.innerHeight-40

// const blurOverlay = document.getElementById("blur")
// blurOverlay.style.width = `${canvas.width}px` 
// blurOverlay.style.height = `${canvas.height}px`


//disable right-click

document.addEventListener('contextmenu', event => event.preventDefault())


let overlay = document.querySelector(".overlay")

let shopBtns = document.querySelectorAll(".shopBtn")


let tankImg = new Image()
tankImg.src = "sprites/smallTank1.png"
let gunImg = new Image()
gunImg.src = "sprites/smallGun1.png"
let sniperBullet = new Image()
sniperBullet.src = "sprites/sniperBullet.png"
let pistolBullet = new Image()
pistolBullet.src = "sprites/pistolBullet.png"
let lmgBullet = new Image()
lmgBullet.src = "sprites/lmgBullet.png"

let bulletImg


let healthPotImg = new Image()
healthPotImg.src = "sprites/healthPot.png"




let type, speed, tid, bulletSpeed, gunLength, playerIsCarrying, moneyPerKill, pierces, tankLevel, 
mode, speedReduction, readyToShoot, baseDmg, bloom, fireRate, healthPotHeal, gunLevel, basePierces, 
shotGunShots, fallOffRange, bulletRadius, killCount, overlayInterval, hunterInterval, readyToStartNewWave, 
wave, b

let pushAwayStrengt = 0.2
let pushWhenHitStrength = 30
let pickupDistance = 10
let oldTime = 0
let stop = true
let bulletArr = []
let hunterArr = []




document.querySelector("#smallTank").addEventListener("click", startGame)
document.querySelector("#bigTank").addEventListener("click", startGame)
document.querySelector(".pause").addEventListener("click", function(){if(stop){stop = false} else{stop = true}})
window.addEventListener("mousemove", moveMouse)
window.addEventListener("mousedown", shoot)
window.addEventListener("mouseup", function(){ mouseIsPressed = false; startSpraying = false})
window.addEventListener("keydown", pressDown)
window.addEventListener("keyup", releaseKey)
