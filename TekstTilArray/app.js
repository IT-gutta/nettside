var output = document.getElementById("output")
var knapp = document.getElementById("submit")
var input = document.getElementById("input")
var arr = []
var verdi = ""


knapp.addEventListener("click", function() {
var verdi = input.value;
var verdiArr = verdi.split(" ");
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
