const distance = (pos1, pos2) => Math.sqrt(Math.pow(pos2.x-pos1.x, 2) + Math.pow(pos2.y-pos1.y, 2))
const randomInt = (min, max) => Math.random()*(max-min)+min

function pauseMenu(){

    if(stop){
        stop = false
        canvas.style.filter = "none"
        wrapper.style.filter = "none"
        for(let i = 0; i < shopBtns.length; i++){
            shopBtns[i].style.pointerEvents = "auto"
        }
        overlay.innerHTML = ""
    }
    else{
        stop = true
        canvas.style.filter = "blur(3px)"
        wrapper.style.filter = "blur(3px)"
        for(let i = 0; i < shopBtns.length; i++){
            shopBtns[i].style.pointerEvents = "none"
        }
        overlay.style.color = "rgba(0, 0, 0, 1)"
        overlay.innerHTML = ` <div id="pauseMenu"> 
         Pause Menu 
        <br>
        <br>

         Dette er en knapp: <input type="button">
        </div> `
    }
    

}

function defaultSettings(){
    healthPotHeal = 300
    readyToShoot = true
    speedMultiple = 1
    wave = 1
    readyToStartNewWave = true
    weapons.pistol()
    shotGunShots = 10
    fallOffRange = 200
    pierces = 0
    fireRate = 3
    speed = 3
    tid = 0
    gunLength = 59
    playerIsCarrying = false
    moneyPerKill = 25
    tankLevel = 1
    gunLevel = 1
    killCount = 0
}

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
        bulletRadius = 5
        baseDmg = 50
        basePierces = 0
        speedMultiple = 1.25
        bulletImg = pistolBullet
        b = {
            SX: 0,
            SY: 0,
            SW: 256,
            SH: 512,
            OX: -8,
            OY: -17,
            W: 256/15,
            H: 512/15
        }
    },
    smg: function(){
        mode = "smg"
        bulletSpeed = 5
        baseDmg = 25
        bulletRadius = 4
        basePierces = 0
        bloom = Math.PI/15
        fireRate = 5
        speedMultiple = 1.2
        b = {
            SX: 0,
            SY: 0,
            SW: 256,
            SH: 512,
            OX: -8,
            OY: -17,
            W: 256/15,
            H: 512/15
        }
        bulletImg = pistolBullet
    },
    lmg: function(){
        mode = "lmg"
        bulletSpeed = 8
        speedMultiple = 0.75
        baseDmg = 65
        bulletRadius = 6.5
        basePierces = 1
        fireRate = 4
        bloom = Math.PI/12
        b = {
            SX: 0,
            SY: 0,
            SW: 256,
            SH: 1000,
            OX: -6,
            OY: -17,
            W: 256/20,
            H: 1000/20
        }
        bulletImg = lmgBullet
    },
    sniper: function(){
        mode = "sniper"
        bulletSpeed = 20
        basePierces = 2
        baseDmg = 150
        fireRate = 1
        bulletRadius = 10
        b = {
            SX: 0,
            SY: 0,
            SW: 1002,
            SH: 3587,
            OX: -11,
            OY: -20,
            W: 1002/50,
            H: 3587/50
        }
        bulletImg = sniperBullet
        speedMultiple = 1
    },
    shotgun: function(){
        mode = "shotgun"
        bulletSpeed = 12
        bulletRadius = 2.5
        basePierces = 0
        baseDmg = 150
        fireRate = 1
        bloom = Math.PI/15
        speedMultiple = 1
    }
}

function changeTank(){
    tanks[type][tankLevel-1]()
}

function changeGun(){
    guns[type][gunLevel-1]()
}


function startGame(e){
    if(e!= false) type = e.target.name
    defaultSettings()
    overlay.innerHTML = ""
    changeTank()
    changeGun()
    startShop()
    stop = false
    wave = 1
    waves[wave-1]()
}




function startNewWave(text, countDownTime, text2, foo){
    let rgbAlpha = 0
    let tempTime = 0
    overlayInterval = setInterval(() => {
        if(!stop){
            overlay.style.color = `rgba(0, 0, 0, ${rgbAlpha})`
            overlay.innerHTML = `${text} ${countDownTime - Math.ceil(tempTime)} <br> <br> <p>${text2}</p>`
            if(rgbAlpha < 1) rgbAlpha += 0.002
            tempTime += 0.01
            if(tempTime > countDownTime) foo()
        }
    }, 10)
}


let waves = [
    () => {
        readyToStartNewWave = false
        canvas.style.filter = "blur(3px)"
        startNewWave("Wave 1 starting in", 5, "This should be easy",
        function(){
            clearInterval(overlayInterval)
            overlay.innerHTML = ""
            stop = false
            canvas.style.filter = "none"
            let antallHunters = 6                                                       
            let deployedHunters = 1
            hunterInterval = setInterval(() => {
                if(!stop){
                    if(deployedHunters == antallHunters){
                        clearInterval(hunterInterval)
                        readyToStartNewWave = true
                    }
                    deployedHunters += 1
                    hunterArr.push(new Hunter(1, 100))
                }
            }, 1000)
        }
    )
},
    () => {
        readyToStartNewWave = false
        canvas.style.filter = "blur(3px)"
        startNewWave("Wave 2 starting in", 10, "Tankier enemies",
        function(){
            clearInterval(overlayInterval)
            overlay.innerHTML = ""
            stop = false
            canvas.style.filter = "none"
            let antallHunters = 12                                                      
            let deployedHunters = 1
            hunterInterval = setInterval(() => {
                if(!stop){
                    if(deployedHunters == antallHunters){
                        clearInterval(hunterInterval)
                        readyToStartNewWave = true
                    }
                    deployedHunters += 1
                    hunterArr.push(new Hunter(1, 150))
                }
            }, 1000)
        }
    )
},
() => {
        readyToStartNewWave = false
        canvas.style.filter = "blur(3px)"
        startNewWave("Wave 3 starting in", 10, "Increased speed",
        function(){
            clearInterval(overlayInterval)
            overlay.innerHTML = ""
            stop = false
            canvas.style.filter = "none"
            let antallHunters = 24                                                    
            let deployedHunters = 1
            hunterInterval = setInterval(() => {
                if(!stop){
                    if(deployedHunters == antallHunters){
                        clearInterval(hunterInterval)
                        readyToStartNewWave = true
                    }
                    deployedHunters += 1
                    hunterArr.push(new Hunter(2, 150))
                }
            }, 1000)
        }
    )
},
    () => {
        readyToStartNewWave = false
        canvas.style.filter = "blur(3px)"
        startNewWave("Wave 4 starting in", 10, "Quicker spawns",
        function(){
            clearInterval(overlayInterval)
            overlay.innerHTML = ""
            stop = false
            canvas.style.filter = "none"
            let antallHunters = 35                                                      
            let deployedHunters = 1
            hunterInterval = setInterval(() => {
                if(!stop){
                    if(deployedHunters == antallHunters){
                        clearInterval(hunterInterval)
                        readyToStartNewWave = true
                    }
                    deployedHunters += 1
                    hunterArr.push(new Hunter(2, 150))
                }
            }, 700)
        }
    )
},
() => {
    readyToStartNewWave = false
    canvas.style.filter = "blur(3px)"
    startNewWave("Wave 5 starting in", 10, "Even tankier",
    function(){
        clearInterval(overlayInterval)
        overlay.innerHTML = ""
        stop = false
        canvas.style.filter = "none"
        let antallHunters = 40                                                     
        let deployedHunters = 1
        hunterInterval = setInterval(() => {
            if(!stop){
                if(deployedHunters == antallHunters){
                    clearInterval(hunterInterval)
                    readyToStartNewWave = true
                }
                deployedHunters += 1
                hunterArr.push(new Hunter(2, 200))
            }
        }, 700)
    }
)
},
    () => {
        readyToStartNewWave = false
        canvas.style.filter = "blur(3px)"
        startNewWave("Freemode starting in", 10, "Have fun",
        function(){
            clearInterval(overlayInterval)
            overlay.innerHTML = ""
            stop = false
            canvas.style.filter = "none"                                                  
            hunterInterval = setInterval(() => {
                if(!stop){
                    hunterArr.push(new Hunter(2, 150))
                }
            }, 700)
        }
    )
},
]



function pressDown(e){
    if((e.key == "h" || e.key == "H") && healthPots.antall > 0 && player.health < healthBar.startHealth) {healthPots.antall -= 1; player.health += healthPotHeal; if(player.health > healthBar.startHealth) player.health = healthBar.startHealth}
    else if(e.keyCode == 65) controller.a = true
    else if(e.keyCode == 87) controller.w = true
    else if(e.keyCode == 68) controller.d = true
    else if(e.keyCode == 83) controller.s = true
    else if(e.keyCode == 27) pauseMenu()
}

function releaseKey(e){
    if(e.keyCode == 65) controller.a = false
    else if(e.keyCode == 87) controller.w = false
    else if(e.keyCode == 68) controller.d = false
    else if(e.keyCode == 83) controller.s = false
}

function moveMouse(e){
    mouse.x = e.clientX
    mouse.y = e.clientY
}

function restart(){
    clearInterval(hunterInterval)
    player.pos = {x:canvas.width/2, y:canvas.height/2}
    player.money = 0
    bulletArr = []
    hunterArr = []
    for(let i = 0; i < shopBtns.length; i++){
        shopBtns[i].value = shopBtns[i].id
    }
    shopBtns[5].value = "SELECTED"
    startGame(false)
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



function shoot(){
    mouseIsPressed=true
  
    let deltaX = mouse.x-player.pos.x
    let deltaY = mouse.y-player.pos.y
    let phi = Math.atan2(deltaY, deltaX)
    let radius = 5
    if(mode == "shotgun"){
        if(tid - oldTime >= 0.75/fireRate){
            oldTime = tid
            let tempNumberOfShots = 0
            let shotgunInterval = setInterval(() => {
                tempNumberOfShots += 1
                let tempPhi = randomInt(phi-bloom, phi+bloom)
                bulletArr.push(new Bullet(player.pos.x + Math.cos(tempPhi)*(gunLength-35), player.pos.y + Math.sin(tempPhi)*(gunLength-35), Math.cos(tempPhi)*bulletSpeed + player.vel.x*0.25, Math.sin(tempPhi)*bulletSpeed + player.vel.y*0.25, bulletRadius, true, tempPhi, mode, bulletImg, b))
                if(tempNumberOfShots == shotGunShots){
                    clearInterval(shotgunInterval)
                }
            }, 2.5)
        }
    }
    else{
        if(mode == "sniper"){
            if(tid - oldTime >= 0.75/fireRate) {readyToShoot = true; oldTime = tid}
            else readyToShoot = false
        }
        else if(mode == "pistol" || mode == "smg") {
            readyToShoot = true
        }
        else if(mode == "lmg"){
            readyToShoot = true
        }
        if(readyToShoot) bulletArr.push(new Bullet(player.pos.x + Math.cos(phi)*(gunLength-35), player.pos.y + Math.sin(phi)*(gunLength-35), Math.cos(phi)*bulletSpeed + player.vel.x*0.25, Math.sin(phi)*bulletSpeed + player.vel.y*0.25, bulletRadius, false, phi, mode, bulletImg, b))
    }
    readyToShoot = false
}


function spray(){
    let deltaX = mouse.x-player.pos.x
    let deltaY = mouse.y-player.pos.y
    let phi = Math.atan2(deltaY, deltaX)
    phi = randomInt(phi-bloom, phi+bloom)
    if((tid-oldTime)*fireRate >= 1/fireRate){
        bulletArr.push(new Bullet(player.pos.x + Math.cos(phi)*(gunLength-35), player.pos.y + Math.sin(phi)*(gunLength-35), Math.cos(phi)*bulletSpeed + player.vel.x*0.25, Math.sin(phi)*bulletSpeed + player.vel.y*0.25, bulletRadius, false, phi, mode, bulletImg, b))
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

function startShop(){
    for(let i = 0; i<shopBtns.length; i++){
        shopBtns[i].addEventListener("click", function(){
    
            let price = Number(shopBtns[i].value.split("").slice(1).join(""))
    
            if(player.money >= price){
                player.money -= price
                if(i<5) shopFunctions[i](price)
    
                else{
                    if(!stop){
                    weapons[shopBtns[i].name]()
                    for(let k = 5; k < shopBtns.length; k++){
                        shopBtns[k].value = shopBtns[k].id
                    }
                    shopBtns[i].value = "SELECTED"
                }                }
            }
        })
    }
}





