class Bullet{
    constructor(x, y, dx, dy, radius, fallOff, angle, mode, image, b){
        this.pos = {x:x, y:y}
        this.startPos = {x:x, y:y}
        this.vel = {x:dx, y:dy}
        this.r = radius
        this.pierces = 0
        this.connectedHunter = undefined
        this.fallOff = fallOff
        this.reducedDmg = 0
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
        if(this.mode != "shotgun") c.drawImage(this.image, this.b.SX, this.b.SY, this.b.SW, this.b.SH, this.pos.x + this.b.OX, this.pos.y + this.b.OY, this.b.W, this.b.H)
        c.restore()
        if(this.mode == "shotgun"){
            c.fillStyle = "blue"
            c.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI*2)
            c.fill()
            c.closePath()
        }
        // c.fillStyle = "blue"
        // c.arc(this.pos.x, this.pos.y, this.r, 0, 2*Math.PI)
        // c.fill()
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
    }
    draw(){
        c.beginPath()
        c.fillStyle="red"
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
        this.pos = {x:x, y:y}
        this.vel = {dx:dx, dy:dy}
        this.r = r
        this.color = color
    }
    draw(){
        c.beginPath()
        c.fillStyle = this.color
        c.arc(this.pos.x, this.pos.y, this.r, 0, 2*Math.PI)
        c.fill()
        c.closePath()
    }
    update(){
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
        this.draw()
    }
}

class Sploder extends Hunter{
    constructor(speed, health, text){
        super(speed, health)
        this.splintArr = [text]
    }
    explode(){
        for(let i = 0; i < 50; i++){
            let splintAngle = Math.random()*2*Math.PI
            this.splintArr.push(new Splint(this.pos.x, this.pos.y, Math.cos(splintAngle) * splintSpeed, Math.sin(splintAngle) * splintSpeed, 4, "black"))
        }
        for(let i = 0; i < hunterArr.length; i++){
            if(distance(hunterArr[i].pos, this.pos) < hunterArr[i].r + splodeRange){
                hunterArr[i].health -= splodeDamage
            }
        }
        if(distance(player.pos, this.pos) < player.r + splodeRange){
            player.health -= splodeDamage
        }
    }
    drawSplints(){
        this.splintArr.forEach(splint => {
            splint.update()
        })
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