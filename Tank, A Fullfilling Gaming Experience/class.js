class Bullet{
    constructor(x, y, dx, dy, radius, fallOff, angle, mode, image, b, damage){
        this.pos = {x:x, y:y}
        this.startPos = {x:x, y:y}
        this.vel = {x:dx, y:dy}
        this.damage = damage
        this.r = radius
        this.pierces = 0
        this.connectedHunter = undefined
        this.fallOff = fallOff
        this.switch1 = true
        this.switch2 = true
        this.angle = angle
        this.mode = mode
        this.image = image
        this.b = {
            SX: b.SX,
            SY: b.SY,
            SW: b.SW,
            SH: b.SH,
            OX: b.OX,
            OY: b.OY,
            W: b.W,
            H: b.H
        }
    }
    update(){
        this.pos.x+=this.vel.x
        this.pos.y+=this.vel.y
        this.draw()
    }
    draw(){
        c.beginPath()
        c.save()
        c.translate(this.pos.x, this.pos.y)
        c.rotate(this.angle + Math.PI/2)
        c.translate(-this.pos.x, -this.pos.y)
        c.drawImage(this.image, this.b.SX, this.b.SY, this.b.SW, this.b.SH, this.pos.x + this.b.OX, this.pos.y + this.b.OY, this.b.W, this.b.H)
        c.restore()
    }
}

class Hunter{
    constructor(speed, health){
        this.pos = {x: Math.random() < 0.5 ? 0 : canvas.width, y: randomInt(0, canvas.height)}
        this.vel = {x: -5, y: 0}
        this.r = 10
        this.slowDown = false
        this.health = health
        this.startHealth = health
        this.speed = speed
        this.color = this.constructor.name == "Sploder" ? "yellow" : "red"
    }
    draw(){
        c.beginPath()
        c.fillStyle = this.color
        c.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI*2)
        c.fill()
        c.closePath()
        c.beginPath()
        c.strokeStyle = "green"
        c.moveTo(this.pos.x - 10, this.pos.y + 15)
        c.lineTo(this.pos.x - 10 + (this.health/this.startHealth)*20, this.pos.y + 15)
        c.lineWidth = 2
        c.stroke()
        c.closePath()
    }
    update(){
        let deltaX = prevPos.x-this.pos.x
        let deltaY = prevPos.y-this.pos.y
        let phi = Math.atan2(deltaY, deltaX)
        this.angle = Math.atan2(deltaY, deltaX)
        this.vel.x = Math.cos(phi)*this.speed
        this.vel.y = Math.sin(phi)*this.speed
        if(this.slowDown){
            this.pos.x += this.vel.x*0.3
            this.pos.y += this.vel.y*0.3
        }
        else{
            this.pos.x+=this.vel.x
            this.pos.y+=this.vel.y
        }

        this.draw()
    }
}

class Splint{
    constructor(x, y, dx, dy, r, color){
        this.pos = {x: x, y: y}
        this.startPos = {x: x, y: y}
        this.vel = {x:dx, y:dy}
        this.r = r
        this.color = color
        this.dead = false
        // setTimeout(() => {
        //     this.dead = true
        // }, 200)
    }
    draw(){
        c.beginPath()
        c.drawImage(splintImg, 0, 0, 1200, 1200, this.pos.x, this.pos.y, 8, 8)
        // c.fillStyle = this.color
        // c.arc(this.pos.x, this.pos.y, this.r, 0, 2*Math.PI)
        // c.fill()
        c.closePath()
    }
    update(){
        let randomOffsetRange = randomInt(-15, 15)
        if(distance(this.pos, this.startPos) > splodeRange + randomOffsetRange) this.dead = true
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
        if(!this.dead) this.draw()
    }
}

class Sploder extends Hunter{
    constructor(speed, health){
        super(speed, health)
    }
    explode(){
        let numberOfSplints = 0
        let splintInterval = setInterval(() => {
            numberOfSplints += 1
            splintAngle = randomInt(0, 2*Math.PI)
            splintArr.push(new Splint(this.pos.x, this.pos.y, Math.cos(splintAngle) * splintSpeed, Math.sin(splintAngle) * splintSpeed, 10, "white"))
            if(numberOfSplints > 100) clearInterval(splintInterval)
        }, 5)
    
        
        //deal damage to other enemies
        for(let i = 0; i < hunterArr.length; i++){
            if(distance(hunterArr[i].pos, this.pos) < hunterArr[i].r + splodeRange){
                hunterArr[i].health -= splodeDamage
            }
        }
        
        //deal damage to player
        if(distance(player.pos, this.pos) < player.r + splodeRange){
            player.health -= splodeDamage
        }
    }
}



class Pickup{
    constructor(x, y, ID, color){
        this.pos = {x:x, y:y}
        this.r = 15
        this.ID = ID
        this.color = color
    }
    draw(){
        c.beginPath()
        c.fillStyle = this.color
        c.arc(this.pos.x, this.pos.y, this.r, 0, 2*Math.PI)
        c.fill()
    }
    update(){
        if(!playerIsCarrying && distance(this, player) < this.r + player.r){
            playerIsCarrying = true
            player.carry = this
        }
        this.draw()
    }
}