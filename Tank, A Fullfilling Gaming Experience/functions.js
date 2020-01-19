const distance = (pos1, pos2) => Math.sqrt(Math.pow(pos2.x-pos1.x, 2) + Math.pow(pos2.y-pos1.y, 2))
const randomInt = (min, max) => Math.random()*(max-min)+min



function pauseMenu(){

    if(stop){
        backgroundMusic.volume = 0.04
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
        backgroundMusic.volume = 0.007
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

        overlay.style.cursor = "auto"
    }
    

}

function defaultSettings(){
    healthPotHeal = 300
    readyToShoot = true
    speedMultiple = 1
    wave = 8
    readyToStartNewWave = true
    weapons.pistol()
    shotGunShots = 20
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
    totalHealthPots = 0
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
        // document.querySelector("#pauseBtn").addEventListener("click", pauseMenu)
        window.addEventListener("keydown", pressDown)
    }
    defaultSettings()
    overlay.innerHTML = ""
    changeTank()
    changeGun()
    startShop()
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
    backgroundMusic.pause()
    overlay.style = ""
    overlay.innerHTML = `You lose <input type="button" class="restart" value="Restart?">`
    overlay.style.position = "absolute"
    overlay.style.fontSize = "40px"
    overlay.style.left = `${canvas.width/2-100}px`
    overlay.style.top = `${canvas.height/2-30}px`
    let restartBtn = document.querySelector(".restart")
    restartBtn.addEventListener("click", restart)
}


//single-fire
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
                bulletArr.push(new Bullet(player.pos.x + Math.cos(tempPhi)*(gunLength-35), player.pos.y + Math.sin(tempPhi)*(gunLength-35), Math.cos(tempPhi)*bulletSpeed + player.vel.x*0.25, Math.sin(tempPhi)*bulletSpeed + player.vel.y*0.25, bulletRadius, true, tempPhi, mode, bulletImg, b, baseDmg + addedDmg))
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
    if((tid-oldTime)*fireRate >= 1/fireRate){
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





