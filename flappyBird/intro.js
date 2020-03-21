var knappEl = document.getElementById("knapp")
var inputEl = document.getElementById("navn")
var p = document.getElementById("p")

knappEl.onclick = function(){
    //om siden ikke finner et lagret navn må du skrive inn navnet ditt, hvis ikke blir du sendt til spillet
    if(window.localStorage.getItem("name") == null){


    if(inputEl.value == ""){
        p.innerHTML = "Du må skrive inn navnet ditt for å spille"
    }
    else{
        var navn = inputEl.value
        window.localStorage.setItem("name",navn)
        location.href = "index.html"
    }

}
    else{
        location.href = "index.html"
    }
}