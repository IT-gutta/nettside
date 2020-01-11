const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")
canvas.width = window.innerWidth-400
canvas.height = window.innerHeight-40

let overlay = document.querySelector(".overlay")

let shopBtns = document.querySelectorAll(".shopBtn")


let tankImg = new Image()
tankImg.src = "sprites/smallTank1.png"
let gunImg = new Image()
gunImg.src = "sprites/smallGun1.png"
let bulletImg = new Image()
bulletImg.src = "sprites/sniperBullet.png"
let healthPotImg = new Image()
healthPotImg.src = "sprites/healthPot.png"




let type, speed, tid, bulletSpeed, gunLength, playerIsCarrying, hunterSpeed, moneyPerKill, pierces, tankLevel, mode, speedReduction, readyToShoot, baseDmg, bloom, fireRate, healthPotHeal, gunLevel, basePierces, shotGunShots, fallOffRange, bulletSX, bulletSY, bulletSW, bulletSH, bulletWidth, bulletHeight, bulletOffsetX, bulletOffsetY, bulletRadius
let pushAwayStrengt = 0.2
let pushWhenHitStrength = 30
let pickupDistance = 10
let oldTime = 0
let stop = true
let bulletArr = []
let hunterArr = []




document.querySelector("#smallTank").addEventListener("click", pickSmallTank)
document.querySelector("#bigTank").addEventListener("click", pickBigTank)
document.querySelector(".pause").addEventListener("click", function(){if(stop){stop = false} else{stop = true}})
window.addEventListener("mousemove", moveMouse)
window.addEventListener("mousedown", shoot)
window.addEventListener("mouseup", function(){ mouseIsPressed = false })
window.addEventListener("keydown", pressDown)
window.addEventListener("keyup", releaseKey)
