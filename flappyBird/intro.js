var knappEl = document.getElementById("knapp")
var inputEl = document.getElementById("navn")
var p = document.getElementById("p")
var form = document.querySelector("form")

form.onsubmit = function(){
    location.href = "index.html"
    //om siden ikke finner et lagret navn må du skrive inn navnet ditt, hvis ikke blir du sendt til spillet
    if(window.localStorage.getItem("name") != null){
        location.href = "index.html"
    }
    else{
            var navn = inputEl.value
            window.localStorage.setItem("name",navn)
            location.href = "index.html"
        }
    }
