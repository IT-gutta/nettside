const input = document.getElementById("oppskrift");
const p = document.getElementById("paragraf")
let nogreier = false;
let sorted = []
// Oppdaterer lista ift localstorage
let unsorted = localStorage.getItem('unsorted') ? JSON.parse(localStorage.getItem('unsorted')) : []
localStorage.setItem('unsorted', JSON.stringify(unsorted))
sorted = [...unsorted]
sorted.sort()
p.innerHTML = "";
for (var i = 0; i < sorted.length; i++) {
  p.innerHTML += `<li class='liste liste${i}' onclick="fjernElem(${i})">${sorted[i]}</li>`
}
// ---------------- //

input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    push()
    presenterHTML()
  }
});

window.onload = input.focus()

// p.addEventListener("click", function () {
//   if (unsorted.length) {
//     unsorted.pop()
//     localStorage.setItem('unsorted', JSON.stringify(unsorted))
//     sorted = [...unsorted]
//     sorted.sort()
//     p.innerHTML = "";
//     for (var i = 0; i < sorted.length; i++) {
//       p.innerHTML += `<li class='liste liste${i}'>${sorted[i]}</li>`
//     }
//   }
// })

function push(oppskrift) {
  oppskrift = input.value
  if (oppskrift != "" && oppskrift != " " && oppskrift != "  ") {
    oppskrift = oppskrift.toUpperCase();
    unsorted.push(oppskrift);
    localStorage.setItem('unsorted', JSON.stringify(unsorted))
    sorted = [...unsorted]
    sorted.sort()
    console.log(sorted)
    // console.log(unsorted)
    input.value = "";
    return sorted;
  }
}

function presenterHTML() {
  p.innerHTML = "";
  for (var i = 0; i < sorted.length; i++) {
    p.innerHTML += `<li class='liste liste${i}' onclick="fjernElem(${i})">${sorted[i]}</li>`
  }
}

let fjernElem = (num) => {
  if(confirm(`Er du sikker på at du vil slette ordet ${sorted[num]}?`)){
  sorted.splice(num, 1)
  unsorted = [...sorted]
  localStorage.setItem('unsorted', JSON.stringify(unsorted))
  sorted = [...unsorted]
  sorted.sort()
  p.innerHTML = ""
  for (var i = 0; i < sorted.length; i++) {
    p.innerHTML += `<li class='liste liste${i}' onclick="fjernElem(${i})">${sorted[i]}</li>`
}
}}

document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.key === 'z' && unsorted.length != 0) {
    unsorted.pop()
    localStorage.setItem('unsorted', JSON.stringify(unsorted))
    sorted = [...unsorted]
    sorted.sort()
    p.innerHTML = "";
    for (var i = 0; i < sorted.length; i++) {
      p.innerHTML += `<li class='liste liste${i}' onclick="fjernElem(${i})">${sorted[i]}</li>`

    }
  }
})


// Hvis man fjerner nest siste så siste funker det ikke

// let createSubHeader = () => {
//   for (let x = 0; x < liste.length; x++) {
//     if(liste[x].innerText[0]){
//       p.innerHTML += `<li class='${liste[x][0]}'>${liste[x].innerText[0]} dette er en overskrift</li>`
//   }
// }}

document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.key == "Delete") {
    console.log("sletter")
    p.innerHTML = ""
    sorted = []
    unsorted = []
    localStorage.setItem('unsorted', JSON.stringify(unsorted))
  }
})
