let URL = "https://nettside-api-v2.herokuapp.com/"

// console.log(fetch("https://reqres.in/api/users"))
// fetch(URL + 'ratings')
// .then(res => res.json())
// .then(data => console.log(data))

fetch('https://nettside-api-v2.herokuapp.com/new_user', {
  method: 'post',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({name: "Ola"})
}).then(res=>res.text())
  .then(res => console.log(res));