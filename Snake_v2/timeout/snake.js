const hode = document.getElementById('hode')
const hale = document.getElementById('hale')
const eple = document.getElementById('eple')
const poengsum_nå = document.querySelector('.poengsum_nå')
const table = document.querySelector('table')

function drawRotate(img, x, y, angle) {
  c.save()
  c.translate(x+scale/2, y+scale/2)
  c.rotate(angle)
  c.translate(-(x+scale/2), -(y+scale/2))
  c.drawImage(img, x, y, scale, scale)
  c.restore()
}

class Tail {
  constructor(){
    this.x=0;
    this.y=0;
  }
  draw() {
    c.drawImage(hale, this.x, this.y, scale, scale)
  }
}
class Snake {
    constructor(xs, ys) {
        this.x = 0
        this.y = 0
        this.xs = xs
        this.ys = ys
        this.tail = []
        this.total = 0
        this.angle = Math.PI/2
        this.direction = "Right"
    }

    draw() {
      drawRotate(hode, this.x, this.y, this.angle)
    }

    update() {
      if(this.x <0 || this.x>(cWidth-scale) || this.y < 0 || this.y > (cHeight-scale)){
        this.reset()
      }

      for (let i = 0; i < this.tail.length; i++) {
        if(this.x == this.tail[i].x && this.y == this.tail[i].y && this.tail.length > 2) {
          this.reset()
        }
      }

      for (let i = this.tail.length-1; i>0;  i--) {
        this.tail[i].x = this.tail[i-1].x
        this.tail[i].y = this.tail[i-1].y
        this.tail[i].draw()
      }

      if(this.tail.length) { 
      this.tail[0].x = this.x         
      this.tail[0].y = this.y     
      this.tail[0].draw()
    }
      if(this.xs > 0 && this.ys == 0) this.direction = "Right"
      if(this.xs < 0 && this.ys == 0) this.direction = "Left" 
      if(this.ys > 0 && this.xs == 0) this.direction = "Down"
      if(this.ys < 0 && this.xs == 0) this.direction = "Up"


        this.x += this.xs;
        this.y += this.ys;
    }

    reset() {
      if(this.total > 0) newScore(this.total)
        scoreboard()
      this.x = 0, this.y=0, this.xs = scale, this.ys = 0, this.tail = [], this.total = 0, this.angle = Math.PI / 2, poengsum_nå.innerHTML = `Din poengsum: ${this.total}`
    }

    changeDirection(direction){
        switch(direction) {
          case "Up":
            if(this.direction != "Down"){
            this.xs=0;
            this.ys=-scale*1;
            this.angle = 0
          }
            break;
          case "Down":
          if(this.direction != "Up"){
            this.xs=0;
            this.ys=scale*1;
            this.angle = Math.PI
          }
            break;
          case "Right":
          if(this.direction != "Left"){
            this.xs=scale*1;
            this.ys=0;
            this.angle = Math.PI/2
          }
            break;
            case "Left":
            if(this.direction != "Right"){
              this.xs=-scale*1;
              this.ys=0;
              this.angle = 1.5*Math.PI
            }
              break;
        }
      }

      eating(fruit) {
          if(this.x == fruit.x && this.y == fruit.y) {
            fruit.pickNewLocation()
            this.tail.push(new Tail())
            this.total +=1
            poengsum_nå.innerHTML = `Din poengsum: ${this.total}`
          }
      }
}

class Fruit {
    constructor() {
        this.pickNewLocation()
    }

    draw() {
        // c.fillStyle = "red"
        c.drawImage(eple, this.x, this.y, scale, scale)
        // c.fillRect(this.x, this.y, scale, scale)
        // c.fill()
    }

    pickNewLocation() {
        this.x = (Math.floor(Math.random()*cols))*scale
        this.y = (Math.floor(Math.random()*rows))*scale
    }
}



let scores = localStorage.getItem("scores") ? JSON.parse(localStorage.getItem("scores")) : [];

class Score {
  constructor(date, score) {
    this.date = date;
    this.score = score;
  }
}

function newScore(score) {
  let date = new Date().toLocaleString("no-NO")

  scores.push(new Score(date, score))
  localStorage.setItem('scores', JSON.stringify(scores))
}

function scoreboard() {
  scores.sort((a, b) => b.score - a.score);

  table.innerHTML = "";
  table.innerHTML += `
  <tr>
    <th>Dato</th>
    <th>Poengsum</th>
</tr>`

  for (let i = 0; i < scores.length; i++) {
    if(i == 10)return
      table.innerHTML += `
      <tr>
        <td>${scores[i].date}</td>
        <td>${scores[i].score}</td>
      </tr>
  `;
  }
  }
