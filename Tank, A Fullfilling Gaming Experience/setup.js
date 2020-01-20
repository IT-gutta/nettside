const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")
canvas.style.border = "1px solid black"
canvas.width = window.innerWidth-400
canvas.height = window.innerHeight-40

// const blurOverlay = document.getElementById("blur")
// blurOverlay.style.width = `${canvas.width}px` 
// blurOverlay.style.height = `${canvas.height}px`


//disable right-click
document.addEventListener('contextmenu', event => event.preventDefault())

//disable drag
document.addEventListener('dragstart', event => event.preventDefault())

let bodyEL = document.querySelector("body")

let crosshair = new Image()

crosshair.src = "sprites/crosshair.png"


let overlay = document.querySelector(".overlay")

overlay.style.width = `${canvas.width}px` 
overlay.style.height = `${canvas.height}px`



let wrapper = document.getElementById("wrapper")


let backgroundMusic = document.querySelector("audio")
backgroundMusic.volume = 0.1

let splintImg = new Image()
splintImg.src = "sprites/splint.png"

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
let blur = false

let bulletImg


let healthPotImg = new Image()
healthPotImg.src = "sprites/healthPot.png"


let pistolAudio = new Audio()
let lmgAudio = new Audio()
let shotgunAudio = new Audio()
let winAudio = new Audio()
let loseAudio = new Audio()
let damagedAudio = new Audio()


pistolAudio.src = "sounds/pistol.mp3"
lmgAudio.src = "sounds/lmg.mp3"
shotgunAudio.src = "sounds/shotgun.mp3"
winAudio.src = "sounds/win.wav"
loseAudio.src = "sounds/lose.wav"
damagedAudio.src = "sounds/damaged.wav"

let audioArr = [pistolAudio, lmgAudio, shotgunAudio, winAudio, loseAudio, damagedAudio]

let volumeLevel = 3


pistolAudio.volume = 0.03
lmgAudio.volume = 0.05
shotgunAudio.volume = 0.1
winAudio.volume = 0.05
loseAudio.volume = 0.1
damagedAudio.volume = 0.1






let type, speed, tid, bulletSpeed, gunLength, playerIsCarrying, moneyPerKill, pierces, tankLevel, 
mode, speedReduction, readyToShoot, baseDmg, bloom, fireRate, healthPotHeal, gunLevel, basePierces, 
shotGunShots, fallOffRange, bulletRadius, killCount, overlayInterval, hunterInterval, readyToStartNewWave, 
wave, b, addedDmg, totalHealthPots, shopBtns

let splintSpeed = 6
let splodeRange = 50
let splodeDamage = 50
let splintArr = []
let splintAngle = Math.random()*2*Math.PI

let pushAwayStrengt = 0.2
let pushWhenHitStrength = 30
let pickupDistance = 10
let oldTime = 0
let audioOldTime = 0
let stop = true
let bulletArr = []
let hunterArr = []




document.querySelector("#smallTank").addEventListener("click", startGame)
document.querySelector("#bigTank").addEventListener("click", startGame)
window.addEventListener("mousemove", moveMouse)
overlay.addEventListener("mousedown", shoot)
window.addEventListener("mouseup", function(){ mouseIsPressed = false; startSpraying = false})
window.addEventListener("keyup", releaseKey)
window.addEventListener("keydown", pressDown)