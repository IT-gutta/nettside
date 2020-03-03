const URL = "https://nettside-api-v2.herokuapp.com"


async function post_rating(name,score) {
    fetch_obj = {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name, score: score})
        }

    const response = await fetch(URL + "/new_rating", fetch_obj)
    const text = await response.text()
    console.log(text)
}

post_rating("TEST123", 4000).catch(err=>console.log(err))