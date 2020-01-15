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
         <h1>Pause Menu</h1> 
        <br>
        <br>
        Turn on/off darkmode: <input type="button" id="darkModeBtn">
        </div> `

        let pauseEl = document.getElementById("pauseMenu")
    
        let darkModeBtn = document.getElementById("darkModeBtn")

        darkModeBtn.addEventListener("click", ()=>{
            bodyEL.style.backgroundColor == "beige" ? 
            bodyEL.style.backgroundColor = "hsl(60, 0%, 20%)" :
            bodyEL.style.backgroundColor = "beige"
        })
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




function changeTank(){
    tanks[type][tankLevel-1]()
}

function changeGun(){
    guns[type][gunLevel-1]()
}


function startGame(e){
    if(e!= false) {
        type = e.target.name
        // document.querySelector("#pauseBtn").addEventListener("click", pauseMenu)
        window.addEventListener("keydown", pressDown)
    }
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
        startNewWave("Wave 1 starting in", 4, "Move with the WASD keys <br> Aim and shoot with the mouse <br> Press ESC to pause/unpause the game at any time <br> Press H to use Health Potion <br> <br> Try to survive as long as possible",
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
                    hunterArr.push(new Sploder(1, 100))
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
            wave = "Freemode"
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
    overlay.style.top = "0px"
    overlay.style.left = "0px"
    overlay.style.width = `${canvas.width}px` 
    overlay.style.height = `${canvas.height}px`
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





