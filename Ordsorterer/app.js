let sorted = [];
const input = document.getElementById("oppskrift");
let current = document.getElementById("oppskrift")
const p = document.getElementById("paragraf")
let knapper = document.querySelectorAll(".test")
let test3 = document.querySelector("h1")


input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    push()
    presenterHTML()
  }
});

function push(oppskrift) {
  oppskrift = current.value
  if(oppskrift != "" && oppskrift != " " && oppskrift != "  "){
  oppskrift = oppskrift.toUpperCase();
  sorted.push(oppskrift);
  sorted.sort();
  document.getElementById("oppskrift").value = "";
  return sorted;
}}

function presenterHTML() {
  p.innerHTML="";
  for (var i = 0; i < sorted.length; i++) {
    p.innerHTML += `<li class='liste liste${i}'>${sorted[i]}</li>`
  }
  liste = document.querySelectorAll(".liste")
  console.log(liste)
  for (let j = 0; j < liste.length; j++) {
    liste[j].addEventListener("click", function(){
      let midlertidig = document.querySelector(`.liste${j}`)
      midlertidig.parentNode.removeChild(midlertidig)
    })
  }
  // createSubHeader() Hei
}


// let createSubHeader = () => {
//   for (let x = 0; x < liste.length; x++) {
//     if(liste[x].innerText[0]){
//       p.innerHTML += `<li class='${liste[x][0]}'>${liste[x].innerText[0]} dette er en overskrift</li>`
//   }
// }}
