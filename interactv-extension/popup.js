document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('login-submit');
    var formusername = document.getElementById("emailid").value;
    var formpassword = document.getElementById("password").value;

    console.log("username: " + formusername);
    console.log("password: " + formpassword);

    // onClick's logic below:
    console.log('befreo >>>')
    link.addEventListener('click', function() {
        console.log('-->>');
        chrome.browserAction.setPopup({popup: "profile.html"});
        // fetch('https://mellow-entertaining-celery.glitch.me/api/loginStudent',{
        // method: "POST",
        // body: JSON.stringify({username: 'pranav.soneji@spit.ac.in', password: 'spit12345'}),
        // headers: {"Content-type":"application/json; charset=UTF-8"}
        // })
        // .then(response => response.json())
        // .then(json => {
        //     console.log(json);
        //     chrome.browserAction.setPopup({popup: "profile.html"});
                window.close();
        // })
        // .catch(err => console.log("err : " + err))

    });
});


// document.getElementById("login-submit").addEventListener('click', function() {
//     console.log("inside click");
//     alert("hello"); //validation code to see State field is mandatory.
    // await login();

    // fetch('http://localhost:3000/api/login',{
    // method: "POST",
    // body: JSON.stringify({username: 'pranav.soneji@spit.ac.in', password: 'spit12345'}),
    // headers: {"Content-type":"application/json; charset=UTF-8"}
    // })
    // .then(response => response.json())
    // .then(json => console.log("json data: " + json))
    // .catch(err => console.log("err : " + err))

// });


// function reqListener () {
//         console.log(">> " + this.responseText);
//     }

//     var oReq = new XMLHttpRequest();
//     oReq.addEventListener("load", reqListener);
//     oReq.open("GET", "http://localhost:3000/api/test");
//     oReq.send();



async function login() {
    console.log('Here >')
    const rawResponse = await fetch('http://localhost:3000/api/login',
    {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, 
        body: JSON.stringify({username: 'pranav.soneji@spit.ac.in', password: 'spit12345'})
    });
    
    const content = await rawResponse.json();
    console.log(">>" + content);
};

// fetch('http://localhost:3000/api/login',{
//     method: "POST",
//     body: JSON.stringify({username: 'pranav.soneji@spit.ac.in', password: 'spit12345'}),
//     headers: {"Content-type":"application/json; charset=UTF-8"}
// })
// .then(response => response.json())
// .then(json => console.log("json data: " + json))
// .catch(err => console.log("err : " + err))