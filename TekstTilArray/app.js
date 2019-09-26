const output = document.getElementById("output")
const knapp = document.getElementById("submit")
const input = document.getElementById("input")
const dividerIn = document.getElementById("dividerIn")
const dividerBt = document.getElementById("dividerBt")
var arr = []
var verdi = ""
var dividerx = ""


dividerBt.addEventListener("click", function() {
  return dividerx = dividerIn.value
}
)

knapp.addEventListener("click", function() {
verdi = input.value;
var verdiArr = verdi.split(dividerx);
output.innerHTML= "["
for (var i = 0; i < verdiArr.length; i++) {
if(verdiArr.indexOf(verdiArr[i]) == verdiArr.length-1) {
  output.innerHTML+= '"' + verdiArr[i] + '"' }
else {
  output.innerHTML+= '"' + verdiArr[i] + '"' + ', ' }
}
output.innerHTML+="]"
}
)
