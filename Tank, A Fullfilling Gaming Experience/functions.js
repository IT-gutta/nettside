const distance = (pos1, pos2) => Math.sqrt(Math.pow(pos2.x-pos1.x, 2) + Math.pow(pos2.y-pos1.y, 2))
const randomInt = (min, max) => Math.random()*(max-min)+min


function updateAudio(dir){
    displayP.innerHTML = ""
    for(let i = 0; i < volumeLevel; i++){
        displayP.innerHTML += "| "
    }

    if(dir == "min"){
        for(let i = 0; i < audioArr.length; i++){
            audioArr[i].volume /= 1.45
        }
    }

    else if(dir == "plu"){
        for(let i = 0; i < audioArr.length; i++){
            audioArr[i].volume *= 1.45
        }
    }
}


function playAudio(audioEl){
    if(!stop){
        audioEl.currentTime = 0
        audioEl.play()
    }
}


function pauseMenu(){

    if(stop){
        backgroundMusic.volume *= 2
        stop = false
        canvas.style.filter = "none"
        wrapper.style.filter = "none"
        for(let i = 0; i < shopBtns.length; i++){
            shopBtns[i].style.pointerEvents = "auto"
        }
        overlay.innerHTML = ""
        overlay.style.cursor = "none"
    }
    else{
        backgroundMusic.volume /= 2
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
        Turn on/off darkmode: <input type="button" id="darkModeBtn">
        <br><br>
        Volume: <br>
    
        <input type="button" id="pluss" value="+"> <p id="displayP"></p> <input type="button" id="minus" value="-"> 

        </div> `
        let displayP = document.getElementById("displayP")

        updateAudio(false)

        document.getElementById("minus").addEventListener("click", ()=>{
            if(volumeLevel > 1){
                volumeLevel-=1
                updateAudio("min")
            }
        })
        document.getElementById("pluss").addEventListener("click", ()=>{
            if(volumeLevel < 9){
                volumeLevel+=1
                updateAudio("plu")
            }
        })
    
        let darkModeBtn = document.getElementById("darkModeBtn")

        darkModeBtn.addEventListener("click", ()=>{
            bodyEL.style.backgroundColor == "beige" ? 
            bodyEL.style.backgroundColor = "hsl(60, 0%, 20%)" :
            bodyEL.style.backgroundColor = "beige"
        })

        overlay.style.cursor = "auto"
    }
    

}

function defaultSettings(){
    healthPotHeal = 300
    readyToShoot = true
    speedMultiple = 1
    wave = 1
    readyToStartNewWave = true
    mode = "pistol"
    weapons[mode]()
    shotGunShots = 20
    fallOffRange = 200
    tid = 0
    oldTime = 0
    audioOldTime = 0
    moneyPerKill = 25
    tankLevel = 1
    gunLevel = 1
    killCount = 0
    totalHealthPots = 0
    pierces = 0
    healthPots.antall = 0
    addedDmg = 0

}




function changeTank(){
    tanks[type][tankLevel-1]()
}

function changeGun(){
    guns[type][gunLevel-1]()
}


function startGame(e){
    backgroundMusic.load()
    backgroundMusic.play()
    if(e!= false) {
        type = e.target.name
    }
    overlay.innerHTML = ""
    startShop()
    defaultSettings()
    changeTank()
    changeGun()
    stop = false
    waves[wave-1]()
    overlay.style.cursor = "none"
}




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
    mouse.x = e.clientX - 8
    mouse.y = e.clientY - 8
}

function restart(){
    clearInterval(hunterInterval)
    player.pos = {x:canvas.width/2, y:canvas.height/2}
    player.money = 0
    bulletArr = []
    hunterArr = []
    overlay.style.top = "0px"
    overlay.style.left = "0px"
    overlay.style.width = `${canvas.width}px` 
    overlay.style.height = `${canvas.height}px`
    startGame(false)
}

function youLose(){
    playAudio(loseAudio)
    stop = true
    overlay.style.cursor = "auto"
    backgroundMusic.pause()
    overlay.innerHTML = `You lose <input type="button" class="restart" value="Restart?">`
    // overlay.style.position = "absolute"
    // overlay.style.fontSize = "40px"
    // overlay.style.left = `${canvas.width/2-100}px`
    // overlay.style.top = `${canvas.height/2-30}px`
    let restartBtn = document.querySelector(".restart")
    restartBtn.addEventListener("click", restart)
}


//single-fire
function shoot(){
    mouseIsPressed = true
  
    let deltaX = mouse.x-player.pos.x
    let deltaY = mouse.y-player.pos.y
    let phi = Math.atan2(deltaY, deltaX)

    if(mode == "shotgun"){
        if(tid - oldTime >= 0.75/fireRate){
            playAudio(shotgunAudio)
            oldTime = tid
            let tempNumberOfShots = 0
            let shotgunInterval = setInterval(() => {
                tempNumberOfShots += 1
                let tempPhi = randomInt(phi-bloom, phi+bloom)
                bulletArr.push(new Bullet(player.pos.x + Math.cos(tempPhi)*(gunLength-35), player.pos.y + Math.sin(tempPhi)*(gunLength-35), Math.cos(tempPhi)*bulletSpeed + player.vel.x*0.25, Math.sin(tempPhi)*bulletSpeed + player.vel.y*0.25, bulletRadius, true, tempPhi, mode, bulletImg, b, baseDmg + addedDmg))
                if(tempNumberOfShots == shotGunShots){
                    clearInterval(shotgunInterval)
                }
            }, 2.5)
        }
    }
    else{
        if(mode == "sniper"){
            if(tid - oldTime >= 0.75/fireRate) {readyToShoot = true; playAudio(shotgunAudio); oldTime = tid}
            else readyToShoot = false
        }
        else if(mode == "pistol" || mode == "smg") {
            playAudio(pistolAudio)
            readyToShoot = true
        }
        else if(mode == "lmg"){
            playAudio(lmgAudio)
            readyToShoot = true
        }
        if(readyToShoot) bulletArr.push(new Bullet(player.pos.x + Math.cos(phi)*(gunLength-35), player.pos.y + Math.sin(phi)*(gunLength-35), Math.cos(phi)*bulletSpeed + player.vel.x*0.25, Math.sin(phi)*bulletSpeed + player.vel.y*0.25, bulletRadius, false, phi, mode, bulletImg, b, baseDmg + addedDmg))
    }
    readyToShoot = false
}

//auto-fire
function spray(){
    let deltaX = mouse.x-player.pos.x
    let deltaY = mouse.y-player.pos.y
    let phi = Math.atan2(deltaY, deltaX)
    phi = randomInt(phi-bloom, phi+bloom)
    if(mode == "smg"){
        if((tid-audioOldTime) >= 0.08){
            playAudio(pistolAudio)
            audioOldTime = tid
        }
    }

    else if(mode == "lmg"){
        if((tid-audioOldTime) >= 0.1){
            playAudio(lmgAudio)
            audioOldTime = tid
        }
    }

    if((tid-oldTime) >= 1/fireRate){
        

        bulletArr.push(new Bullet(player.pos.x + Math.cos(phi)*(gunLength-35), player.pos.y + Math.sin(phi)*(gunLength-35), Math.cos(phi)*bulletSpeed + player.vel.x*0.25, Math.sin(phi)*bulletSpeed + player.vel.y*0.25, bulletRadius, false, phi, mode, bulletImg, b, baseDmg + addedDmg))
        oldTime = tid
    }
}


//alle funksjonene som skjer utifra hvilken shopbutton man har trykket på
let shopFunctions = [
    function(pris){
        if(tankLevel < 7){
            tankLevel+=1
            changeTank()
            let nyPris = Math.ceil(pris * 2)
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
        if(pierces < 4){
            pierces+=1
            let nyPris = Math.ceil(pris * 2.8)
            shopBtns[1].value = `$${nyPris}`
        }
        else{
            shopBtns[1].value = `MAXED OUT`
            player.money += pris
        }
    },
    function(pris){
        if(gunLevel < 7){
            gunLevel+=1
            changeGun()
            let nyPris = pris*2.5
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
        if(moneyPerKill < 400){
            moneyPerKill *= 2
            let nyPris = pris * 3
            shopBtns[3].value = `$${nyPris}`
        }
        else{
            shopBtns[3].value = `MAXED OUT`
            player.money += pris
        }
    },
    function(){
        if(totalHealthPots < 7){
            healthPots.antall += 1
            totalHealthPots+=1
        }
        else{
            shopBtns[4].value = `SOLD OUT`
            player.money += pris
        }
    }
]

//adder eventisteners til shoppen
function startShop(){
        document.getElementById("wrapper").innerHTML = `<div class="shop">
            --Upgrades--<br><br>
            Tank: <br><input type="button" class="shopBtn" value="$600" id="$600"> <br>
            Piercing:<br> <input type="button" class="shopBtn" value="$1000" id="$1000"><br>
            Canon:<br> <input type="button" class="shopBtn" value="$800" id="$800"><br>
            Money Income:<br> <input type="button" class="shopBtn" value="$2000" id="$2000"><br>
            Health Potion: <br><input type="button" class="shopBtn" value="$500" id="$500"><br>
        </div>
        <div class="shop" id="margin-left">
            --Tankselector-- <br><br>
            Pistol: <br><input type="button" class="shopBtn" value="SELECTED" name="pistol" id="$0"><br>
            Sniper:<br> <input type="button" class="shopBtn" value="$1000" name="sniper" id="$1000"><br>
            Lmg: <br><input type="button" class="shopBtn" value="$2000" name="lmg" id="$2000"><br>
            Smg: <br><input type="button" class="shopBtn" value="$2000" name="smg" id="$2000"><br>
            Shotgun: <br><input type="button" class="shopBtn" value="$1000" name="shotgun" id="$1000">
        </div>`

    shopBtns = document.querySelectorAll(".shopBtn")


    for(let i = 0; i<shopBtns.length; i++){
        shopBtns[i].addEventListener("click", function(){
    
            let price = Number(shopBtns[i].value.split("").slice(1).join(""))
    
            if(player.money >= price){
                player.money -= price
                if(i<5) shopFunctions[i](price)
    
                else{
                    if(!stop){
                        weapons[shopBtns[i].name]()
                        shopBtns[i].id = "$0"
                        for(let k = 5; k < shopBtns.length; k++){
                            shopBtns[k].value = shopBtns[k].id
                        }
                        shopBtns[i].value = "SELECTED"
                    }                
                }
            }
        })
    }
}





