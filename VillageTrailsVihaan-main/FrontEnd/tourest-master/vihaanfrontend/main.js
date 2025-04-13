let token = sessionStorage.getItem("token")
let user = sessionStorage.getItem("user")
let hostNameEle = document.getElementById("hostname");
let hostPhoneEle = document.getElementById("hostphone");
let hostTypeEle = document.getElementById("user-type");
let signInNav = document.getElementById("signinnav");
let listNameEle = document.getElementById("listname");
let listDescEle = document.getElementById("listdesc");
let listPriceEle = document.getElementById("listprice");
let listStateEle = document.getElementById("liststate");
function changeData(name,phone,type){
    hostNameEle.innerText=name;
    hostPhoneEle.innerText=phone;
    hostTypeEle.innerText=type;
}
function changeListData(listname,listdesc,listprice,liststate){
    listNameEle.innerText=listname;
    listDescEle.innerText=listdesc;
    listPriceEle.innerText="Rs."+listprice;
    listStateEle.innerText=liststate;
}
function getData(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "token "+token);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/villagetrails/v1/listing?hostId="+user+"&expand=hostId", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result.results)
            if(result.results.length == 0){
                document.getElementById("currlisth2").style.display="none"
                document.getElementById("currlist").style.display="none"
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", "token "+token);
                var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
                };

                fetch("http://127.0.0.1:8000/villagetrails/v1/user/"+user, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        console.log(result.results)
                        changeData(result.results[0].name,result.results[0].phone,"host");
                    })
                    .catch(error => console.log('error', error));
            }
            else{
                changeData(result.results[0].hostId.name,result.results[0].hostId.phone,"host");
                changeListData(result.results[0].name,result.results[0].description,result.results[0].cost,result.results[0].state)
            }
        })
        .catch(error => console.log('error', error));
}
if(token!=null && token!=""){
    signInNav.style.display = "none"
    getData();
}
else{
    document.getElementById("currlisth2").style.display="none"
    document.getElementById("currlist").style.display="none"
}
