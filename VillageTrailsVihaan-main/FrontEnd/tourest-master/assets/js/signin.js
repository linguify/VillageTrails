console.log('Hi')
let nameInputEle = document.getElementById("nameInput");
let phoneInputEle = document.getElementById("phoneInput");
let userTypeInput = document.getElementById("dot-1");
let otpInputEle = document.getElementById("otpInput");
let otpEle = document.getElementById("otpval");
function showOtp(){
    // nameInputEle.style.display = "none";
    // phoneInputEle.style.display = "none";
    otpInputEle.style.display = "";

}
let userId = 1;
let otp = -1;
function getOtp() {
    console.log(nameInputEle.value)
    console.log(phoneInputEle.value)
    console.log(userTypeInput.value)
    if(otpInputEle.style.display == "none"){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
            "phone": phoneInputEle.value,
            "name": nameInputEle.value,
            "is_guest":userTypeInput.value!="on"
        });
    
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
    
        fetch("http://127.0.0.1:8000/villagetrails/v1/signin", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                userId = result.userid;
                console.log(userId)
                showOtp()
            })
            .catch(error => console.log('error', error));
    }
    else{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        otp = otpEle.value;
        console.log(otp)
        var raw = JSON.stringify({
            "user":userId,
            "otp":otp
        });
        console.log(raw)
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
    
        fetch("http://127.0.0.1:8000/villagetrails/v1/gettoken", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                sessionStorage.setItem("token", result.token);
                sessionStorage.setItem("user", userId);
                if(userTypeInput.value!="on"){
                    window.location.href = "http://127.0.0.1:5500/tourest-master/cards3.html"
                }
                else{
                    window.location.href = "http://127.0.0.1:5500/tourest-master/vihaanfrontend/index.html"
                }
            })
            .catch(error => console.log('error', error));
    }
}