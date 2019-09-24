// var alphS = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
// var alphB = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
// var wordArr = ["abcdef", "abcef", "jklmno", "lmnop"];
// var numArr = [
//   [0, 1, 2, 3, 4, 5],
//   [0, 1, 2, 4, 5],
//   [9, 10, 11, 12, 13, 14]
//   [11, 12, 13, 14, 15]
// ];
//
// function sorter(word) {
//   var wordNumArr = []
//   var index = 0;
//
//   for (var x = 0; x < word.length; x++) {
//     wordNumArr.push(alphS.indexOf(word[x]))}
//
// findIndex(wordNumArr)
//
// console.log(index)
//
// wordArr.splice(index, 0, word)
// numArr.splice(index, 0, wordNumArr)
// }
//
// function findIndex(wordNumArr, index){
//   if (wordArr.length != 0) {
//
//     for (var i = 0; i < numArr.length-1; i++) {
//
//       for (var k = 0; k < wordNumArr.length; k++) {
//         if (wordNumArr[k] < numArr[i][k]) {return index}
//         else if (wordNumArr[k] >= numArr[i][k]) {break}
//
//
//       }
//       index++
//
//     }
//
//
//   }
//   return index;
// }
//
//
// sorter("dkajsdkasjdjalj");
// console.log(wordArr);


var oppskriftArr = [];


var input = document.getElementById("oppskrift");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("knapp").click();
  }
});

var input = document.getElementById("oppskrift");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("knapp2").click();
  }
});

function oppskriftPush(oppskrift) {
  var oppskrift = document.getElementById("oppskrift").value;
  if(oppskrift != "" && oppskrift != " " && oppskrift != "  "){
  oppskrift = oppskrift.toUpperCase();
  oppskriftArr.push(oppskrift);
  oppskriftArr.sort();
  document.getElementById("oppskrift").value = "";
  return oppskriftArr;
}}

function presenterHTML() {
  document.getElementById("paragraf").innerHTML="";
  var p = document.getElementById("paragraf")
  for (var i = 0; i < oppskriftArr.length; i++) {
    p.innerHTML += "<li>" + oppskriftArr[i] + "</li>"
  }
}
