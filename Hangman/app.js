var canvas = document.getElementById("mittcanvas");
var ctx = canvas.getContext("2d");
var knapp = document.getElementById("knapp")
var input = document.getElementById("input")
var feilBokstav = document.getElementById("feilBokstav")
var ordLengde = document.getElementById("ordLengde")
var ordListe = ["Gestikulere ", "Diametralt ", "Lapidarisk ", "Kontaminering ", "Digresjon", "Provisorisk ", "Persepsjon ", "Paradoks ", "Implisitt ", "Omkalfatrere"]
var tilfeldig = Math.floor(Math.random() * ordListe.length)
var utvalgtOrd = ordListe[tilfeldig]
console.log(utvalgtOrd)
var antallRiktige = 0;
var ordLengdeArr = []
var gjettaBokstav = ""
var verdi = 0;
var feil = 0;

knapp.addEventListener("click", function() {
  gjettaBokstav = input.value
  for (var i = 0; i < utvalgtOrd.length; i++) {
    if (utvalgtOrd[i] == gjettaBokstav) {
      ordLengdeArr.splice(i, 1)
      ordLengdeArr.splice(i, 0, gjettaBokstav)
      console.log(ordLengdeArr)
      ordLengde.innerHTML = ordLengdeArr.join(" ")
      verdi++
    } else {
      if (i == utvalgtOrd.length - 1 && verdi == 0) {
        feilBokstav.innerHTML += gjettaBokstav + ", "
        feil++
        switch (feil) {
          case 1:
            head();
            break;
          case 2:
            body();
            break;
          case 3:
            leftHand();
            break;
          case 4:
            rightHand();
            break;
          case 5:
            leftFoot();
            break;
          case 6:
            rightFoot();
            break;
          case 7:
            leftEye();
            break;
          case 8:
            rightEye();
            break;
          case 9:
            mouth();
            break;
          case 10:
            nose();
            break;
        }
      }
    }
    }
    if (feil == 10) {
      spillSlutt()
  }
    if(verdi == utvalgtOrd.length)
      spillSeier();
  })

function spillSlutt() {
  setTimeout(function(){
    document.getElementById("innpakning").style.display = "none";
    document.getElementById("spillSlutt").style.display = "block";
    document.getElementById("spillSlutt").innerHTML += "Du tapte LOL! Ordet var " + utvalgtOrd}, 500)

}

function spillSeier() {
  document.getElementById("innpakning").style.display = "none";
  document.getElementById("spillSlutt").style.display = "block";
  document.getElementById("spillSlutt").innerHTML += "Du vant, gratulerer så mye!!"
}





function ordL() {
  for (var i = 0; i < utvalgtOrd.length; i++) {
    ordLengdeArr.push("_");
  }
  ordLengde.innerHTML = ordLengdeArr.join(" ")

}
ordL("h");

function inputTest() {

}





function structure() {
  ctx.beginPath();
  ctx.moveTo(100, 320);
  ctx.lineTo(100, 300);
  ctx.lineTo(500, 300);
  ctx.lineTo(500, 320);
  ctx.moveTo(200, 300);
  ctx.lineTo(200, 20);
  ctx.lineTo(350, 20);
  ctx.lineTo(350, 50);
  ctx.moveTo(200, 50)
  ctx.lineTo(230, 20)
  ctx.lineWidth = 5
  ctx.stroke();
}
// Hode
function head() {
  ctx.beginPath();
  ctx.moveTo(375, 75);
  ctx.arc(350, 75, 25, 0, 2 * Math.PI);
  ctx.lineWidth = 5
  ctx.stroke();
}
// Kropp

function body() {
  ctx.beginPath();
  ctx.moveTo(350, 100);
  ctx.lineTo(350, 230);
  ctx.lineWidth = 5
  ctx.stroke();
}
// Føtter
function rightFoot() {
  ctx.beginPath();
  ctx.moveTo(350, 230);
  ctx.lineTo(400, 270);
  ctx.lineWidth = 5
  ctx.stroke();
}

function leftFoot() {
  ctx.beginPath();
  ctx.moveTo(350, 230);
  ctx.lineTo(300, 270);
  ctx.lineWidth = 5
  ctx.stroke();
}
// Hender
function leftHand() {
  ctx.beginPath();
  ctx.moveTo(350, 125);
  ctx.lineTo(400, 175);
  ctx.lineWidth = 5
  ctx.stroke();
}

function rightHand() {
  ctx.beginPath();
  ctx.moveTo(350, 125);
  ctx.lineTo(300, 175);
  ctx.lineWidth = 5
  ctx.stroke();
}
// //øye 1
function leftEye() {
  ctx.beginPath();
  ctx.moveTo(342, 70);
  ctx.arc(337, 70, 5, 0, 2 * Math.PI);
  ctx.lineWidth = 5
  ctx.stroke();
}
// øye 2
function rightEye() {
  ctx.beginPath();
  ctx.moveTo(366, 70);
  ctx.arc(361, 70, 5, 0, 2 * Math.PI);
  ctx.lineWidth = 5
  ctx.stroke();
}
// munn
function mouth() {
  ctx.beginPath();
  ctx.moveTo(355, 86);
  ctx.arc(350, 86, 5, 0, Math.PI);
  ctx.lineWidth = 5
  ctx.stroke();
}

// nese
function nose() {
  ctx.beginPath();
  ctx.moveTo(351, 79);
  ctx.arc(350, 79, 1, 0, 2 * Math.PI);
  ctx.lineWidth = 5
  ctx.stroke();
}

structure();


  // Execute a function when the user releases a key on the keyboard
  input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      knapp.click();
      // Empty the input element
      input.value = "";
    }
  })
