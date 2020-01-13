let player = {
    pos: {x: canvas.width/2, y: canvas.height/2},
    vel: {x:0, y:0},
    r: 14,
    health: 400,
    money: 0,
    carry: undefined,
    baseDmg: baseDmg,
    addedDmg: 0,
    color: "blue",
    angle: 0,
    
    draw: function(){
        c.beginPath()
        c.save()
        c.translate(this.pos.x, this.pos.y)
        c.rotate(this.angle)
        c.translate(-this.pos.x, -this.pos.y)
        c.drawImage(tankImg, 0, 0, 64, 64, this.pos.x-24, this.pos.y-24, 48, 48)
        c.restore()
        c.closePath()


        c.beginPath()
        let deltaX = mouse.x-this.pos.x
        let deltaY = mouse.y-this.pos.y
        let phi = Math.atan2(deltaY, deltaX)
        c.save()
        c.translate(this.pos.x, this.pos.y)
        c.rotate(phi - 3*Math.PI/2)
        c.translate(-this.pos.x, -this.pos.y)
        c.drawImage(gunImg, 0, 0, 128, 128, this.pos.x - 48, this.pos.y - gunLength, 96, 96)
        c.restore()
        c.closePath()
        
        if(playerIsCarrying){
            this.carry.pos.x = this.pos.x - Math.cos(phi)*pickupDistance
            this.carry.pos.y = this.pos.y - Math.sin(phi)*pickupDistance
        }

    },
    update: function(){
        player.baseDmg = baseDmg
        this.pos.x+=this.vel.x
        this.pos.y+=this.vel.y
        this.vel.x*=0.9
        this.vel.y*=0.9
<<<<<<< HEAD
        // if(controller.w) {if(speedReduction[0]){this.vel.y = -(speed-speedReduction[1])} else{this.vel.y = -speed}}
        // if(controller.s) {if(speedReduction[0]){this.vel.y = speed-speedReduction[1]} else{this.vel.y = speed}}
        // if(controller.d) {if(speedReduction[0]){this.vel.x = speed-speedReduction[1]} else{this.vel.x = speed}}
        // if(controller.a) {if(speedReduction[0]){this.vel.x = -(speed-speedReduction[1])} else{this.vel.x = -speed}}
=======


>>>>>>> de00e795628e9ab32381e1dc4d6dad734e63c6d8

        if(controller.w && !controller.s && !controller.d && !controller.a){
            this.angle = 0
        }
        else if(controller.w && controller.d && !controller.a && !controller.s){
            this.angle = Math.PI/4
        }
        else if(controller.w && controller.a && !controller.d && !controller.s){
            this.angle = -Math.PI/4
        }
        else if(controller.s && controller.a && !controller.d && !controller.w){
            this.angle = -3*Math.PI/4
        }
        else if(controller.s && controller.d && !controller.a && !controller.w){
            this.angle = 3*Math.PI/4
        }
        else if(controller.s && !controller.d && !controller.a && !controller.w){
            this.angle = Math.PI
        }
        else if(controller.a && !controller.d && !controller.s && !controller.w){
            this.angle = -Math.PI/2
        }
        else if(controller.d && !controller.a && !controller.s && !controller.w){
            this.angle = Math.PI/2
        }
        else if(controller.w && controller.s && !controller.a && !controller.d){
            this.angle = Math.PI
        }

<<<<<<< HEAD
=======

        if(controller.a || controller.s || controller.d || controller.w){
            this.vel.x = Math.cos(this.angle - Math.PI/2) * speed * speedMultiple
            this.vel.y = Math.sin(this.angle - Math.PI/2) * speed * speedMultiple
        }
        
        this.draw()
>>>>>>> de00e795628e9ab32381e1dc4d6dad734e63c6d8

        if(this.health <= 0){
            stop = true
            youLose()
        }

<<<<<<< HEAD
        if(controller.a || controller.s || controller.w || controller.d){
            this.vel.x = Math.cos(this.angle-Math.PI/2)*speed*speedReduction
            this.vel.y = Math.sin(this.angle-Math.PI/2)*speed*speedReduction
        }


        if(this.pos.x < this.r && !controller.d) this.vel.x = 0.01
        if(this.pos.x > canvas.width-this.r && !controller.a) this.vel.x = -0.01
        if(this.pos.y > canvas.height-this.r && !controller.w) this.vel.y = -0.01
        if(this.pos.y < this.r && !controller.s) this.vel.y = 0.01


        
        this.draw()
=======
        if(this.pos.x < this.r && controller.a) this.vel.x = 0.01
        if(this.pos.x > canvas.width-this.r && controller.d) this.vel.x = -0.01
        if(this.pos.y > canvas.height-this.r && controller.s) this.vel.y = -0.01
        if(this.pos.y < this.r && controller.w) this.vel.y = 0.01
>>>>>>> de00e795628e9ab32381e1dc4d6dad734e63c6d8
    }
}

let healthBar = {
    leftTop: {x: 450, y: 50},
    height: 25,
    startHealth: player.health,
    color: "red",

    draw: function(){
        c.beginPath()
        c.fillStyle = this.color
        c.fillRect(this.leftTop.x, this.leftTop.y, 400*(player.health/this.startHealth), this.height)
        c.strokeStyle = "grey"
        c.strokeRect(this.leftTop.x, this.leftTop.y, 400, this.height)
        c.fillStyle = "black"
        c.textAlign = "center"
        c.font = "20px monospace"
        c.fillText(`HP: ${player.health} / ${this.startHealth}`, this.leftTop.x + 200, this.leftTop.y-25)
        c.closePath()
    },

    update: function(){

    }
}

let controller = {
    w: false,
    a: false,
    d: false,
    s: false
}
let mouse = {
    x: canvas.width/2,
    y: canvas.height/2
}

let moneyBar = {
    draw: function(){
        c.fillStyle = "green"
        c.textAlign = "start"
        c.font = "25 px monospace"
        c.fillText(`$${player.money}`, canvas.width-125, 30)
    }
}


let healthPots = {
    antall: 0,
    draw: function(){
        c.drawImage(healthPotImg, 0, 0, healthPotImg.width, healthPotImg.height, canvas.width-175, 0, 32, 32)
        c.font = "20px monospace"
        c.fillStyle = "black"
        c.fillText(this.antall, canvas.width-175 + 32 - 10, 32)
    }
}




