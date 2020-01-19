
let weapons = {
    pistol: function(){
        mode = "pistol"
        bulletSpeed = 8
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
        bulletSpeed = 6.5
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
        basePierces = 8
        baseDmg = 200
        fireRate = 2
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
        bulletSpeed = 14
        bulletRadius = 2.5
        basePierces = 2
        baseDmg = 150
        fireRate = 2
        bloom = Math.PI/10
        speedMultiple = 1.2
        bulletImg = pistolBullet
        b = {
            SX: 0,
            SY: 0,
            SW: 256,
            SH: 512,
            OX: -4,
            OY: -11,
            W: 256/30,
            H: 512/30
        }
    }
}
