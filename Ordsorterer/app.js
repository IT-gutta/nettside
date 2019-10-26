// Konstanter og ofte brukte linjer m/ kode
const input = document.querySelector('.input-felt')
window.onload = input.focus()
const p = document.getElementById("paragraf")
let sorted = []
let unsorted = localStorage.getItem('unsorted') ? JSON.parse(localStorage.getItem('unsorted')) : []
let sorter = () => {sorted.sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'}))}
let setitem = () => localStorage.setItem('unsorted', JSON.stringify(unsorted))
let presenterHTML = () =>{
  p.innerHTML = "";
  for (var i = 0; i < sorted.length; i++) {
    p.innerHTML += `<li onclick="fjernElem(${i})">${sorted[i]}</li>`
  }
}



// Oppdaterer lista ift localstorage
setitem()
sorted = [...unsorted]
sorter()
presenterHTML()

input.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    push()
    presenterHTML()
  }
});


let push = (ord) => {
  ord = input.value
  if (ord != "" && ord != " " && ord != "  ") {
    unsorted.push(ord);
    setitem()
    sorted = [...unsorted]
    sorter()
    input.value = "";
    return sorted;
  }
}

let fjernElem = (num) => {
  if (confirm(`Er du sikker på at du vil slette ordet ${sorted[num]}?`)) {
    sorted.splice(num, 1)
    unsorted = [...sorted]
    setitem()
    sorted = [...unsorted]
    sorter()
    presenterHTML()
  }
}

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key === 'z' && unsorted.length != 0) {
    unsorted.pop()
    setitem()
    sorted = [...unsorted]
    sorter()
    presenterHTML()
  }
})

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key == "Delete" && sorted.length) {
    if (confirm(`Er du sikker på at du vil slette alle ordene fra listen?`)) {
      p.innerHTML = ""
      sorted = []
      unsorted = []
      setitem()
    }
  }
})