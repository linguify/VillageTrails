let token = sessionStorage.getItem("token")
let userId = sessionStorage.getItem("user")
let addressinput = document.getElementById("addressinput")
let descinput = document.getElementById("descinput")
let stateinput = document.getElementById("stateinput")
let priceinput = document.getElementById("priceinput")

function createListing(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "token "+token);

    var raw = JSON.stringify({
        "name": addressinput.value,
        "description": descinput.value,
        "cost": priceinput.value,
        "state": stateinput.value,
        "hostId":userId
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/villagetrails/v1/listing/", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            window.location.href="http://127.0.0.1/tourest-master/vihaanfrontend/index.html"
        })
        .catch(error => console.log('error', error));
}