let prevPos = player.pos
setInterval(function(){
    prevPos = player.pos
}, 1000)








setInterval(function(){
    tid+=0.01
}, 10)


function loop(){
    requestAnimationFrame(loop)
    if(hunterArr.length == 0 && readyToStartNewWave){
        wave += 1
        waves[wave-1]()
    }
    if(!stop){
        c.clearRect(0, 0, canvas.width, canvas.height)

        if(mouseIsPressed && (mode == "lmg" || mode == "smg")){
            spray()
        }
        

        for(let i = 0; i < splintArr.length; i++){
            splintArr[i].update()
            if(splintArr[i].dead){
                splintArr.splice(i, 1)
                i-=1
            }
        }


        //enemies alene og damage på player
        for(let i = 0; i<hunterArr.length; i++){
            for(let k = 0; k<hunterArr.length; k++){
                if(i!=k && distance(hunterArr[i].pos, hunterArr[k].pos) < hunterArr[i].r + hunterArr[k].r){
                    let deltaX = hunterArr[k].pos.x - hunterArr[i].pos.x
                    let deltaY = hunterArr[k].pos.y - hunterArr[i].pos.y
                    let phi = Math.atan2(deltaY, deltaX)
                    hunterArr[i].pos.x+= -Math.cos(phi)*pushAwayStrengt
                    hunterArr[i].pos.y+= -Math.sin(phi)*pushAwayStrengt
                    hunterArr[k].pos.x+= Math.cos(phi)*pushAwayStrengt
                    hunterArr[k].pos.y+= Math.sin(phi)*pushAwayStrengt
                }
            }
            
            if(distance(hunterArr[i].pos, player.pos) < player.r + hunterArr[i].r){
                damagedAudio.play()
                player.health -= 50
                let deltaX = player.pos.x - hunterArr[i].pos.x
                let deltaY = player.pos.y - hunterArr[i].pos.y
                let phi = Math.atan2(deltaY, deltaX)
                hunterArr[i].vel.x += -Math.cos(phi)*pushWhenHitStrength
                hunterArr[i].vel.y += -Math.sin(phi)*pushWhenHitStrength
                hunterArr[i].pos.x += hunterArr[i].vel.x
                hunterArr[i].pos.y += hunterArr[i].vel.y
                hunterArr[i].slowDown = true
                setTimeout(() => {
                    hunterArr[i].slowDown = false
                }, 2000);
            }
            hunterArr[i].update()
        }

        //alt med bullets
        for(let i = 0; i<bulletArr.length; i++){
            
            bulletArr[i].update()

            
            for(let k = 0; k<hunterArr.length; k++){
                if(distance(hunterArr[k].pos, bulletArr[i].pos) < bulletArr[i].r + hunterArr[k].r && bulletArr[i].connectedHunter != hunterArr[k]){
                    bulletArr[i].connectedHunter = hunterArr[k]
                    bulletArr[i].pierces += 1
                    hunterArr[k].health -= bulletArr[i].damage
                }
                if(hunterArr[k].health <=0){
                    if(hunterArr[k].constructor.name == "Sploder") hunterArr[k].explode()
                    
                    hunterArr.splice(k, 1)
                    k-=1
                    killCount += 1
                    player.money += moneyPerKill
                }
            }

            //splice bullets
            if(bulletArr[i].fallOff == true){
                if(distance(bulletArr[i].pos, bulletArr[i].startPos) > fallOffRange*0.25 && bulletArr[i].switch1) {bulletArr[i].damage -= 50; bulletArr[i].switch1 = false}
                if(distance(bulletArr[i].pos, bulletArr[i].startPos) > fallOffRange*0.7 && bulletArr[i].switch2) {bulletArr[i].damage -= 70; bulletArr[i].switch2 = false}
                if(distance(bulletArr[i].pos, bulletArr[i].startPos) > fallOffRange) {
                    bulletArr.splice(i, 1)
                    i-=1
                }
            }
            
            else if(bulletArr[i].pierces > pierces + basePierces){
                // [bulletArr[i], bulletArr[bulletArr.length-1]] = [bulletArr[bulletArr.length-1], bulletArr[i]]
                // bulletArr.pop()
                bulletArr.splice(i, 1)
                i-=1
            }

            else if(bulletArr[i].pos.x < 0 || bulletArr[i].pos.x > canvas.width || bulletArr[i].pos.y < 0 || bulletArr[i].pos.y > canvas.height){
                // [bulletArr[i], bulletArr[bulletArr.length-1]] = [bulletArr[bulletArr.length-1], bulletArr[i]]
                // bulletArr.pop()
                bulletArr.splice(i, 1)
                i-=1
            }

        }

        player.update()
        healthBar.draw()
        moneyBar.draw()
        healthPots.draw()
        c.font = "19px monospace"
        c.fillText(`Weapon: ${mode.toUpperCase()}  ::  Wave: ${wave}`, 20, 25)
        c.fillText(`Elapsed Time: ${Math.floor(tid)}  ::  Kills: ${killCount}`, 20, 75)
        c.drawImage(crosshair, 0, 0, 100, 100, mouse.x-8, mouse.y-8, 16, 16)

    }
}
loop()