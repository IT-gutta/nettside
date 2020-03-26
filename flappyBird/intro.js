var knappEl = document.getElementById("knapp")
var inputEl = document.getElementById("navn")
var p = document.getElementById("p")


window.onload = function(){//om siden ikke finner et lagret navn må du skrive inn navnet ditt, hvis ikke blir du sendt til spillet
    if(window.localStorage.getItem("name") != null){
        location.href = "index.html"
    }
}

knappEl.onclick = function(){
    
        if(inputEl.value == ""){
            p.innerHTML = "Du må skrive inn navnet ditt for å spille"
        }
        else{
            var navn = inputEl.value
            window.localStorage.setItem("name",navn)
            location.href = "index.html"
        }
    }