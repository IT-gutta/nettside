let sorted = [];
let unsorted = []
const input = document.getElementById("oppskrift");
const p = document.getElementById("paragraf")
let nogreier = false;

input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    push()
    presenterHTML()
    // fjernElem()
  }
});

window.onload = input.focus()

function push(oppskrift) {
  oppskrift = input.value
  if (oppskrift != "" && oppskrift != " " && oppskrift != "  ") {
    oppskrift = oppskrift.toUpperCase();
    unsorted.push(oppskrift);
    sorted = [...unsorted]
    sorted.sort()
    console.log(sorted)
    console.log(unsorted)
    input.value = "";
    return sorted;
  }
}

function presenterHTML() {
  p.innerHTML = "";
  for (var i = 0; i < sorted.length; i++) {
    p.innerHTML += `<li class='liste liste${i}'>${sorted[i]}</li>`
  }
}


document.addEventListener('keydown', function(event) {
      if (event.ctrlKey && event.key === 'z' && unsorted.length != 0) {
        unsorted.pop()
        sorted = [...unsorted]
        sorted.sort()
        p.innerHTML = "";
        for (var i = 0; i < sorted.length; i++) {
          p.innerHTML += `<li class='liste liste${i}'>${sorted[i]}</li>`

        }
      }})
    //   function fjernElem(){
    //   liste = document.querySelectorAll(".liste")
    //   for (let j = 0; j < liste.length; j++) {
    //     liste[j].addEventListener("click", function(){
    //       liste[j].parentNode.removeChild(liste[j])
    //       sorted.splice(j, 1)
    //       liste = document.querySelectorAll(".liste")
    //       console.log(liste)
    //       console.log(sorted)
    //
    //     })
    //   }
    //   console.log(sorted)
    //
    // }



    // Hvis man fjerner nest siste så siste funker det ikke

    // let createSubHeader = () => {
    //   for (let x = 0; x < liste.length; x++) {
    //     if(liste[x].innerText[0]){
    //       p.innerHTML += `<li class='${liste[x][0]}'>${liste[x].innerText[0]} dette er en overskrift</li>`
    //   }
    // }}
