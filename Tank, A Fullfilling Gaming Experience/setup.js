const canvas = document.querySelector("canvas")
const overlay = document.querySelector(".overlay")
const c = canvas.getContext("2d")
canvas.width = window.innerWidth-400
canvas.height = window.innerHeight-40


let tankImg = new Image()
tankImg.src = "sprites/smallTank1.png"
let gunImg = new Image()
gunImg.src = "sprites/smallGun1.png"
let healthPotImg = new Image()
healthPotImg.src = "sprites/healthPot.png"


let shopBtns = document.querySelectorAll(".shopBtn")



let type, speed, tid, bulletSpeed, gunLength, playerIsCarrying, hunterSpeed, moneyPerKill, pierces, tankLevel, mode, speedReduction, readyToShoot, baseDmg, bloom, fireRate, healthPotHeal, gunLevel, basePierces, shotGunShots, fallOffRange
function defaultSettings(){
    healthPotHeal = 300
    readyToShoot = true
    speedReduction = [false, 1.5]
    weapons.shotgun()
    shotGunShots = 10
    fallOffRange = 200
    pierces = 0
    fireRate = 3
    speed = 3
    tid = 0
    gunLength = 59
    playerIsCarrying = false
    hunterSpeed = 2
    moneyPerKill = 25
    tankLevel = 1
    gunLevel = 1
}


let pushAwayStrengt = 0.2
let pushWhenHitStrength = 30
let pickupDistance = 10
let stop = true
let bulletArr = []
let hunterArr = []

let tanks = {
    small: [
        function(){
            player.health = 400
            healthBar.startHealth = 400
            speed = 3
            tankImg.src = "sprites/smallTank1.png"
        },
        function(){
            if(player.health > 375) player.health = 375 
            healthBar.startHealth = 375
            speed = 4
            tankImg.src = "sprites/smallTank2.png"
        },
        function(){
            if(player.health > 350) player.health = 350 
            healthBar.startHealth = 350
            speed = 5
            tankImg.src = "sprites/smallTank3.png"
        },
        function(){
            if(player.health > 325) player.health = 325 
            healthBar.startHealth = 325
            speed = 6
            tankImg.src = "sprites/smallTank4.png"
        },
        function(){
            if(player.health > 300) player.health = 300 
            healthBar.startHealth = 300
            speed = 6.5
            tankImg.src = "sprites/smallTank5.png"
        },
        function(){
            if(player.health > 275) player.health = 275 
            healthBar.startHealth = 275
            speed = 7
            tankImg.src = "sprites/smallTank6.png"
        },
        function(){
            if(player.health > 250) player.health = 250
            healthBar.startHealth = 250
            speed = 8.5
            tankImg.src = "sprites/smallTank7.png"
        },
    ],
    big: [
        function(){
            player.health = 500
            healthBar.startHealth = 500
            speed = 2.5
            tankImg.src = "sprites/bigTank1.png"
        },
        function(){
            if(player.health > 600) player.health = 600 
            healthBar.startHealth = 600
            speed = 2.5
            tankImg.src = "sprites/bigTank2.png"
        },
        function(){
            if(player.health > 700) player.health = 700 
            healthBar.startHealth = 700
            speed = 2.5
            tankImg.src = "sprites/bigTank3.png"
        },
        function(){
            if(player.health > 800) player.health = 800 
            healthBar.startHealth = 800
            speed = 2.5
            tankImg.src = "sprites/bigTank4.png"
        },
        function(){
            if(player.health > 900) player.health = 900 
            healthBar.startHealth = 900
            speed = 2.5
            tankImg.src = "sprites/bigTank5.png"
        },
        function(){
            if(player.health > 1000) player.health = 1000 
            healthBar.startHealth = 1000
            speed = 2.5
            tankImg.src = "sprites/bigTank6.png"
        },
        function(){
            if(player.health > 1500) player.health = 1500 
            healthBar.startHealth = 1500
            speed = 2
            tankImg.src = "sprites/bigTank7.png"
        }
    ]
}

let guns = {
    small: [
        function(){
            gunLength = 63
            gunImg.src = "sprites/bigGun1.png"
        },
        function(){
            gunLength = 63
            gunImg.src = "sprites/bigGun2.png"
        },
        function(){
            gunLength = 56
            gunImg.src = "sprites/bigGun3.png"
        },
        function(){
            gunLength = 56
            gunImg.src = "sprites/bigGun4.png"
        },
        function(){
            gunLength = 65
            gunImg.src = "sprites/bigGun5.png"
        },
        function(){
            gunLength = 50
            gunImg.src = "sprites/bigGun6.png"
        },
        function(){
            gunLength = 59
            gunImg.src = "sprites/bigGun7.png"
        },
    ],
    big: [
        function(){
            gunLength = 63
            gunImg.src = "sprites/smallGun1.png"
        },
        function(){
            gunLength = 63
            gunImg.src = "sprites/smallGun2.png"
        },
        function(){
            gunLength = 56
            gunImg.src = "sprites/smallGun3.png"
        },
        function(){
            gunLength = 56
            gunImg.src = "sprites/smallGun4.png"
        },
        function(){
            gunLength = 65
            gunImg.src = "sprites/smallGun5.png"
        },
        function(){
            gunLength = 50
            gunImg.src = "sprites/smallGun6.png"
        },
        function(){
            gunLength = 59
            gunImg.src = "sprites/smallGun7.png"
        },
    ]
}


let weapons = {
    pistol: function(){
        mode = "pistol"
        bulletSpeed = 6
        baseDmg = 50
        basePierces = 0
    },
    smg: function(){
        mode = "smg"
        bulletSpeed = 5
        baseDmg = 25
        basePierces = 0
        bloom = Math.PI/15
        fireRate = 4
    },
    lmg: function(){
        mode = "lmg"
        bulletSpeed = 7
        speedReduction = [true, 1.5]
        baseDmg = 65
        basePierces = 1
        fireRate = 3
        bloom = Math.PI/12
    },
    sniper: function(){
        mode = "sniper"
        bulletSpeed = 20
        basePierces = 2
        baseDmg = 150
        fireRate = 1
    },
    shotgun: function(){
        mode = "shotgun"
        bulletSpeed = 12
        basePierces = 0
        baseDmg = 150
        fireRate = 1
        bloom = Math.PI/15
    }
}



const distance = (pos1, pos2) => Math.sqrt(Math.pow(pos2.x-pos1.x, 2) + Math.pow(pos2.y-pos1.y, 2))


function startShop(){
    for(let i = 0; i<shopBtns.length; i++){
        shopBtns[i].addEventListener("click", function(){
    
            let price = Number(shopBtns[i].value.split("").slice(1).join(""))
    
            if(player.money >= price){
                player.money -= price
                if(i<5) shopFunctions[i](price)
    
                else{
                    weapons[shopBtns[i].name]()
                    for(let k = 5; k < shopBtns.length; k++){
                        shopBtns[k].value = shopBtns[k].id
                    }
                    shopBtns[i].value = "SELECTED"
                }
            }
        })
    }
}
function changeTank(){
    tanks[type][tankLevel-1]()
}
function changeGun(){
    guns[type][gunLevel-1]()
}

function pickSmallTank(){
    stop = false
    overlay.innerHTML = ""
    type = "small"
    changeTank()
    changeGun()
    startShop()
}
function pickBigTank(){
    stop = false
    overlay.innerHTML = ""
    type = "big"
    changeTank()
    changeGun()
    startShop()
}




const rotate = (vector, angle) =>[vector[0]*Math.cos(angle) - vector[1]*Math.sin(angle), vector[0]*Math.sin(angle) + vector[1]*Math.cos(angle)]



function pressDown(e){
    if((e.key == "h" || e.key == "H") && healthPots.antall > 0) {healthPots.antall -= 1; player.health += healthPotHeal; if(player.health > healthBar.startHealth) player.health = healthBar.startHealth}
    else controller[e.key] = true
}
function releaseKey(e){
    controller[e.key] = false
}
function moveMouse(e){
    mouse.x = e.clientX
    mouse.y = e.clientY
}
function restart(){
    defaultSettings()
    changeTank()
    stop = false
    overlay.style.display = "none"
    player.health = 400
    healthBar.startHealth = 400
    player.pos = {x:canvas.width/2, y:canvas.height/2}
    player.money = 10000000
    bulletArr = []
    hunterArr = []
    for(let i = 0; i < shopBtns.length; i++){
        shopBtns[i].value = shopBtns[i].id
    }
    weapons[shopBtns[5].name]()
    shopBtns[5].value = "SELECTED"

}

function youLose(){
    overlay.style = ""
    overlay.innerHTML = `You lose <input type="button" class="restart" value="Restart?">`
    overlay.style.position = "absolute"
    overlay.style.fontSize = "40px"
    overlay.style.left = `${canvas.width/2-100}px`
    overlay.style.top = `${canvas.height/2-30}px`
    let restartBtn = document.querySelector(".restart")
    restartBtn.addEventListener("click", restart)
}

let oldTime = 0

function randomInt(min, max){
    return Math.random()*(max-min)+min
}



function shoot(){
    setTimeout(function(){mouseIsPressed=true}, 100)
    let deltaX = mouse.x-player.pos.x
    let deltaY = mouse.y-player.pos.y
    let phi = Math.atan2(deltaY, deltaX)
    let radius = 5
    if(mode == "shotgun"){
        radius = 3
        if(tid - oldTime >= 4/fireRate){
            oldTime = tid
            let tempNumberOfShots = 0
            let shotgunInterval = setInterval(() => {
                tempNumberOfShots += 1
                let tempPhi = randomInt(phi-bloom, phi+bloom)
                bulletArr.push(new Bullet(player.pos.x + Math.cos(tempPhi)*(gunLength-35), player.pos.y + Math.sin(tempPhi)*(gunLength-35), Math.cos(tempPhi)*bulletSpeed + player.vel.x*0.5, Math.sin(tempPhi)*bulletSpeed + player.vel.y*0.5, radius, true))
                if(tempNumberOfShots == shotGunShots){
                    clearInterval(shotgunInterval)
                }
            }, 2.5)
        }
    }
    else{
        if(mode == "sniper"){
            radius = 10
            if(tid - oldTime >= 0.75/fireRate) {readyToShoot = true; oldTime = tid}
            else readyToShoot = false
        }
        else if(mode == "pistol" || mode == "smg") {
            readyToShoot = true
            radius = 5
        }
        else if(mode == "lmg"){
            readyToShoot = true
            radius = 6.5
        }
        if(readyToShoot) bulletArr.push(new Bullet(player.pos.x + Math.cos(phi)*(gunLength-35), player.pos.y + Math.sin(phi)*(gunLength-35), Math.cos(phi)*bulletSpeed + player.vel.x*0.5, Math.sin(phi)*bulletSpeed + player.vel.y*0.5, radius, false))
    }
    readyToShoot = false
}

function spray(){
    let deltaX = mouse.x-player.pos.x
    let deltaY = mouse.y-player.pos.y
    let phi = Math.atan2(deltaY, deltaX)
    let radius = 5
    if(mode == "lmg") radius = 6.5
    phi = randomInt(phi-bloom, phi+bloom)
    if((tid-oldTime)*fireRate >= 1/fireRate){
        bulletArr.push(new Bullet(player.pos.x + Math.cos(phi)*(gunLength-35), player.pos.y + Math.sin(phi)*(gunLength-35), Math.cos(phi)*bulletSpeed + player.vel.x*0.5, Math.sin(phi)*bulletSpeed + player.vel.y*0.5))
        oldTime = tid
    }
}




let shopFunctions = [
    function(pris){
        if(tankLevel < 7){
            tankLevel+=1
            changeTank()
            let nyPris = pris + 300
            shopBtns[0].value = `$${nyPris}`
            if(tankLevel == 7){
                shopBtns[0].value = `MAXED OUT`
                player.money += pris
            }
        }
        else{
            shopBtns[0].value = `MAXED OUT`
            player.money += pris
        }
    },
    function(pris){
        pierces+=1
        let nyPris = pris + 1000
        shopBtns[1].value = `$${nyPris}`
    },
    function(pris){
        if(gunLevel < 7){
            gunLevel+=1
            player.addedDmg+=20
            changeGun()
            let nyPris = pris + 300
            shopBtns[2].value = `$${nyPris}`
            if(gunLevel == 7){
                shopBtns[2].value = `MAXED OUT`
                player.money += pris
            }
        }
        else{
            shopBtns[2].value = `MAXED OUT`
            player.money += pris
        }
        
    },
    function(pris){
        moneyPerKill += 50
        let nyPris = pris + 2000
        shopBtns[3].value = `$${nyPris}`
    },
    function(){
        healthPots.antall += 1
    }
]






document.querySelector("#smallTank").addEventListener("click", pickSmallTank)
document.querySelector("#bigTank").addEventListener("click", pickBigTank)
document.querySelector(".pause").addEventListener("click", function(){if(stop){stop = false} else{stop = true}})
window.addEventListener("mousemove", moveMouse)
window.addEventListener("mousedown", shoot)
window.addEventListener("mouseup", function(){ mouseIsPressed = false })
window.addEventListener("keydown", pressDown)
window.addEventListener("keyup", releaseKey)
