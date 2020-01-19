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
            addedDmg = 0
        },
        function(){
            gunLength = 63
            gunImg.src = "sprites/bigGun2.png"
            addedDmg = 20
        },
        function(){
            gunLength = 56
            gunImg.src = "sprites/bigGun3.png"
            addedDmg = 50
        },
        function(){
            gunLength = 56
            gunImg.src = "sprites/bigGun4.png"
            addedDmg = 75
        },
        function(){
            gunLength = 65
            gunImg.src = "sprites/bigGun5.png"
            addedDmg = 120
        },
        function(){
            gunLength = 50
            gunImg.src = "sprites/bigGun6.png"
            addedDmg = 150
        },
        function(){
            gunLength = 59
            gunImg.src = "sprites/bigGun7.png"
            addedDmg = 200
        },
    ],
    big: [
        function(){
            gunLength = 63
            gunImg.src = "sprites/smallGun1.png"
            addedDmg = 0
        },
        function(){
            gunLength = 63
            gunImg.src = "sprites/smallGun2.png"
            addedDmg = 20
        },
        function(){
            gunLength = 56
            gunImg.src = "sprites/smallGun3.png"
            addedDmg = 50
        },
        function(){
            gunLength = 56
            gunImg.src = "sprites/smallGun4.png"
            addedDmg = 75
        },
        function(){
            gunLength = 65
            gunImg.src = "sprites/smallGun5.png"
            addedDmg = 120
        },
        function(){
            gunLength = 50
            gunImg.src = "sprites/smallGun6.png"
            addedDmg = 150
        },
        function(){
            gunLength = 59
            gunImg.src = "sprites/smallGun7.png"
            addedDmg = 200
        },
    ]
}