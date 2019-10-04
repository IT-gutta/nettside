var musikk = document.getElementById("musikk")
var sport = document.getElementById("sport")
var spill = document.getElementById("spill")
var blandet = document.getElementById("blandet")
var lett = document.getElementById("lett")
var middels = document.getElementById("middels")
var vanskelig = document.getElementById("vanskelig")
var arrsett = []
var utvalgtOrd = ""
var musikkArr = [
  ["tuBa", "Gitar", "pIanO"],
  ["fløyte", "bariton", "klarinett"],
  ["valthorn", "tverrfløyte", "trekkbasun"]
]
var sportArr = [
  ["fotball", "håndball", "tennis"],
  ["Liverpool", "Cristiano Ronaldo", "Nora Mørk"],
  ["Leeds", "George Best", "Robertson"]
]
var spillArr = [
  ["Mario", "Tetris", "Playstation"],
  ["Ratchet", "Snake"],
  ["Gamecube Test1 test2 haha1 olala3"]
]
var blandetArr = [
  ["Fredrikstad"],
  ["Bjørk"],
  ["Digresjon", "Provisorisk ", "Persepsjon"]
]

document.getElementById("innpakning").style.display = "none"
document.getElementById("vanskelighetsDiv").style.display = "none"

var canvas = document.getElementById("mittcanvas");
var ctx = canvas.getContext("2d");
var knapp = document.getElementById("knapp")
var input = document.getElementById("input")
var feilBokstav = document.getElementById("feilBokstav")
var ordLengde = document.getElementById("ordLengde")
var ordLengdeArr = []
var ordLengdeArrSpace = []
var gjettaBokstav = ""
var sjanserIgjen = 10;
var bruktFørR = []
var bruktFørF = []

function timedMelding(melding) {
  setTimeout(function() {
    feilBokstav.innerHTML = "Ordet inneholder ikke: "
  }, 1500)
  feilBokstav.innerHTML = "<b>" + melding + "</b>"
}

function ordL() {
  for (var i = 0; i < utvalgtOrd.length; i++) {
    if (utvalgtOrd[i] == " ") {
      ordLengdeArrSpace.push("&nbsp")
    } else {
      ordLengdeArrSpace.push("_")
    }
    ordLengdeArr.push("_");
  }
  ordLengde.innerHTML = ordLengdeArrSpace.join(" ")
}

function main() {
  knapp.addEventListener("click", function() {
    gjettaBokstav = input.value

    if (gjettaBokstav.toUpperCase() == utvalgtOrd.toUpperCase()) {
      spillSeier()
    }

    if (gjettaBokstav.length != 1 && gjettaBokstav.length != utvalgtOrd.length) {
      return timedMelding("Du kan kun gjette en bokstav eller hele ordet!")
    }



    if (utvalgtOrd.indexOf(gjettaBokstav.toUpperCase()) != -1 || utvalgtOrd.indexOf(gjettaBokstav.toLowerCase()) != -1) {
      if (bruktFørR.indexOf(gjettaBokstav.toUpperCase()) != -1 || bruktFørR.indexOf(gjettaBokstav.toLowerCase()) != -1) {
        return timedMelding("Den bokstaven eller det ordet har du allerede gjettet!")
      } else {
        bruktFørR.push(gjettaBokstav)
      }

      for (var i = 0; i < utvalgtOrd.length; i++) {

        if (utvalgtOrd[i].toLowerCase() == gjettaBokstav || utvalgtOrd[i].toUpperCase() == gjettaBokstav) {
          ordLengdeArr[i] = utvalgtOrd[i];
          ordLengdeArrSpace[i] = utvalgtOrd[i];

          ordLengde.innerHTML = ordLengdeArrSpace.join("&nbsp")
        }
      }
    } else {
      if (bruktFørF.indexOf(gjettaBokstav.toUpperCase()) != -1 || bruktFørF.indexOf(gjettaBokstav.toLowerCase()) != -1) {
        return timedMelding("Prøv en bokstav eller ord du ikke har prøvd før")
      } else {
        bruktFørF.push(gjettaBokstav)
        feilBokstav.innerHTML = bruktFørF.join(" ")
      }
      sjanserIgjen--
      switch (sjanserIgjen) {
        case 9:
          tegn.head();
          break;
        case 8:
          tegn.body();
          break;
        case 7:
          tegn.leftHand();
          break;
        case 6:
          tegn.rightHand();
          break;
        case 5:
          tegn.leftFoot();
          break;
        case 4:
          tegn.rightFoot();
          break;
        case 3:
          tegn.leftEye();
          break;
        case 2:
          tegn.rightEye();
          break;
        case 1:
          tegn.mouth();
          break;
        case 0:
          tegn.nose();
          spillSlutt()
          break;
      }
    }
    if (ordLengdeArr.indexOf("_") == -1) {
      spillSeier()
    }
  })
}

function spillSlutt() {
  setTimeout(function() {
    document.getElementById("innpakning").style.display = "none";
    document.getElementById("spillSlutt").style.display = "block";
    document.getElementById("splillSluttMelding").innerHTML += "<br>" + "Du tapte. Ordet var " + "<b>" + "'" + utvalgtOrd + "'" + "</b>"
  }, 500)

}

function spillSeier() {
  document.getElementById("innpakning").style.display = "none";
  document.getElementById("spillSlutt").style.display = "block";
  document.getElementById("splillSluttMelding").innerHTML += "Du vant, gratulerer så mye!!"
}

var tegn = {

  structure: function() {
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
  },

  head: function() {
    ctx.beginPath();
    ctx.moveTo(375, 75);
    ctx.arc(350, 75, 25, 0, 2 * Math.PI);
    ctx.lineWidth = 5
    ctx.stroke();
  },

  body: function() {
    ctx.beginPath();
    ctx.moveTo(350, 100);
    ctx.lineTo(350, 230);
    ctx.lineWidth = 5
    ctx.stroke();
  },

  rightFoot: function() {
    ctx.beginPath();
    ctx.moveTo(350, 230);
    ctx.lineTo(400, 270);
    ctx.lineWidth = 5
    ctx.stroke();
  },

  leftFoot: function() {
    ctx.beginPath();
    ctx.moveTo(350, 230);
    ctx.lineTo(300, 270);
    ctx.lineWidth = 5
    ctx.stroke();
  },

  leftHand: function() {
    ctx.beginPath();
    ctx.moveTo(350, 125);
    ctx.lineTo(400, 175);
    ctx.lineWidth = 5
    ctx.stroke();
  },

  rightHand: function() {
    ctx.beginPath();
    ctx.moveTo(350, 125);
    ctx.lineTo(300, 175);
    ctx.lineWidth = 5
    ctx.stroke();
  },

  leftEye: function() {
    ctx.beginPath();
    ctx.moveTo(342, 70);
    ctx.arc(337, 70, 5, 0, 2 * Math.PI);
    ctx.lineWidth = 5
    ctx.stroke();
  },

  rightEye: function() {
    ctx.beginPath();
    ctx.moveTo(366, 70);
    ctx.arc(361, 70, 5, 0, 2 * Math.PI);
    ctx.lineWidth = 5
    ctx.stroke();
  },

  mouth: function() {
    ctx.beginPath();
    ctx.moveTo(355, 86);
    ctx.arc(350, 86, 5, 0, Math.PI);
    ctx.lineWidth = 5
    ctx.stroke();
  },

  nose: function() {
    ctx.beginPath();
    ctx.moveTo(351, 79);
    ctx.arc(350, 79, 1, 0, 2 * Math.PI);
    ctx.lineWidth = 5
    ctx.stroke();
  }
}

tegn.structure();

input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    knapp.click();
    input.value = "";
  }
})

function katF(kategori, array) {
  kategori.addEventListener("click", function() {
    document.getElementById("kategoriDiv").style.display = "none"
    document.getElementById("vanskelighetsDiv").style.display = "grid"
    arrsett = array.slice(0)
  })
}

function vanskF(grad, nummer) {
  grad.addEventListener("click", function() {
    document.getElementById("vanskelighetsDiv").style.display = "none"
    document.getElementById("innpakning").style.display = "block"
    utvalgtOrd = arrsett[nummer][Math.floor(Math.random() * arrsett[nummer].length)]
    console.log(utvalgtOrd)
    main()
    ordL();
  })
}


katF(musikk, musikkArr)
katF(sport, sportArr)
katF(blandet, blandetArr)
katF(spill, spillArr)
vanskF(lett, 0)
vanskF(middels, 1)
vanskF(vanskelig, 2)

// musikk.addEventListener("click", function() {
//   document.getElementById("kategoriDiv").style.display = "none"
//   document.getElementById("vanskelighetsDiv").style.display = "block"
//   arrsett = musikkArr.slice(0)
// })
// sport.addEventListener("click", function() {
//   document.getElementById("kategoriDiv").style.display = "none"
//   document.getElementById("vanskelighetsDiv").style.display = "block"
//   arrsett = sportArr.slice(0)
// })
// spill.addEventListener("click", function() {
//   document.getElementById("kategoriDiv").style.display = "none"
//   document.getElementById("vanskelighetsDiv").style.display = "block"
//   arrsett = spillArr.slice(0)
// })
// blandet.addEventListener("click", function() {
//   document.getElementById("kategoriDiv").style.display = "none"
//   document.getElementById("vanskelighetsDiv").style.display = "block"
//   arrsett = blandetArr.slice(0)
//   console.log(arrsett)
// })
// lett.addEventListener("click", function() {
//   document.getElementById("vanskelighetsDiv").style.display = "none"
//   document.getElementById("innpakning").style.display = "block"
//   utvalgtOrd = arrsett[0][Math.floor(Math.random() * arrsett[0].length)]
//   console.log(utvalgtOrd)
//   main()
//   ordL();
// })
// middels.addEventListener("click", function() {
//   document.getElementById("vanskelighetsDiv").style.display = "none"
//   document.getElementById("innpakning").style.display = "block"
//   utvalgtOrd = arrsett[1][Math.floor(Math.random() * arrsett[1].length)]
//   console.log(utvalgtOrd)
//   main()
//   ordL();
// })
// vanskelig.addEventListener("click", function() {
//   document.getElementById("vanskelighetsDiv").style.display = "none"
//   document.getElementById("innpakning").style.display = "block"
//   utvalgtOrd = arrsett[2][Math.floor(Math.random() * arrsett[2].length)]
//   console.log(utvalgtOrd)
//   main();
//   ordL();
// })
